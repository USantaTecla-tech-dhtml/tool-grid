function GetDimension() {
  return new oGetDimension();
}

function GetDistanceEdge(direction) {
  return new oGetDistanceEdge(direction);
}

function IsOnEdge(direction) {
  return new oIsOnEdge(direction);
}

function Draw(direction, distance) {
  return new oDraw(direction, distance);
}

function Shift(direction, distance) {
  return new oShift(direction, distance);
}

function If(condition, then, esle) {
  return new oIf(condition, then, esle);
}

function While(condition, body) {
  return new oWhile(condition, body);
}

function DoWhile(body, condition) {
  return new oDoWhile(body, condition);
}

function Not(condition) {
  return new oNot(condition);
}

function And(left, right) {
  return new oAnd(left, right);
}

function Or(left, right) {
  return new oOr(left, right);
}

function Equals(left, right) {
  return new oEquals(left, right);
}

function Plus(left, right) {
  return new oPlus(left, right);
}

function Minus(left, right) {
  return new oMinus(left, right);
}

// drawShape("linea horizontal", () => {
//   draw("east", getDimension());
// });

// drawShape("linea horizontal", () => {
//   draw();
//   while (!isOnEdge("east")) {
//     shift("east");
//     draw();
//   }
// });

// drawShape("linea punteada", () => {
//   do {
//     draw();
//     shift("east", 2);
//   } while (!isOnEdge("east"));
//   draw();
// });

// drawShape("linea diagonal", () => {
//   do {
//     draw();
//     shift("east");
//     shift("south");
//   } while (!isOnEdge("east"));
//   draw();
// });

// drawShape("punto central", () => {
//   do {
//     shift("east");
//     shift("south");
//   } while (getDistanceEdge("east") != getDistanceEdge("west"));
//   draw();
// });

// drawShape("cuadrado central", () => {
//   do {
//     shift("east");
//     shift("south");
//   } while (getDistanceEdge("east") != getDistanceEdge("west"));
//   shift("west");
//   shift("north");
//   draw("east", 3);
//   draw("south", 3);
//   draw("west", 3);
//   draw("north", 3);
// });

