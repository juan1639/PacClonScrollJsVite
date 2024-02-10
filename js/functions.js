import { settings } from './main.js';

// ============================================================================
//  Funciones varias
// ----------------------------------------------------------------------------
function dibujarFantasmas() {

    for (let i = 0; i < settings.constante.nro_fantasmas; i ++) {
        let corr = 9;

        if (checkColision(settings.objeto.fantasma[i], settings.objeto.pacman, corr) && settings.estado.actual == 1) {

            if (!settings.estadoFantasmas.azules) {

                settings.estado.actual = 2;  // Secuencia PacMan Dies...
                settings.estadoFantasmas.azules = false;
                settings.estadoFantasmas.ptosComeFantasmas = 100;
                playSonidos(settings.sonidos.pacman_dies);
                settings.sonidos.pacman_dies.volume = 0.6;
                settings.marcadores.vidas --;
                settings.marcadores.scoreVidas.innerHTML = `Vidas: ${settings.marcadores.vidas}`;

                if (settings.marcadores.vidas >= 0) {

                    setTimeout(() => {
                        settings.estado.actual = 1;
                        settings.objeto.pacman.revivirPacMan();

                        settings.objeto.fantasma[0].revivirFantasmas(3, 8, 0, 0);
                        settings.objeto.fantasma[1].revivirFantasmas(5, 8, 1, 0);
                        settings.objeto.fantasma[2].revivirFantasmas(9, 8, 2, 1);
                        settings.objeto.fantasma[3].revivirFantasmas(11, 8, 3, 1);
                    }, 3000);

                } else {

                    settings.estado.actual = 4;  // Game Over
                    settings.estado.gameover = true;
                    settings.marcadores.vidas = 0;
                    settings.marcadores.scoreVidas.innerHTML = `Vidas: ${settings.marcadores.vidas}`;
                    settings.marcadores.botonNewGame.style.display = 'flex';
                    settings.sonidos.sirena_fondo.loop = false;
                    playSonidos(settings.sonidos.game_over);
                }

            } else {

                //console.log('azules');
                if (!settings.objeto.fantasma[i].comido) {

                    playSonidos(settings.sonidos.eating_ghost);
                    settings.objeto.fantasma[i].comido = true;
                    settings.objeto.fantasma[i].showPtos = true;
                    settings.estado.pausa_fantasmaComido = true;

                    if (settings.escala.x === 1 && settings.escala.y === 1) {

                        settings.objeto.fantasma[i].showX = settings.objeto.fantasma[i].x; 
                        settings.objeto.fantasma[i].showY = settings.objeto.fantasma[i].y;

                    } else {

                        settings.objeto.fantasma[i].showX = settings.objeto.fantasma[i].escalar[0]; 
                        settings.objeto.fantasma[i].showY = settings.objeto.fantasma[i].escalar[1];
                    }
                    
                    settings.estadoFantasmas.ptosComeFantasmas *= 2;
                    settings.marcadores.puntos += settings.estadoFantasmas.ptosComeFantasmas;
                    settings.objeto.fantasma[i].showx2 = settings.estadoFantasmas.ptosComeFantasmas;

                    setTimeout(() => {
                        settings.objeto.fantasma[i].showPtos = false;
                    }, 1200);

                    setTimeout(() => {
                        settings.estado.pausa_fantasmaComido = false;
                    }, 500);

                }
            }
        }

        settings.objeto.fantasma[i].dibuja();
    }
}

