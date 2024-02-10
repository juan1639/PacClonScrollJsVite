// ============================================================================
//  PacClon (responsive) | main.js ... By Juan Eguia
// 
// ----------------------------------------------------------------------------
//  import --> clases
// ----------------------------------------------------------------------------
import {Settings} from './settings.js';
import {Laberinto} from './laberinto.js';
import {Puntitos, PtosGordos} from './puntitos.js';
import {Fruta} from './fruta.js';
import {PacMan} from './pacman.js';
import {Fantasma} from './fantasma.js';

// ----------------------------------------------------------------------------
//  import --> funciones varias
// ----------------------------------------------------------------------------
import {
    eventos_keydown,
    eventos_click
} from './controles.js';

// ----------------------------------------------------------------------------
//  import --> funciones varias
// ----------------------------------------------------------------------------
import {
    borraCanvas,
    dibujaTodosPuntitos,
    dibujarFantasmas,
    elNivelSuperado,
    comprobarNivelSuperado,
    checkComerFruta,
    mostrarTextos,
    elGameOver,
    laPresentacion
} from './functions.js';

// ----------------------------------------------------------------------------
const escalas_validas = [1, 2, 3, 4];
let escalaSel = 0;
let settings;
let sizePixel;

// ================================================================================
// Funcion Inicialiadora
// --------------------------------------------------------------------------------
window.onload = () => {

    while (!escalas_validas.includes(escalaSel)) {
        escalaSel = parseInt(prompt("Seleciona el Zoom (1, 2, 3, 4)"));
    }

    // INSTANCIAR Settings -------------------------------------------
    settings = new Settings(escalaSel);

    settings.canvas.width = settings.resolucion[0];
    settings.canvas.height = settings.resolucion[1] - settings.constante.bsy;
    settings.ctx.scale(settings.escala.x, settings.escala.y);

    // sonidos.presentacion.play();
    // sonidos.presentacion.volume = 0.6;

    sizePixel = Laberinto.calcula_sizeMapa();

    // INSTANCIAR (Laberinto) ----------------------------------------
    settings.objeto.laberinto = new Laberinto(settings.array_laberinto);

    // INSTANCIAR TODOS los Puntitos ---------------------------------
    let contador = 0;
    let contador_gordos = 0;
    let instanciar;

    for (let y = 0; y < settings.array_laberinto.length; y ++) {
        for (let x = 0; x < settings.array_laberinto[0].length; x ++) {
            
            if (settings.array_laberinto[y][x] == 1) {
                instanciar = new Puntitos(x, y);
                settings.objeto.array_puntitos.push(instanciar);
                contador ++;
                //console.log(array_puntitos.length);
            }

            if (settings.array_laberinto[y][x] == 5) {
                instanciar = new PtosGordos(x, y);
                settings.objeto.array_ptosGordos.push(instanciar);
                contador_gordos ++;
            }        
        }
    }

    // INSTANCIAR FRUTA ----------------------------------------------
    settings.objeto.fruta = new Fruta();

    // INSTANCIAR PAC-MAN --------------------------------------------
    settings.objeto.pacman = new PacMan();

    // INSTANCIAR (FANTASMAS) ----------------------------------------
    settings.objeto.fantasma[0] = new Fantasma(3 * settings.constante.bsx, 8 * settings.constante.bsy, 0, 0);
    settings.objeto.fantasma[1] = new Fantasma(5 * settings.constante.bsx, 8 * settings.constante.bsy, 1, 0);
    settings.objeto.fantasma[2] = new Fantasma(9 * settings.constante.bsx, 8 * settings.constante.bsy, 2, 1);
    settings.objeto.fantasma[3] = new Fantasma(11 * settings.constante.bsx, 8 * settings.constante.bsy, 3, 1);

    // --------------------------------------------------------------------------------
    // Creamos BUCLE PRINCIPAL (Intervalo cada 1000/FPS)
    // --------------------------------------------------------------------------------
    setInterval(function() {
        bucle_principal();
    }, 1000 / settings.constante.fps);

    setInterval(function() {

        if (settings.objeto.animaPacMan) {
            settings.objeto.animaPacMan = false;
        } else {
            settings.objeto.animaPacMan = true;
        }
        
        settings.objeto.pacman.diesAnima ++;
        if (settings.objeto.pacman.diesAnima > 3) settings.objeto.pacman.diesAnima = 0;
        
    }, 150);

    setInterval(function() {

        if (settings.estado.actual != 0) {
            settings.estado.nivel_superado = comprobarNivelSuperado();
            // console.log(estado.nivel_superado, estadoFantasmas.duracionAzules);
        }
    }, 200);
}

// ===============================================================================
function bucle_principal() {
    borraCanvas();

    if (settings.estado.actual == -1) {
        laPresentacion();
    }

    if (settings.estado.actual != -1) {

        settings.objeto.laberinto.dibuja();
        dibujaTodosPuntitos();
        settings.objeto.fruta.dibuja();

        settings.objeto.pacman.dibuja();
        dibujarFantasmas();

        Laberinto.dibuja_mapa(sizePixel);

        if (settings.objeto.pacman) {
            PacMan.dibuja_mapa(sizePixel, settings.objeto.pacman.x, settings.objeto.pacman.y);
        }

        for (let fantasma of settings.objeto.fantasma) {
            if (fantasma) {
                Fantasma.dibuja_mapa(sizePixel, fantasma.x, fantasma.y, fantasma.tipoF);
            }
        }

        checkComerFruta();
        elNivelSuperado();
        elGameOver();
        mostrarTextos();
    }
}

export { settings };
