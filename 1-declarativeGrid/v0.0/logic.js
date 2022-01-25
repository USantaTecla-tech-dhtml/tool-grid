let dim = 71;
let mesh = [];

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

function clear() {
  for (let i = 0; i < dim; i++) {
    mesh[i] = [];
    for (let j = 0; j < dim; j++) {
      mesh[i][j] = " ";
    }
  }
}

function map(expression){
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      mesh[i][j] = eval(expression) ? "*" : " ";
    }
  }
}

function render() {
  try {
    clear();
    map(getExpressionText());
    hideError();
  } catch (ex){
    map("false");
    showError();
  }
  generateGrid();

  function getExpressionText() {
    let expressionText = document.getElementById("expression").value;
    if (expressionText === "expression" || expressionText.trim() === "") {
      expressionText = "false";
    }
    return expressionText;
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

}

function hideError(){
  document.getElementById("error").setAttribute("class", "inactiveError");
}

function showError(){
  document.getElementById("error").setAttribute("class", "activeError");
}