// ============================================================================
function dibujaTodosPuntitos() {

    for (let i = 0; i < settings.objeto.array_puntitos.length; i ++) {
        
        let corr = 0;

        if (settings.objeto.array_puntitos[i].visible && settings.estado.actual != 3) {

            if (checkColision(settings.objeto.array_puntitos[i], settings.objeto.pacman, corr)) {
                settings.objeto.array_puntitos[i].visible = false;
                settings.objeto.contPuntitosComidos ++;
                settings.marcadores.puntos += settings.objeto.array_puntitos[i].sumaPtos
                settings.marcadores.scorePtos.innerHTML = `Puntos: ${settings.marcadores.puntos}`;
                playSonidos(settings.sonidos.wakawaka);
            }

            settings.objeto.array_puntitos[i].dibuja();
        }

        if (i < 4) {
            if (settings.objeto.array_ptosGordos[i].visible && settings.estado.actual != 3) {

                if (checkColision(settings.objeto.array_ptosGordos[i], settings.objeto.pacman, corr)) {
                    settings.objeto.array_ptosGordos[i].visible = false;
                    settings.objeto.contPuntitosComidos ++;
                    settings.marcadores.puntos += settings.objeto.array_ptosGordos[i].sumaPtos
                    settings.estadoFantasmas.azules = true;
                    playSonidos(settings.sonidos.eating_ghost);
                    playSonidos(settings.sonidos.azules);
                    settings.sonidos.azules.loop = true;

                    setTimeout(() => {
                        settings.estadoFantasmas.azules = false;
                        settings.estadoFantasmas.intermitentes = false;
                        settings.estadoFantasmas.ptosComeFantasmas = 100;
                        settings.sonidos.azules.loop = false;

                        settings.objeto.fantasma.forEach(fant => {
                            fant.comido = false;
                        });

                    }, settings.estadoFantasmas.duracionAzules);

                    setTimeout(() => {
                        settings.estadoFantasmas.intermitentes = true;
                    }, Math.floor(settings.estadoFantasmas.duracionAzules / 1.6));
                }

                settings.objeto.array_ptosGordos[i].dibuja();
            }
        }
    }
}

// ============================================================================
function checkComerFruta() {

    let corr = 5;

    if (checkColision(settings.objeto.fruta, settings.objeto.pacman, corr) && settings.estado.actual == 1 && !settings.objeto.fruta.comido) {
        settings.objeto.fruta.comido = true;
        settings.objeto.fruta.showPtos = true;

        if (settings.escala.x === 1 && settings.escala.y === 1) {

            settings.objeto.fruta.showX = settings.objeto.fruta.x;
            settings.objeto.fruta.showY = settings.objeto.fruta.y;

        } else {

            settings.objeto.fruta.showX = settings.objeto.fruta.escalar[0];
            settings.objeto.fruta.showY = settings.objeto.fruta.escalar[1];
        }
        
        playSonidos(settings.sonidos.eating_cherry);

        settings.marcadores.puntos += settings.estadoFantasmas.ptosComeFruta;

        setTimeout(() => {
            settings.objeto.fruta.showPtos = false;

            setTimeout(() => {
                settings.objeto.fruta.comido = false
                settings.objeto.fruta.x = 9 * settings.constante.bsx;
                settings.objeto.fruta.y = 11 * settings.constante.bsy;
            }, 9000);

        }, 2000);
    }
}

// ============================================================================
function escalar_objetos(x, y) {

    let ofx;
    let ofy;

    if (settings.objeto.pacman) {
        ofx = x - settings.objeto.pacman.x;
        ofy = y - settings.objeto.pacman.y;

        return [settings.objeto.pacman.escalaXY[0] + ofx, settings.objeto.pacman.escalaXY[1] + ofy];

    }

    return [0, 0];
}

// ============================================================================
function checkColision(obj1, obj2, corr) {
    
    return obj1.x + corr < obj2.x + obj2.ancho - corr && 
            obj1.x + obj1.ancho - corr > obj2.x + corr &&
            obj1.y + corr < obj2.y + obj2.alto - corr && 
            obj1.y + obj1.alto - corr > obj2.y + corr;
}

// ============================================================================
function comprobarNivelSuperado() {

    let puntitosMasGordos = settings.objeto.array_puntitos.length + settings.objeto.array_ptosGordos.length;

    if (settings.objeto.contPuntitosComidos >= puntitosMasGordos) {
        return true;
    } else {
        return false;
    }
}

// --------------------------------------------------------------------------
function elNivelSuperado() {

    if (!settings.estado.nivel_superado) return;

    settings.estado.nivel_superado = false;
    settings.marcadores.nivel ++;
    settings.marcadores.scoreNivel.innerHTML = `Nivel: ${settings.marcadores.nivel}`;
    settings.estadoFantasmas.ptosComeFruta *= 2;
    settings.objeto.fruta.comido = false;
    settings.estadoFantasmas.duracionAzules -= settings.marcadores.nivel * 1000;
    settings.objeto.contPuntitosComidos = 0;
    settings.estado.actual = 3;
    settings.sonidos.presentacion.play();

    if (settings.estadoFantasmas.duracionAzules < 2000) settings.estadoFantasmas.duracionAzules = 2000;

    settings.objeto.array_puntitos.forEach(punto => {
        punto.visible = true;
    });

    settings.objeto.array_ptosGordos.forEach(gordo => {
        gordo.visible = true;
    });

    setTimeout(() => {
        settings.estado.actual = 1;
        settings.objeto.pacman.revivirPacMan();

        settings.objeto.fantasma[0].revivirFantasmas(3, 8, 0, 0);
        settings.objeto.fantasma[1].revivirFantasmas(5, 8, 1, 0);
        settings.objeto.fantasma[2].revivirFantasmas(9, 8, 2, 1);
        settings.objeto.fantasma[3].revivirFantasmas(11, 8, 3, 1);
    }, 5000);
}

