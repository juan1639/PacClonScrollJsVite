import { settings } from './main.js';
import { escalar_objetos } from './functions.js';
import { canvasFruta } from './dibujaCanvas.js';

// ========================================================================
//  Clase Fruta
// ------------------------------------------------------------------------
export class Fruta {

    constructor() {

        this.x = 9 * settings.constante.bsx;
        this.y = 11 * settings.constante.bsy;
        this.escalar = [];

        this.direccion = 0;

        this.ancho = settings.constante.bsx;
        this.alto = settings.constante.bsy;
        this.radio = parseInt(settings.constante.bsx / 2);

        this.color = 'red';

        this.comido = false;
        this.showPtos = false;
        this.showX = 0;
        this.showY = 0;

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

        this.velX = 1;
        this.velY = 0;
        this.sumarAncho = 1;
        this.sumarAlto = 0;
    }

    actualiza() {

        let x = 0;
        let y = 0;

        for (let i = 0; i < this.ptosClave.length; i ++) {

            let pClaveX = this.ptosClave[i][0] * settings.constante.bsx;
            let pClaveY = this.ptosClave[i][1] * settings.constante.bsy;

            if (this.x == pClaveX && this.y == pClaveY) {
                let otraDir = Math.floor(Math.random()*10);

                if (otraDir < 5) {
                    this.elegir_otra_direccion();
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
            this.elegir_otra_direccion();
            this.nuevos_valores();
        }
    }

    dibuja() {

        let x = this.x;
        let y = this.y;

        // -----------------------------------------------------------------
        if (settings.estado.actual == 1)  this.actualiza();

        // -----------------------------------------------------------------
        if (settings.escala.x !== 1 || settings.escala.y !== 1) {
            
            this.escalar = escalar_objetos(this.x, this.y);
            x = this.escalar[0];
            y = this.escalar[1];
        }

        if (!this.comido) canvasFruta(x, y, this.radio, this.x, this.y);
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
}
