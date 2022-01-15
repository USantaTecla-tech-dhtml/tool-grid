interpret("linea horizontal, a) con GetDimension",
[
  Draw("east", GetDimension()),
]
);

interpret("linea horizontal, b) con DoWhile",
[
  DoWhile(
    [
      Draw(),
      Shift("east")
    ],
    Not(
      IsOnEdge("east"))),
  Draw()
]
);

interpret("linea horizontal, c) con While",
[
  Draw(),
  While(
    Not(
      IsOnEdge("east")),
    [
      Shift("east"),
      Draw(),
    ]
  )
]
);

interpret("linea punteada",
[
  DoWhile(
    [
      Draw(),
      Shift("east", 2)
    ],
    Not(
      IsOnEdge("east"))),
  Draw()
]
);

interpret("linea diagonal",
[
  DoWhile(
    [
      Draw(),
      Shift("east"),
      Shift("south"),
    ],
    Not(
      IsOnEdge("east"))),
  Draw()
]
);

interpret("punto central",
[
  DoWhile(
    [
      Shift("east"),
      Shift("south"),
    ],
    Not(
      Equals(
        GetDistanceEdge("east"),
        GetDistanceEdge("west")))),
  Draw(),
]
);

interpret("cuadrado central",
[
  DoWhile(
    [
      Shift("east"),
      Shift("south"),
    ],
    Not(
      Equals(
        GetDistanceEdge("east"),
        GetDistanceEdge("west")))),
  Shift("west"),
  Shift("north"),
  Draw("east", 3),
  Draw("south", 3),
  Draw("west", 3),
  Draw("north", 3)
]
);

interpret("todos sin la 2,2",
[
  DoWhile(
    [
      DoWhile(
        [
          If(
            Not(
              And(
                Equals(
                  GetDistanceEdge("north"),
                  2),
                Equals(
                  GetDistanceEdge("west"),
                  2))),
            [
              Draw()
            ]),
          Shift("east"),
        ],
        Not(
          IsOnEdge("east")
        )),
      If(
        Not(
          And(
            Equals(
              GetDistanceEdge("north"),
              2),
            Equals(
              GetDistanceEdge("west"),
              2))),
        [
          Draw()
        ]),
      Shift("south"),
      DoWhile(
        [
          Shift("west"),
        ],
        Not(
          IsOnEdge("west")))
    ],
    Not(
      IsOnEdge("south"))),
  DoWhile(
    [
      If(
        Not(
          And(
            Equals(
              GetDistanceEdge("north"),
              2),
            Equals(
              GetDistanceEdge("west"),
              2))),
        [
          Draw()
        ]),
      Shift("east"),
    ],
    Not(
      IsOnEdge("east"))),
  If(
    Not(
      And(
        Equals(
          GetDistanceEdge("north"),
          2),
        Equals(
          GetDistanceEdge("west"),
          2))),
    [
      Draw()
    ])
]
);

interpret("linea horizontal centrada con 5",
[
  DoWhile(
    [
      Shift("east"),
    ],
    Not(
      Equals(
        GetDistanceEdge("east"),
        GetDistanceEdge("west")))),
  Shift("west", 2),
  Draw("east", 5)
]
);

interpret("diagonal inversa",
[
  DoWhile(
    [
      DoWhile(
        [
          If(
            Equals(
              Plus(
                GetDistanceEdge("north"),
                GetDistanceEdge("west"),
              ),
              Minus(
                GetDimension(),
                1)),
            [
              Draw()
            ]),
          Shift("east"),
        ],
        Not(
          IsOnEdge("east"))),
      If(
        Equals(
          Plus(
            GetDistanceEdge("north"),
            GetDistanceEdge("west")),
          Minus(
            GetDimension(),
            1)),
        [
          Draw()
        ]),
      Shift("south"),
      DoWhile(
        [
          Shift("west"),
        ],
        Not(
          IsOnEdge("west")))
    ],
    Not(
      IsOnEdge("south"))),
  DoWhile(
    [
      If(
        Equals(
          Plus(
            GetDistanceEdge("north"),
            GetDistanceEdge("west")),
          Minus(
            GetDimension(),
            1)),
        [
          Draw()
        ]),
      Shift("east"),
    ],
    Not(
      IsOnEdge("east"))),
  If(
    Equals(
      Plus(
        GetDistanceEdge("north"),
        GetDistanceEdge("west")),
      Minus(
        GetDimension(),
        1)),
    [
      Draw()
    ])
]
);