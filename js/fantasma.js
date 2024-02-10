import { settings } from './main.js';
import { escalar_objetos } from './functions.js';

import {
    canvasFantasma, 
    canvasOjosFantasma
} from './dibujaCanvas.js';

// ============================================================================
export class Fantasma {

    constructor(x, y, tipoFantasma, direccion) {

        this.tipoF = tipoFantasma;
        this.direccion = direccion;

        this.ancho = settings.constante.bsx;
        this.alto = settings.constante.bsy;
        this.radio = Math.floor(settings.constante.bsy / 2.2);

        this.listaColores = [
            ['pink', '#E7C'],
            [settings.colores.rojo, '#F42'], 
            ['orange', '#FC0'], 
            ['seagreen', '#1B4']
        ];

        this.color = this.listaColores[this.tipoF];

        this.comido = false;
        this.showPtos = false;
        this.showX = 0;
        this.showY = 0;
        this.showx2 = 0;

        // Orden array: Left, right, up, down
        this.hacia_donde = [
            '231',
            '230',
            '013',
            '012'
        ];

        this.hacia_donde_velXY = [
            [-1, 0, 0, 0, 7, 12],
            [1, 0, 1, 0, 1, 6],
            [0, -1, 0, 0, 13, 18],
            [0, 1, 0, 1, 7, 12]
        ];

        this.ptosClave = [
            [4, 1], [14, 1],
            [4, 4], [6, 4], [12, 4], [14, 4],
            [4, 8], [6, 8], [12, 8], [14, 8],
            [1, 11], [4, 11], [6, 11], [12, 11], [14, 11], [17, 11],
            [4, 13], [6, 13], [12, 13], [14, 13]
        ];

        this.x = x;
        this.y = y;
        this.escalar = [];

        this.velX = this.hacia_donde_velXY[this.direccion][0];
        this.velY = this.hacia_donde_velXY[this.direccion][1];
        this.sumarAncho = this.hacia_donde_velXY[this.direccion][2];
        this.sumarAlto = this.hacia_donde_velXY[this.direccion][3];
    }

    actualiza() {

        let x = 0;
        let y = 0;

        for (let i = 0; i < this.ptosClave.length; i ++) {
            let pClaveX = this.ptosClave[i][0] * settings.constante.bsx;
            let pClaveY = this.ptosClave[i][1] * settings.constante.bsy;

            if (this.x == pClaveX && this.y == pClaveY) {
                let perseguir = Math.floor(Math.random()*10);

                if (perseguir < 7 + settings.marcadores.nivel) {
                    this.fantasma_persigue();
                    this.nuevos_valores();
                }
            }
        }

        x = parseInt((this.x + this.velX + this.ancho * this.sumarAncho) / settings.constante.bsx);
        y = parseInt((this.y + this.velY + this.alto * this.sumarAlto) / settings.constante.bsy);

        if (!(settings.objeto.laberinto.colision(x, y))) {
            this.x += this.velX * 2;
            this.y += this.velY * 2;

            if (this.x > settings.constante.nro_columnas * settings.constante.bsx && this.velX > 0) this.x = -settings.constante.bsx;
            if (this.x < -settings.constante.bsx && this.velX < 0) this.x = settings.constante.nro_columnas * settings.constante.bsx;

        } else {

            let perseguir = Math.floor(Math.random()*10);

            if (perseguir < 5 + settings.marcadores.nivel) {
                this.fantasma_persigue();
            } else {
                this.elegir_otra_direccion();
            }

            this.nuevos_valores();
        }
    }

