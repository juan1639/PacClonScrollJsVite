import { settings } from './main.js';
import { escalar_objetos } from './functions.js';

// ============================================================================
export class Puntitos {

    constructor(x, y) {
        
        this.x = x * settings.constante.bsx + Math.floor(settings.constante.bsx / 2);
        this.y = y * settings.constante.bsy + Math.floor(settings.constante.bsy / 2);
        
        this.left = x * settings.constante.bsx;
        this.top = y * settings.constante.bsy;

        this.radio = 4;
        this.ancho = this.radio * 2;
        this.alto = this.radio * 2;

        this.color = 'white';
        this.visible = true;
        this.sumaPtos = 10;

        //this.dibuja();
    }

    dibuja() {

        let escalar = [];

        settings.ctx.beginPath();

        if (settings.escala.x === 1 && settings.escala.y === 1) {

            settings.ctx.arc(this.x , this.y , this.radio, 0, Math.PI * 2);

        } else {

            escalar = escalar_objetos(this.left, this.top);
            escalar[0] += Math.floor(settings.constante.bsx / 2);
            escalar[1] += Math.floor(settings.constante.bsy / 2);

            let tile = settings.constante.bsx;
            tile = tile * 2;
            const resXY = settings.resolucion;

            if ((escalar[0] > -tile && escalar[0] <= resXY[0]) || (escalar[1] > -tile && escalar[1] <= resXY[1])) {

                settings.ctx.arc(escalar[0], escalar[1], this.radio, 0, Math.PI * 2);
            }
        }

        settings.ctx.fillStyle = this.color;
        settings.ctx.fill();
        settings.ctx.closePath();
    }
}

// ============================================================================
export class PtosGordos {

    constructor(x, y) {

        this.x = x * settings.constante.bsx + Math.floor(settings.constante.bsx / 2);
        this.y = y * settings.constante.bsy + Math.floor(settings.constante.bsy / 2);

        this.left = x * settings.constante.bsx;
        this.top = y * settings.constante.bsy;

        this.radio = 4.0;
        this.ancho = this.radio * 2;
        this.alto = this.radio * 2;

        this.color = 'lightblue';
        this.visible = true;
        this.sumaPtos = 50;
    }

    dibuja() {

        let escalar = [];
        
        this.radio += 0.4;
        if (this.radio >= 15.0) this.radio = 4.0;

        settings.ctx.save();
        settings.ctx.beginPath();
        settings.ctx.shadowColor = this.color;
        settings.ctx.shadowBlur = 20;

        if (settings.escala.x === 1 && settings.escala.y === 1) {
            
            settings.ctx.arc(this.x , this.y , Math.floor(this.radio), 0, Math.PI * 2);

        } else {

            escalar = escalar_objetos(this.left, this.top);
            escalar[0] += Math.floor(settings.constante.bsx / 2);
            escalar[1] += Math.floor(settings.constante.bsy / 2);

            settings.ctx.arc(escalar[0], escalar[1], this.radio, 0, Math.PI * 2);
        }

        settings.ctx.fillStyle = this.color;
        settings.ctx.fill();
        settings.ctx.closePath();
        settings.ctx.restore();
    }
}
