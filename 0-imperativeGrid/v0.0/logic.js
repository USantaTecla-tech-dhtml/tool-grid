let dim = 71;
let mesh = [];
let row = 0;
let column = 0;

function log(msg) {
  console.log(msg + "(" + row + ", " + column + ")");
}

function clear() {
  for (let i = 0; i < dim; i++) {
    mesh[i] = [];
    for (let j = 0; j < dim; j++) {
      mesh[i][j] = " ";
    }
  }
  row = 0;
  column = 0;
}

function getDimension() {
  return dim;
}

function getDistanceEdge(direction) {
  if (direction == "north") {
    return row;
  }
  if (direction == "south") {
    return dim - row - 1;
  }
  if (direction == "west") {
    return column;
  }
  if (direction == "east") {
    return dim - column - 1;
  }
}

function isOnEdge(direction) {
  if (direction == "north") {
    return row == 0;
  }
  if (direction == "south") {
    return row == dim - 1;
  }
  if (direction == "east") {
    return column == dim - 1;
  }
  if (direction == "west") {
    return column == 0;
  }
}

function draw(direction, distance) {
  if (direction == undefined || distance === undefined) {
    mesh[row][column] = "*";
  } else {
    for (let i = 0; i < distance - 1; i++) {
      draw();
      shift(direction);
    }
    draw();
  }
}

function shift(direction, distance) {
  if (distance != undefined) {
    for (let i = 0; i < distance; i++) {
      shift(direction);
    }
  } else {
    if (direction == "north") {
      row--;
    } else if (direction == "south") {
      row++;
    } else if (direction == "east") {
      column++;
    } else if (direction == "west") {
      column--;
    }
  }
}

function toAscii() {
  let str = "";
  for (let j = 0; j < dim + 2; j++) {
    str += "-";
  }
  str += "\n";
  for (let i = 0; i < dim; i++) {
    str += "|";
    for (let j = 0; j < dim; j++) {
      str += mesh[i][j];
    }
    str += "|\n";
  }
  for (let j = 0; j < dim + 2; j++) {
    str += "-";
  }
  return str;
}

function interpret(msg, script) {
  clear();
  for (sentence of script) {
    sentence.exec();
  }
}

function render() {
  let sequentialSentence
  try {
    sequentialSentence = eval(getScriptText());
    interpret("log", sequentialSentence);
    hideError();
    generatePlantuml(sequentialSentence);
  } catch (ex){
    interpret("log", []);
    showError();
  }
  generateGrid();

  function getScriptText() {
    let scriptText = document.getElementById("script").value;
    if (scriptText === "script" || scriptText.trim() === "") {
      scriptText = "[]";
    }
    return scriptText;
  }

  function generateGrid() {
    let grid = document.getElementById("grid");
    cleanPrevious(grid);
    let table = document.createElement("table");
    table.setAttribute("id", "table");
    for (let i = 0; i < dim; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < dim; j++) {
        let cell = document.createElement("td");
        if (mesh[i][j] == "*") {
          cell.setAttribute("class", "black");
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    grid.appendChild(table);
  }

  function cleanPrevious(div) {
    for (let item of div.childNodes) {
      if (item != null) {
        div.removeChild(item);
      }
    }
  }

  function generatePlantuml(sequentialSentence) {
    let translation = "@startuml\n\nstart";
      for(let sentence of sequentialSentence){
        translation += sentence.toPlantuml();
      }
      translation += "\nstop\n\n@enduml";
    console.log(translation);
    let aux = document.createElement("textarea");
    aux.innerHTML = translation
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }
}

function hideError(){
  document.getElementById("error").setAttribute("class", "inactiveError");
}

function showError(){
  document.getElementById("error").setAttribute("class", "activeError");
}