// ============================================================================
function mostrarTextos() {

    if (settings.estado.actual === 0) {

        const rX = settings.resolucion[0];
        const rY = settings.resolucion[1];

        let sizeTxtPreparado = 120;
        let x = Math.floor(rX / 5) + 5;
        let y = Math.floor(rY / 2);

        let gradi = settings.ctx.createLinearGradient(Math.floor(rX / 5), Math.floor(rY / 4), Math.floor(rX / 5) + 5, Math.floor(rY / 1.5));
        gradi.addColorStop(0, 'orangered');
        gradi.addColorStop(1, 'yellow');

        if (settings.escala.x === 1 && settings.escala.y === 1) {
        
            sizeTxtPreparado = 120;
            x = Math.floor(rX / 5) + 5;
            y = Math.floor(rY / 2);
            
        } else {
            
            sizeTxtPreparado = Math.floor(120 / settings.escala.x);
            x = Math.floor(rX / (5 * settings.escala.x)) + 5;
            y = Math.floor(rY / (2 * settings.escala.y));
            gradi = settings.ctx.createLinearGradient(x, Math.floor(y / 2), x, Math.floor(rY / (1.5 * settings.escala.y)));
            gradi.addColorStop(0, 'orangered');
            gradi.addColorStop(1, 'yellow');
        }

        settings.ctx.font = sizeTxtPreparado.toString() + 'px seriff';
        settings.ctx.fillStyle = gradi;
        settings.ctx.fillText('Preparado!', x, y);
    }

    if (settings.estado.actual === 3) {

        const rX = settings.resolucion[0];
        const rY = settings.resolucion[1];

        let sizeTxtPreparado = 100;
        let x = Math.floor(rX / 9) + 5;
        let y = Math.floor(rY / 2);

        if (settings.escala.x === 1 && settings.escala.y === 1) {
        
            sizeTxtPreparado = 100;
            
        } else {
            
            sizeTxtPreparado = Math.floor(100 / settings.escala.x);
            x = Math.floor(rX / (9 * settings.escala.x)) + 5;
            y = Math.floor(rY / (2 * settings.escala.y));
        }

        settings.ctx.font = sizeTxtPreparado + 'px seriff';
        settings.ctx.fillStyle = 'lightgreen';
        settings.ctx.fillText('Nivel Superado!', x, y);
    }

    // -----------------------------------------------------------------------------
    settings.objeto.fantasma.forEach(fant => {
        if (fant.showPtos) {
            settings.ctx.save();
            settings.ctx.shadowColor = 'orange';
            settings.ctx.shadowBlur = 10;
            settings.ctx.font = '30px seriff';
            settings.ctx.fillStyle = 'orangered';
            settings.ctx.fillText(fant.showx2, fant.showX, fant.showY);
            settings.ctx.restore();
        }
    });

    if (settings.objeto.fruta.showPtos) {
        settings.ctx.save();
        settings.ctx.shadowColor = 'orange';
        settings.ctx.shadowBlur = 10;
        settings.ctx.font = '32px seriff';
        settings.ctx.fillStyle = 'orangered';
        settings.ctx.fillText(settings.estadoFantasmas.ptosComeFruta, settings.objeto.fruta.showX, settings.objeto.fruta.showY);
        settings.ctx.restore();
    }
}

// -------------------------------------------------------------------------
function nuevaPartida() {

    settings.estado.actual = 0;
    settings.estado.gameover = false;

    settings.marcadores.puntos = 0;
    settings.marcadores.scorePtos.innerHTML = `Puntos: ${settings.marcadores.puntos}`;
    settings.marcadores.nivel = 1;
    settings.marcadores.scoreNivel.innerHTML = `Nivel: ${settings.marcadores.nivel}`;
    settings.marcadores.vidas = 3;
    settings.marcadores.scoreVidas.innerHTML = `Vidas: ${settings.marcadores.vidas}`;

    settings.estadoFantasmas.ptosComeFruta = 200;
    settings.objeto.fruta.comido = false;
    settings.estadoFantasmas.duracionAzules = 8000;
    settings.estado.nivel_superado = false;
    settings.objeto.contPuntitosComidos = 0;

    settings.objeto.array_puntitos.forEach(punto => {
        punto.visible = true;
    });

    settings.objeto.array_ptosGordos.forEach(gordo => {
        gordo.visible = true;
    });

    settings.objeto.pacman.revivirPacMan();

    settings.objeto.fantasma[0].revivirFantasmas(3, 8, 0, 0);
    settings.objeto.fantasma[1].revivirFantasmas(5, 8, 1, 0);
    settings.objeto.fantasma[2].revivirFantasmas(9, 8, 2, 1);
    settings.objeto.fantasma[3].revivirFantasmas(11, 8, 3, 1);
}

