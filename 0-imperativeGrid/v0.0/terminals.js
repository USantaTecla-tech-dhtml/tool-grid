function oGetDimension() {

  this.eval = function () {
    return getDimension();
  }

  this.toPlantuml = function () {
    return "getDimension()";
  }
}

function oGetDistanceEdge(direction) {
  this.direction = direction;

  this.eval = function () {
    return getDistanceEdge(direction);
  }

  this.toPlantuml = function () {
    return 'getDistanceEdge("' + this.direction + '")';
  }
}

function oIsOnEdge(direction) {
  this.direction = direction;

  this.eval = function () {
    return isOnEdge(direction);
  }

  this.toPlantuml = function () {
    return 'isOnEdge("' + direction + '")';
  }
}

function oDraw(direction, distance) {
  this.direction = direction;
  this.distance = distance;

  this.exec = function () {
    if (typeof distance == "object") {
      draw(direction, distance.eval());
    } else {
      draw(direction, distance);
    }
  }

  this.toPlantuml = function () {
    let params = "";
    if (this.direction !== undefined) {
      params = '"' + this.direction + '"';
      if (this.distance !== undefined) {
        params += ", ";
        if (typeof this.distance == "number"){
          params += this.distance;
        } else {
          params += this.distance.toPlantuml();
        }
      }
    }
    return "\n:Draw(" + params + ");";
  }
}

function oShift(direction, distance) {
  this.direction = direction;
  this.distance = distance;

  this.exec = function () {
    shift(direction, distance);
  }

  this.toPlantuml = function () {
    params = '"' + this.direction + '"';
    if (this.distance !== undefined) {
      params += ", " + this.distance;
    }
    return "\n:Shift(" + params + ");";
  }
}

function oIf(condition, then, esle) {
  this.condition = condition;
  this.then = then;
  this.esle = esle;

  this.exec = function () {
    let eval = condition.eval();
    if (eval) {
      for (sentence of then) {
        sentence.exec();
      }
    } else if (esle != undefined) {
      for (sentence of esle) {
        sentence.exec();
      }
    }
  }

  this.toPlantuml = function () {
    let msg = "\nif(" + condition.toPlantuml() + ") then (then)";
    for (let sentence of then) {
      msg += sentence.toPlantuml();
    }
    if (this.esle !== undefined) {
      msg += "\nelse (else)";
      for (let sentence of esle) {
        msg += sentence.toPlantuml();
      }
    }
    msg += "\nendif";
    return msg;
  }
}

function oWhile(condition, body) {
  this.condition = condition;
  this.body = body;

  this.exec = function () {
    while (condition.eval()) {
      for (sentence of body) {
        sentence.exec();
      }
    };
  }

  this.toPlantuml = function () {
    let msg = "\nwhile(" + condition.toPlantuml() + ") is (yes)";
    for (let sentence of body) {
      msg += sentence.toPlantuml();
    }
    msg += "\nendwhile (otherwise)";
    return msg;
  }
}

function oDoWhile(body, condition) {
  this.body = body;
  this.condition = condition;

  this.exec = function () {
    do {
      for (sentence of body) {
        sentence.exec();
      }
    } while (condition.eval());
  }

  this.toPlantuml = function () {
    let msg = "\nrepeat";
    for (let sentence of body) {
      msg += sentence.toPlantuml()
    }
    msg += "\nrepeat while (" + this.condition.toPlantuml() + ") is (yes)";
    return msg;
  }
}

function oNot(condition) {
  this.condition = condition;

  this.eval = function () {
    return !condition.eval();
  }

  this.toPlantuml = function () {
    return "!(" + this.condition.toPlantuml() + ")";
  }
}

function oAnd(left, right) {
  this.left = left;
  this.right = right;

  this.eval = function () {
    return left.eval() && right.eval();
  }

  this.toPlantuml = function () {
    return "(" + this.left.toPlantuml() + ") && (" + this.right.toPlantuml() + ")";
  }
}

function oOr(left, right) {
  this.left = left;
  this.right = right;

  this.eval = function () {
    return left.eval() || right.eval();
  }

  this.toPlantuml = function () {
    return "(" + this.left.toPlantuml() + ") || (" + this.right.toPlantuml() + ")";
  }
}

function oEquals(left, right) {
  this.left = left;
  this.right = right;

  this.eval = function () {
    let leftEval = this.left;
    if (typeof this.left == "object") {
      leftEval = this.left.eval();
    }
    let rightEval = this.right;
    if (typeof this.right == "object") {
      rightEval = this.right.eval();
    }
    return leftEval == rightEval;
  }

  this.toPlantuml = function () {
    let leftPlantuml = this.left;
    if (typeof this.left == "object") {
      leftPlantuml = this.left.toPlantuml();
    }
    let rightPlantuml = this.right;
    if (typeof this.right == "object") {
      rightPlantuml = this.right.toPlantuml();
    }
    return "(" + leftPlantuml + " === " + rightPlantuml + ")";
  }
}

function oPlus(left, right) {
  this.left = left;
  this.right = right;

  this.eval = function () {
    let leftEval = this.left;
    if (typeof this.left == "object") {
      leftEval = left.eval();
    }
    let rightEval = this.right;
    if (typeof this.right == "object") {
      rightEval = right.eval();
    }
    return leftEval + rightEval;
  }

  this.toPlantuml = function () {
    let leftPlantuml = this.left;
    if (typeof this.left == "object") {
      leftPlantuml = this.left.toPlantuml();
    }
    let rightPlantuml = this.right;
    if (typeof this.right == "object") {
      rightPlantuml = this.right.toPlantuml();
    }
    return "(" + leftPlantuml + " + " + rightPlantuml + ")";
  }
}

function oMinus(left, right) {
  this.left = left;
  this.right = right;

  this.eval = function () {
    let leftEval = this.left;
    if (typeof this.left == "object") {
      leftEval = left.eval();
    }
    let rightEval = this.right;
    if (typeof this.right == "object") {
      rightEval = right.eval();
    }
    console.log(this.left);
    console.log(leftEval);
    console.log(this.right);
    console.log(rightEval);
    return leftEval - rightEval;
  }

  this.toPlantuml = function () {
    let leftPlantuml = this.left;
    if (typeof this.left == "object") {
      leftPlantuml = this.left.toPlantuml();
    }
    let rightPlantuml = this.right;
    if (typeof this.right == "object") {
      rightPlantuml = this.right.toPlantuml();
    }
    return "(" + leftPlantuml + " - " + rightPlantuml + ")";
  }
}
