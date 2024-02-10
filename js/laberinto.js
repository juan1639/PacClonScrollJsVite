import { escalar_objetos } from './functions.js';
import {settings} from './main.js';

// ===================================================================================
export class Laberinto {

    constructor(array) {
        
        this.array = array;
        
        //DIMENSIONES MATRIZ
        this.altoM  = this.array.length;
        this.anchoM = this.array[0].length;
        
        //TAMAÑO DE LOS TILES
        this.anchoT = settings.constante.bsx;
        this.altoT = settings.constante.bsy;
    }
    
    colision(x, y) {

        if (this.array[y][x] == 9) {
            return true;
        } else {
            return false;
        }     
    }
    
    tile(x, y) {
        let casillaX = Math.floor(x / this.anchoT);       
        let casillaY = Math.floor(y / this.altoT);

        return(this.array[casillaY][casillaX]);
    }
    
    dibuja() {

        if (settings.escala.x === 1 && settings.escala.y === 1) {

            for (let y = 0; y < this.altoM; y ++) {
                for (let x = 0; x < this.anchoM; x ++) {
                    
                    if (this.array[y][x] == 9) {
                        let bx = x * this.anchoT + 0;
                        let by = y * this.altoT + 0;
    
                        settings.ctx.fillStyle = settings.colores.paredColor;
                        settings.ctx.fillRect(bx, by, this.anchoT - 2, this.altoT - 2);
                        settings.ctx.fillStyle = settings.colores.paredColorOscuro;
                        settings.ctx.fillRect(bx + 2, by + 2, this.anchoT - 3, this.altoT - 3);
                        // ctx.drawImage(this.img, 0, 0, this.img.width - 1, this.img.height - 1, 
                        //     x * this.anchoT, y * this.altoT, this.anchoT, this.altoT);
                    }         
                }
            }

        } else {

            for (let y = 0; y < this.altoM; y ++) {
                for (let x = 0; x < this.anchoM; x ++) {
                    
                    if (this.array[y][x] === 9) {

                        let tile = settings.constante.bsx;
                        tile = tile * 2;
                        const resXY = settings.resolucion;

                        let bx = x * this.anchoT + 0;
                        let by = y * this.altoT + 0;

                        let escalar = escalar_objetos(bx, by);

                        if ((escalar[0] > -tile && escalar[0] <= resXY[0]) || (escalar[1] > -tile && escalar[1] <= resXY[1])) {

                            settings.ctx.fillStyle = settings.colores.paredColor;
                            settings.ctx.fillRect(escalar[0] + 2, escalar[1] + 2, this.anchoT - 2, this.altoT - 2);
                            settings.ctx.fillStyle = settings.colores.paredColorOscuro;
                            settings.ctx.fillRect(escalar[0] + 3, escalar[1] + 3, this.anchoT - 4, this.altoT - 4);
                            // ctx.drawImage(this.img, 0, 0, this.img.width - 1, this.img.height - 1, 
                            //     x * this.anchoT, y * this.altoT, this.anchoT, this.altoT);
                        }
                    }         
                }
            }
        }
    }

    static dibuja_mapa(sizePixel) {

        for (let y = 0; y < settings.constante.nro_filas; y ++) {
            for (let x = 0; x < settings.constante.nro_columnas; x ++) {

                if (settings.array_laberinto[y][x] === 9) {

                    const pos_mapa = Math.floor(settings.resolucion[0] / settings.escala.x) - settings.constante.nro_columnas * sizePixel;

                    settings.ctx.fillStyle = 'green';
                    settings.ctx.fillRect(x * sizePixel + pos_mapa, y * sizePixel, sizePixel, sizePixel);
                }
            }
        }
    }

    static calcula_sizeMapa() {

        if (settings.escala.x === 4 && settings.escala.y === 4) {
            return 3;

        } else if (settings.escala.x === 3 && settings.escala.y === 3) {
            return 4;

        } else if (settings.escala.x === 2 && settings.escala.y === 2) {
            return 6;
        }

        return 1;
    }
}
