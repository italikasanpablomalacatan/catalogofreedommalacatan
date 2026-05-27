// data.js - Catálogo Completo Freedom Mayo 2026
const motos = [
  // --- MODELOS DE TRABAJO ---
  {
    "nombre": "fire1257",
    "modelo": "FIRE 125-7",
    "categoria": "Trabajo",
    "precio": 9990
  },
  {
    "nombre": "fire125tt",
    "modelo": "FIRE 125 TT",
    "categoria": "Trabajo",
    "precio": 10690
  },
  {
    "nombre": "fire150",
    "modelo": "FIRE 150",
    "categoria": "Trabajo",
    "precio": 10740
  },
  {
    "nombre": "fire150tt",
    "modelo": "FIRE 150 TT",
    "categoria": "Trabajo",
    "precio": 11240
  },
  {
    "nombre": "fire210",
    "modelo": "FIRE 210",
    "categoria": "Trabajo",
    "precio": 12640
  },
  {
    "nombre": "fire210tt",
    "modelo": "FIRE 210 TT",
    "categoria": "Trabajo",
    "precio": 13140
  },
  {
    "nombre": "tunningx125",
    "modelo": "TUNNING X125 (Nuevo Modelo)",
    "categoria": "Trabajo",
    "precio": 8790
  },

  // --- SPORT ---
  {
    "nombre": "cr1150",
    "modelo": "CR1 150",
    "categoria": "Sport",
    "precio": 11490
  },
  {
    "nombre": "switch150",
    "modelo": "SWITCH 150",
    "categoria": "Sport",
    "precio": 13290
  },
  {
    "nombre": "holkan160",
    "modelo": "HOLKAN 160",
    "categoria": "Sport",
    "precio": 14290
  },
  {
    "nombre": "cr4210",
    "modelo": "CRII 210",
    "categoria": "Sport",
    "precio": 13290
  },
  {
    "nombre": "cr4",
    "modelo": "CR4 (Nuevo Diseño)",
    "categoria": "Sport",
    "precio": 16990
  },
  {
    "nombre": "cr4n250",
    "modelo": "CR 4N 250",
    "categoria": "Sport",
    "precio": 15990
  },
  {
    "nombre": "cr52504v",
    "modelo": "CR5-250 4V",
    "categoria": "Sport",
    "precio": 19290
  },
  {
    "nombre": "spitzer250",
    "modelo": "SPITZER 250 (Edición Limitada)",
    "categoria": "Sport",
    "precio": 16990
  },
  {
    "nombre": "spitzer250gp2",
    "modelo": "SPITZER 250 GP2 (Nuevo Modelo)",
    "categoria": "Sport",
    "precio": 19990
  },

  // --- CROSSOVER ---
  {
    "nombre": "klik110",
    "modelo": "KLIK 110",
    "categoria": "Crossover",
    "precio": 9990
  },
  {
    "nombre": "klik150",
    "modelo": "KLIK 150 (Nuevo Modelo)",
    "categoria": "Crossover",
    "precio": 10490
  },

  // --- MOTONETAS ---
  {
    "nombre": "space125",
    "modelo": "SPACE 125",
    "categoria": "Motonetas",
    "precio": 9990
  },
  {
    "nombre": "sweet125",
    "modelo": "SWEET 125",
    "categoria": "Motonetas",
    "precio": 9490
  },
  {
    "nombre": "f15125",
    "modelo": "F15-125",
    "categoria": "Motonetas",
    "precio": 5490
  },
  {
    "nombre": "superlifer150",
    "modelo": "SUPER LIFE R 150",
    "categoria": "Motonetas",
    "precio": 10990
  },
  {
    "nombre": "agilitykymco",
    "modelo": "AGILITY (KYMCO)",
    "categoria": "Motonetas",
    "precio": 13490
  },
  {
    "nombre": "racing150ikymco",
    "modelo": "RACING 150i (KYMCO)",
    "categoria": "Motonetas",
    "precio": 25490
  },
  {
    "nombre": "dtx350kymco",
    "modelo": "DTX 350 (KYMCO)",
    "categoria": "Motonetas",
    "precio": 48490
  },

  // --- DOBLE PROPÓSITO ---
  {
    "nombre": "fxr150l",
    "modelo": "FXR150L",
    "categoria": "Doble Propósito",
    "precio": 11240
  },
  {
    "nombre": "fxr200l",
    "modelo": "FXR200L",
    "categoria": "Doble Propósito",
    "precio": 12990
  },
  {
    "nombre": "fxr200lnuevo",
    "modelo": "FXR200L (Nuevo Diseño)",
    "categoria": "Doble Propósito",
    "precio": 13140
  },
  {
    "nombre": "avatar200lx",
    "modelo": "AVATAR 200 LX",
    "categoria": "Doble Propósito",
    "precio": 12490
  },
  {
    "nombre": "tank250",
    "modelo": "TANK 250 (Nuevo Modelo)",
    "categoria": "Doble Propósito",
    "precio": 16990
  },

  // --- SEMI AUTOMÁTICAS ---
  {
    "nombre": "trip110",
    "modelo": "TRIP 110",
    "categoria": "Semi Automáticas",
    "precio": 7990
  },
  {
    "nombre": "trip125r",
    "modelo": "TRIP 125 R (Nuevo Modelo)",
    "categoria": "Semi Automáticas",
    "precio": 8740
  },

  // --- MOTO CARGO ---
  {
    "nombre": "bufalo250",
    "modelo": "BÚFALO 250",
    "categoria": "Moto Cargo",
    "precio": 25240
  },

  // --- 4 RUEDAS (ATV / UTVS) ---
  {
    "nombre": "mongoose90s",
    "modelo": "MONGOOSE 90S",
    "categoria": "4 Ruedas",
    "precio": 25490
  },
  {
    "nombre": "mxu150",
    "modelo": "MXU 150",
    "categoria": "4 Ruedas",
    "precio": 40490
  },
  {
    "nombre": "mxer250",
    "modelo": "MXER 250 OFF ROAD",
    "categoria": "4 Ruedas",
    "precio": 46990
  },
  {
    "nombre": "mxu300r",
    "modelo": "MXU 300R",
    "categoria": "4 Ruedas",
    "precio": 48490
  },
  {
    "nombre": "mxu250iex",
    "modelo": "MXU 250i EX",
    "categoria": "4 Ruedas",
    "precio": 100490
  },
  {
    "nombre": "mxu700ile",
    "modelo": "MXU 700i LE",
    "categoria": "4 Ruedas",
    "precio": 97490
  },
  {
    "nombre": "uxv7004x4",
    "modelo": "UXV 700 4x4",
    "categoria": "4 Ruedas",
    "precio": 128990
  },
  {
    "nombre": "uxv700i4x4",
    "modelo": "UXV 700i 4X4",
    "categoria": "4 Ruedas",
    "precio": 120290
  },
  {
    "nombre": "xwolf200",
    "modelo": "XWOLF 200 (Loncin)",
    "categoria": "4 Ruedas",
    "precio": 27640
  },
  {
    "nombre": "xwolf300",
    "modelo": "XWOLF 300 (Loncin)",
    "categoria": "4 Ruedas",
    "precio": 37640
  }
];