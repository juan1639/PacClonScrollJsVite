import { settings } from './main.js';

// ========================================================================
//  Funciones de dibujado en Canvas
// ------------------------------------------------------------------------
function canvasPacMan(x, y, r, pacColor) {

    let corr = 2;
    let gradi;

    if (settings.estado.actual !== 1) {

        gradi = 'rgb(245, 225, 9)';

    } else {

        gradi = settings.ctx.createRadialGradient(x + r, y + r, 10, x + r, y + r, r);
        gradi.addColorStop(0, '#FA1');
        gradi.addColorStop(1, '#FE1');
    }

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr, y + r + corr, r, 0, Math.PI * 2);
    settings.ctx.fillStyle = gradi;
    settings.ctx.fill();
    settings.ctx.closePath();
}

function canvasPacManRi(x, y, r, pacColor, animaPacMan) {

    let corr = 2;

    if (!animaPacMan) {

        for (let i = 0; i < 10; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr + i * 2, y + r + corr + i, parseInt(settings.constante.bsx / 2) - i * 2, 1);
            settings.ctx.fillRect(x + r + corr + i * 2, y + r + corr - i, parseInt(settings.constante.bsx / 2) - i * 2, 1);
        }

    } else {

        for (let i = 0; i < 18; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr + i, y + r + corr + i, parseInt(settings.constante.bsx / 2) - i, 1);
            settings.ctx.fillRect(x + r + corr + i, y + r + corr - i, parseInt(settings.constante.bsx / 2) - i, 1);
        }
    }
}

function canvasPacManLe(x, y, r, pacColor, animaPacMan) {

    let corr = 2;

    if (!animaPacMan) {

        for (let i = 0; i < 10; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr - i * 2, y + r + corr + i, -(parseInt(settings.constante.bsx / 2) - i * 2), 1);
            settings.ctx.fillRect(x + r + corr - i * 2, y + r + corr - i, -(parseInt(settings.constante.bsx / 2) - i * 2), 1);
        }

    } else {

        for (let i = 0; i < 18; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr - i, y + r + corr + i, -(parseInt(settings.constante.bsx / 2) - i), 1);
            settings.ctx.fillRect(x + r + corr - i, y + r + corr - i, -(parseInt(settings.constante.bsx / 2) - i), 1);
        }
    }
}

function canvasPacManDo(x, y, r, pacColor, animaPacMan) {

    let corr = 2;

    if (!animaPacMan) {
        
        for (let i = 0; i < 10; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr + i, y + r + corr + i * 2, 1, parseInt(settings.constante.bsx / 2) - i * 2);
            settings.ctx.fillRect(x + r + corr - i, y + r + corr + i * 2, 1, parseInt(settings.constante.bsx / 2) - i * 2);
        }

    } else {

        for (let i = 0; i < 18; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr + i, y + r + corr + i, 1, parseInt(settings.constante.bsx / 2) - i);
            settings.ctx.fillRect(x + r + corr - i, y + r + corr + i, 1, parseInt(settings.constante.bsx / 2) - i);
        }
    }
    
}

function canvasPacManUp(x, y, r, pacColor, animaPacMan) {

    let corr = 2;

    if (!animaPacMan) {

        for (let i = 0; i < 10; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr + i, y + r + corr - i * 2, 1, -(parseInt(settings.constante.bsx / 2) - i * 2));
            settings.ctx.fillRect(x + r + corr - i, y + r + corr - i * 2, 1, -(parseInt(settings.constante.bsx / 2) - i * 2));
        }

    } else {

        for (let i = 0; i < 18; i ++) {
            settings.ctx.fillStyle = settings.colores.sueloColor;
            settings.ctx.fillRect(x + r + corr + i, y + r + corr - i, 1, -(parseInt(settings.constante.bsx / 2) - i));
            settings.ctx.fillRect(x + r + corr - i, y + r + corr - i, 1, -(parseInt(settings.constante.bsx / 2) - i));
        }
    }
}