// -------------------------------------------------------------------------
function elGameOver() {

    if (!settings.estado.gameover) return;

    const rX = settings.resolucion[0];
    const rY = settings.resolucion[1];

    let sizeTxtGameOver = 100;
    let x = Math.floor(rX / 5) + 5;
    let y = Math.floor(rY / 2);

    if (settings.escala.x === 1 && settings.escala.y === 1) {
        
        sizeTxtGameOver = 100;
        
    } else {
        
        sizeTxtGameOver = Math.floor(100 / settings.escala.x);
        x = Math.floor(rX / (5 * settings.escala.x)) + 5;
        y = Math.floor(rY / (2 * settings.escala.y));    
    }

    settings.ctx.font = sizeTxtGameOver.toString() + 'px seriff';
    settings.ctx.fillStyle = 'orange';
    settings.ctx.fillText('Game Over', x, y);
}

// ========================================================================
//  Presentacion / Menu Principal
// ------------------------------------------------------------------------
function laPresentacion() {

    const rX = settings.resolucion[0];
    const rY = settings.resolucion[1];

    let sizeTxtTitulo = 120;
    let sizeTxt2 = 30;
    let x = Math.floor(rX / 5) + 5;
    let y = Math.floor(rY / 2);
    let x2 = Math.floor(rX / 9) + 5;
    let y2 = rY - settings.constante.bsy * 2;
    
    if (settings.escala.x === 1 && settings.escala.y === 1) {
        
        sizeTxtTitulo = 120;
        sizeTxt2 = 30;
        x = Math.floor(rX / 5) + 5;
        y = Math.floor(rY / 2);
        x2 = Math.floor(rX / 9) + 5;
        y2 = rY - settings.constante.bsy * 2;
        
    } else {
        
        sizeTxtTitulo = Math.floor(120 / settings.escala.x);
        sizeTxt2 = Math.floor(30 / settings.escala.x);
        x = Math.floor(rX / (5 * settings.escala.x)) + 5;
        y = Math.floor(rY / (2 * settings.escala.y));
        x2 = Math.floor(rX / (9 * settings.escala.x)) + 5;
        y2 = Math.floor(rY / (settings.escala.y - 0.5)) - (settings.constante.bsy * 2 * settings.escala.y);
    }

    settings.ctx.font = sizeTxtTitulo.toString() + 'px seriff';
    settings.ctx.fillStyle = 'orangered';
    settings.ctx.fillText('Pac Clon', x, y);

    settings.ctx.font = sizeTxt2.toString() + 'px seriff';
    settings.ctx.fillStyle = 'white';
    settings.ctx.fillText('Pulse INTRO o Nueva Partida para comenzar...', x2, y2);

    settings.objeto.pacman.secuenciaPresentacion();
    settings.objeto.fantasma[1].secuenciaPresentacion();
}

// ============================================================================
//  Funciones de SONIDOS
// ----------------------------------------------------------------------------
function playSonidos(sonido) {
    sonido.play();
}

function playSonidosLoop(sonido, loop, volumen) {
    sonido.play();
    sonido.loop = loop;
    sonido.volume = volumen;
}

// ============================================================================
function reescalaCanvas() {
    return;
}

// ----------------------------------------------------------------------------
function borraCanvas() {
    // canvas.width = canvas.width;
    // canvas.height = canvas.height;
    settings.ctx.fillStyle = settings.colores.sueloColor;
    settings.ctx.fillRect(0, 0, settings.canvas.width, settings.canvas.height);
}

export {
    dibujarFantasmas,
    dibujaTodosPuntitos,
    checkComerFruta,
    escalar_objetos,
    comprobarNivelSuperado,
    elNivelSuperado,
    mostrarTextos,
    elGameOver,
    nuevaPartida,
    laPresentacion,
    borraCanvas,
    playSonidos,
    playSonidosLoop
};
