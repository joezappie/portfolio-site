import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { injectTheme } from '#decorators/theme.js';

function Generate(ctx) {
  var mapSize = 20;
  var cellSize = 15;
  var size = mapSize * cellSize;

  // Update the size of the canvas
  ctx.canvas.width = size;
  ctx.canvas.height = size;

  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  var TYPES = {
    NONE: 0,
    RESIDENTIAL: 1,
    COMMERCIAL: 2,
    INDUSTRIAL: 3,
    ROAD: 7,
    TEMPLE: 4,
  };

  function RandomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.type = TYPES.NONE;
    this.id = -1;
    this.color = '';
  }

  function setId(i, j, id) {
    if (i < mapSize && j < mapSize) {
      grid[i][j].id = id;
    }
  }

  function shuffle(array) {
    var copy = [],
      n = array.length,
      i;

    // While there remain elements to shuffleâ€¦
    while (n) {
      // Pick a remaining elementâ€¦
      i = Math.floor(Math.random() * array.length);

      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }

    return copy;
  }

  // Get all cells as a 1 dimensional array
  function GetAllCells() {
    var cells = [];
    for (var i = 0; i < mapSize; i += 2) {
      for (var j = 0; j < mapSize; j += 2) {
        cells.push(grid[i][j]);
      }
    }
    return cells;
  }

  function getType(i, j) {
    return grid[i][j].id % 5;
  }

  function getCell(i, j) {
    return grid[i][j];
  }

  function getNeighbors(i, j) {
    var neighbors = [];

    if (IsInBounds(i - 1, j)) neighbors.push(getCell(i - 1, j));
    if (IsInBounds(i + 1, j)) neighbors.push(getCell(i + 1, j));
    if (IsInBounds(i, j - 1)) neighbors.push(getCell(i, j - 1));
    if (IsInBounds(i, j + 1)) neighbors.push(getCell(i, j + 1));

    return neighbors;
  }

  function IsInBounds(i, j) {
    return !(i < 0 || i >= mapSize || j < 0 || j >= mapSize);
  }

  // Check if the neighbor to the right or below is a road and if so replace self as a road cell
  function checkIfRoad(i, j) {
    if (IsInBounds(i + 1, j) && grid[i + 1][j].id != grid[i][j].id) {
      grid[i][j].type = TYPES.ROAD;
      return;
    }

    if (IsInBounds(i, j + 1) && grid[i][j + 1].id != grid[i][j].id) {
      grid[i][j].type = TYPES.ROAD;
      return;
    }

    if (IsInBounds(i + 1, j + 1) && grid[i + 1][j + 1].id != grid[i][j + 1].id) {
      grid[i][j].type = TYPES.ROAD;
      return;
    }
  }

  // Convert type to a color
  function getColor(zone) {
    if (zone == TYPES.RESIDENTIAL) {
      return '#00FF00';
    }
    if (zone == TYPES.COMMERCIAL) {
      return '#0000FF';
    }
    if (zone == TYPES.INDUSTRIAL) {
      return '#FF0000';
    }
    if (zone == TYPES.TEMPLE) {
      return '#FF00FF';
    }
    if (zone == TYPES.ROAD) {
      return '#303030';
    }
  }

  // Generate the grid
  var grid = [];

  for (var i = 0; i < mapSize; i++) {
    grid[i] = [];
    for (var j = 0; j < mapSize; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // Get a random order to loop through the cells
  var checkOrder = shuffle(GetAllCells());
  var minSize = 4;
  var maxSize = 10;
  var id = 0;

  function generateBlock() {
    if (id < checkOrder.length) {
      var curTile = checkOrder[id];

      if (curTile.type == TYPES.NONE) {
        setTimeout(function () {
          var direction = Math.random() > 0.5 ? 1 : 0;
          var square_width = Math.floor(RandomRange(minSize, direction ? maxSize : minSize));
          var square_height = Math.floor(RandomRange(minSize, direction ? minSize : maxSize));

          var zones = [TYPES.RESIDENTIAL, TYPES.COMMERCIAL, TYPES.INDUSTRIAL];
          var zone = zones[Math.floor(Math.random() * zones.length)];
          var color = getRandomColor();

          for (var i = 0; i < square_width; i += 2) {
            for (var j = 0; j < square_height; j += 2) {
              setTile(curTile.i + i, curTile.j + j, id, zone);
              drawCell(curTile.i + i, curTile.j + j, getColor(zone));
            }
          }

          id++;
          generateBlock();
        }, 150);
      } else {
        id++;
        generateBlock();
      }
    } else {
      drawTemple();
    }
  }

  generateBlock();

  function setTile(i, j, id, zone) {
    if (IsInBounds(i + 1, j + 1)) {
      grid[i][j].id = id; // [x] O
      grid[i][j].type = zone; //	O  O

      grid[i + 1][j].id = id; //	x [O]
      grid[i + 1][j].type = zone; //	O  O

      grid[i][j + 1].id = id; //	x  O
      grid[i][j + 1].type = zone; // [O] O

      grid[i + 1][j + 1].id = id; //  x  O
      grid[i + 1][j + 1].type = zone; // 	O [O]
    }
  }

  function drawCell(i, j, color) {
    ctx.fillStyle = color;
    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
    ctx.fillRect((i + 1) * cellSize, j * cellSize, cellSize, cellSize);
    ctx.fillRect(i * cellSize, (j + 1) * cellSize, cellSize, cellSize);
    ctx.fillRect((i + 1) * cellSize, (j + 1) * cellSize, cellSize, cellSize);
  }

  function drawTemple() {
    setTimeout(function () {
      var templei = 2 * Math.round(Math.floor(RandomRange(mapSize * 0.25, mapSize * 0.75)) / 2);
      var templej = 2 * Math.round(Math.floor(RandomRange(mapSize * 0.25, mapSize * 0.75)) / 2);

      setTile(templei, templej, 1000, TYPES.TEMPLE);
      setTile(templei + 2, templej + 2, 1000, TYPES.TEMPLE);
      setTile(templei, templej + 2, 1000, TYPES.TEMPLE);
      setTile(templei + 2, templej, 1000, TYPES.TEMPLE);

      drawCell(templei, templej, getColor(TYPES.TEMPLE));
      drawCell(templei + 2, templej, getColor(TYPES.TEMPLE));
      drawCell(templei, templej + 2, getColor(TYPES.TEMPLE));
      drawCell(templei + 2, templej + 2, getColor(TYPES.TEMPLE));

      drawRoads();
    }, 1000);
  }

  function drawRoads() {
    setTimeout(function () {
      for (var i = 0; i < mapSize; i++) {
        for (var j = 0; j < mapSize; j++) {
          checkIfRoad(i, j);
          drawCell(i, j, getColor(grid[i][j].type));
        }
      }

      setTimeout(function () {
        Generate(ctx);
      }, 3000);
    }, 1500);
  }
}

@customElement('city-generator')
class CityGenerator extends LitElement {
  @injectTheme() static styles;

  @query('canvas') canvas;

  firstUpdated() {
    Generate(this.canvas.getContext('2d'));
  }

  render() {
    return html` <canvas></canvas> `;
  }
}

export { CityGenerator };