// ===================================================================================
function canvasFantasma(x, y, r, fantasmaColor, comido) {
    let corr = 2;
    let v = 15;

    fantasmaColor = fantasmaColor[0];

    if (settings.estadoFantasmas.azules && !settings.estadoFantasmas.intermitentes) {
        fantasmaColor = 'royalblue';
    } else if (settings.estadoFantasmas.azules && !settings.objeto.animaPacMan && settings.estadoFantasmas.intermitentes) {
        fantasmaColor = 'lightblue';
    } else if (settings.estadoFantasmas.azules && settings.objeto.animaPacMan && settings.estadoFantasmas.intermitentes) {
        fantasmaColor = 'royalblue';
    }

    if (settings.estado.actual == -1 && settings.objeto.pacman.velX > 0) fantasmaColor = 'royalblue';

    if (!comido) {
        settings.ctx.beginPath();
        settings.ctx.arc(x + r + corr, y + r + corr, r, Math.PI, 0);
        settings.ctx.fillStyle = fantasmaColor;
        settings.ctx.fill();
        settings.ctx.closePath();

        settings.ctx.fillStyle = fantasmaColor;
        settings.ctx.fillRect(x + corr, y + r + corr, r * 2, parseInt(r));
    } 

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr - 8, y + v, 6, 0, Math.PI * 2);
    settings.ctx.fillStyle = 'white';
    settings.ctx.fill();
    settings.ctx.closePath();

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr + 8, y + v, 6, 0, Math.PI * 2);
    settings.ctx.fillStyle = 'white';
    settings.ctx.fill();
    settings.ctx.closePath();
}

function canvasOjosFantasma(x, y, r, iz, de, vert) {
    let corr = 2;
    let v = 15 - 1;

    //ctx.fillStyle = 'black';

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr - iz, y + v + vert, 3, 0, Math.PI * 2);
    settings.ctx.fillStyle = 'black';
    settings.ctx.fill();
    settings.ctx.closePath();

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr + de, y + v + vert, 3, 0, Math.PI * 2);
    settings.ctx.fillStyle = 'black';
    settings.ctx.fill();
    settings.ctx.closePath();


    // ctx.fillRect(x + r + corr - iz, y + v + vert, 6, 6);

    // ctx.fillRect(x + r + corr + de, y + v + vert, 6, 6);
}

// ========================================================================
function canvasFruta(x, y, r, thisX, thisY) {
    let corr = 2;
    let radCerezas = 11;

    const gradi = settings.ctx.createRadialGradient(thisX + r + corr - 6, thisY + r + corr + 4, 3, thisX + r + corr - 6, 
        thisY + r + corr + 4, r);
    gradi.addColorStop(0, settings.colores.rojo);
    gradi.addColorStop(1, '#F52');

    settings.ctx.beginPath();
    settings.ctx.moveTo(x + r + corr - 6, y + r + corr + 4);
    settings.ctx.lineTo(x + r, y);
    settings.ctx.lineTo(x + r + corr + 3, y + r);
    settings.ctx.strokeStyle = 'seagreen';
    settings.ctx.stroke();
    settings.ctx.closePath();

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr + 3, y + r + corr + 4, radCerezas, 0, Math.PI * 2);
    settings.ctx.fillStyle = settings.colores.rojo;
    settings.ctx.fill();
    settings.ctx.closePath();

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr - 6, y + r + corr + 4, radCerezas, 0, Math.PI * 2);
    settings.ctx.fillStyle = gradi;
    settings.ctx.fill();
    settings.ctx.closePath();

    settings.ctx.beginPath();
    settings.ctx.arc(x + r + corr - 6, y + r + corr + 4, radCerezas + 1, Math.PI * 1.5, Math.PI / 2);
    settings.ctx.strokeStyle = settings.colores.sueloColor;
    settings.ctx.stroke();
    settings.ctx.closePath();
}

export {
    canvasPacMan, canvasPacManUp, canvasPacManDo,
    canvasPacManLe, canvasPacManRi, canvasFantasma,
    canvasOjosFantasma, canvasFruta
};

