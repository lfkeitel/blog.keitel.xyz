/**
 * Conway's Game of Life
 *
 * Author: Lee Keitel
 * License: MIT
 */

"use strict";

// Change these settings to suit the simulation
var GameSettings =
{
    height: 600,
    width: 900,
    cellSize: 12,
    pauseOnStall: false
}

// Main game logic
var Game =
{
    currentState: [],
    lastState: [],
    cellCount: 0,
    cellsPerRow: 0,
    cellsPerColumn: 0,
    generation: 0,
    ctx: null,
    canvas: null,
    timer: null,
    paused: true,
    stalled: false,

    init: function() {
        clearInterval(Game.timer);
        Game.canvas = document.getElementById('game-grid');
        Game.canvas.addEventListener('mousedown', Game.markGrid, false);
        Game.canvas.addEventListener('mousemove', Game.getMouse, false);
        Game.ctx = Game.canvas.getContext('2d');

        Game.cellsPerRow = GameSettings.width / GameSettings.cellSize;
        Game.cellsPerColumn = GameSettings.height / GameSettings.cellSize;
        Game.cellCount = Game.cellsPerRow * Game.cellsPerColumn;

        Game.currentState = Game.blankGrid();
        Game.lastState = Game.blankGrid();
        Game.stalled = false;
        Game.paused = true;
        Game.generation = 0;
        Game.timer = null;

        Game.drawGrid();
        Game.setMessage('Ready to start...');
        document.getElementById('generation-count').innerHTML = Game.generation;
    },

    getMouse: function(event) {
        if (event.which == 1) {
            Game.markGrid(event, true);
        }
    },

    setMessage: function(message) {
        document.getElementById('messages').innerHTML = message;
    },

    setPauseOnStall: function(setting) {
        if (typeof(setting) == 'undefined') {
            GameSettings.pauseOnStall = document.getElementById('pause-stall').checked;
        } else if (typeof(setting) == 'boolean') {
            GameSettings.pauseOnStall = setting;
        }
    },

    markGrid: function(event, onlyAlive) {
        if (!Game.paused) {
            return;
        }
        if (typeof(onlyAlive) == 'undefined') { onlyAlive = false; }

        var x = event.layerX;
        var y = event.layerY;

        var cellX = (x - (x % GameSettings.cellSize)) / GameSettings.cellSize;
        var cellY = (y - (y % GameSettings.cellSize)) / GameSettings.cellSize;

        if (onlyAlive || Game.currentState[cellX][cellY] === 0) {
            Game.currentState[cellX][cellY] = 1;
        } else {
            Game.currentState[cellX][cellY] = 0;
        }

        Game.drawGrid();
    },

    play: function(delta) {
        clearInterval(Game.timer);
        Game.timer = setInterval(Game.nextGeneration, (100/delta));
        Game.paused = false;
        Game.setMessage('Simulation running');
    },

    pause: function() {
        clearInterval(Game.timer);
        Game.paused = true;
        Game.setMessage('Simulation paused');
    },

    blankGrid: function() {
        var grid = [];
        for (var i = 0; i < Game.cellsPerRow; i++) {
            var row = [];
            for (var j = 0; j < Game.cellsPerColumn; j++) {
                row[j] = 0;
            }
            grid.push(row);
        }
        return grid;
    },

    nextOneStep: function() {
        Game.setMessage('Simulated one step');
        Game.nextGeneration();
    },

    nextGeneration: function() {
        var nextGen = Game.blankGrid();
        var stalled = true;

        for (var i = 0; i < Game.cellsPerRow; i++) {
            for (var j = 0; j < Game.cellsPerColumn; j++) {
                var neighbors = Game.getNeighborCount(i, j);

                if (neighbors < 2) {
                    nextGen[i][j] = 0;
                } else if ((neighbors == 2 || neighbors == 3) && Game.currentState[i][j] === 1) {
                    nextGen[i][j] = 1;
                } else if (neighbors > 3) {
                    nextGen[i][j] = 0;
                } else if (neighbors == 3 && Game.currentState[i][j] === 0) {
                    nextGen[i][j] = 1;
                }

                if (nextGen[i][j] != Game.lastState[i][j]) {
                    stalled = false;
                }
            }
        }

        Game.lastState = Game.currentState.slice();
        Game.currentState = nextGen;
        Game.generation++;
        document.getElementById('generation-count').innerHTML = Game.generation;
        Game.drawGrid();

        if (stalled && !Game.stalled) {
            if (GameSettings.pauseOnStall) {
                Game.pause();
            }
            Game.setMessage('Life has stalled at generation '+Game.generation);
            Game.stalled = true;
        }
    },

    drawGrid: function() {
        Game.ctx.clearRect(0, 0, GameSettings.width, GameSettings.height);

        for (var i = 0; i < (Game.cellsPerColumn); i++) {
            for (var j = 0; j < (Game.cellsPerRow); j++) {
                if (Game.currentState[j][i] === 1) {
                    Game.ctx.fillRect(j*GameSettings.cellSize, i*GameSettings.cellSize, GameSettings.cellSize, GameSettings.cellSize);
                } else {
                    Game.ctx.strokeRect(j*GameSettings.cellSize, i*GameSettings.cellSize, GameSettings.cellSize, GameSettings.cellSize);
                }
            }
        }
    },

    getNeighborCount: function(x, y) {
        var count = 0;

        if (x-1 >= 0) {
            if (Game.currentState[x-1][y] === 1) {
                count++;
            }
        }

        if (x+1 < Game.cellsPerRow) {
            if (Game.currentState[x+1][y] === 1) {
                count++;
            }
        }

        if (y-1 >= 0) {
            if (Game.currentState[x][y-1] === 1) {
                count++;
            }
        }

        if (y+1 < Game.cellsPerColumn) {
            if (Game.currentState[x][y+1] === 1) {
                count++;
            }
        }

        if (y-1 >= 0 && x-1 >= 0) {
            if (Game.currentState[x-1][y-1] === 1) {
                count++;
            }
        }

        if (y-1 >= 0 && x+1 < Game.cellsPerRow) {
            if (Game.currentState[x+1][y-1] === 1) {
                count++;
            }
        }

        if (y+1 < Game.cellsPerColumn && x-1 >= 0) {
            if (Game.currentState[x-1][y+1] === 1) {
                count++;
            }
        }

        if (y+1 < Game.cellsPerColumn && x+1 < Game.cellsPerRow) {
            if (Game.currentState[x+1][y+1] === 1) {
                count++;
            }
        }

        return count;
    }
};

(function() {
    Game.init();
})();