    dibuja() {

        let x = this.x;
        let y = this.y;

        let iz = 0;
        let de = 0;
        let vert = 0;

        // -----------------------------------------------------------------
        if (settings.estado.actual === 1 && !settings.estado.pausa_fantasmaComido) {
            this.actualiza();
        }
        
        // -----------------------------------------------------------------
        if (settings.escala.x !== 1 || settings.escala.y !== 1) {
            
            this.escalar = escalar_objetos(this.x, this.y);
            x = this.escalar[0];
            y = this.escalar[1];
        }

        canvasFantasma(x, y, this.radio, this.color, this.comido);

        if (this.velX == 1) {
            iz = 5;
            de = 11;
            vert = 0;
        } else if (this.velX == -1) {
            iz = 11;
            de = 4;
            vert = 0;
        } else if (this.velY == -1) {
            iz = 8;
            de = 8;
            vert = -2;
        } else if (this.velY == 1) {
            iz = 8;
            de = 8;
            vert = 4;
        }

        canvasOjosFantasma(x, y, this.radio, iz, de, vert);

        // ctx.drawImage(fantasma, 0, 0, fantasma.width -1, fantasma.height - 1, 
        //     this.x, this.y, this.ancho, this.alto);
    }

    elegir_otra_direccion() {
        let direcc = this.hacia_donde[this.direccion];
        let num_rnd = Math.floor(Math.random()*3);
        let nuevaDireccion = direcc.charAt(num_rnd);

        this.direccion = parseInt(nuevaDireccion);
    }

    nuevos_valores() {
        this.velX = this.hacia_donde_velXY[this.direccion][0];
        this.velY = this.hacia_donde_velXY[this.direccion][1];
        this.sumarAncho = this.hacia_donde_velXY[this.direccion][2];
        this.sumarAlto = this.hacia_donde_velXY[this.direccion][3];
    }

    fantasma_persigue() {

        let hor_ver = Math.floor(Math.random()*10);

        if (hor_ver < 5) {
            if (this.y < settings.objeto.pacman.y) {
                this.direccion = 3;
            } else {
                this.direccion = 2;
            }

        } else {
            if (this.x < settings.objeto.pacman.x) {
                this.direccion = 1;
            } else {
                this.direccion = 0;
            }
        }
    }

    revivirFantasmas(x, y, tipoFantasma, direccion) {

        this.tipoF = tipoFantasma;
        this.direccion = direccion;

        this.x = x * settings.constante.bsx;
        this.y = y * settings.constante.bsy;

        this.velX = this.hacia_donde_velXY[this.direccion][0];
        this.velY = this.hacia_donde_velXY[this.direccion][1];
        this.sumarAncho = this.hacia_donde_velXY[this.direccion][2];
        this.sumarAlto = this.hacia_donde_velXY[this.direccion][3];
    }

    secuenciaPresentacion() {
        
        let iz = 0;
        let de = 0;
        let vert = 0;

        let pacX = settings.objeto.pacman.escalaXY[0];
        let pacY = settings.objeto.pacman.escalaXY[1];
        const gap = Math.floor(settings.constante.bsx * 1.3);

        if (settings.escala.x === 1 && settings.escala.y === 1) {
            pacX = settings.objeto.pacman.x;
            pacY = settings.objeto.pacman.y;
        }

        canvasFantasma(pacX + gap, pacY, this.radio, this.color, this.comido);

        if (settings.objeto.pacman.velX == 1) {
            iz = 5;
            de = 11;
            
        } else if (settings.objeto.pacman.velX == -1) {
            iz = 11;
            de = 4;
        }

        canvasOjosFantasma(pacX + gap, pacY, this.radio, iz, de, vert);
    }

    static dibuja_mapa(sizePixel, cX, cY, tipoFantasma) {

        const listaColores = [
            ['pink', '#E7C'],
            [settings.colores.rojo, '#F42'], 
            ['orange', '#FC0'], 
            ['seagreen', '#1B4']
        ];

        const x = Math.floor(cX / settings.constante.bsx);
        const y = Math.floor(cY / settings.constante.bsy);

        const pos_mapa = Math.floor(settings.resolucion[0] / settings.escala.x) - settings.constante.nro_columnas * sizePixel;

        settings.ctx.fillStyle = listaColores[tipoFantasma][0];
        settings.ctx.fillRect(x * sizePixel + pos_mapa, y * sizePixel, sizePixel, sizePixel);
    }
}
