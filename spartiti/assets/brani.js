/* Repertorio: un oggetto per brano.
   abc  = notazione ABC (diteggiatura: "^n" destra sopra, "_n" sinistra sotto)
   dx / sx = [nota MIDI, durata in movimenti] per l'ascolto; [0, durata] = pausa
   posizione = "DO" | "LA" | "LIBERA"  */
window.BRANI = [
    {
      id:"inno",
      nome:"Inno alla gioia",
      sotto:"Beethoven · 1824",
      tonalita:"Do maggiore · 4/4 · nessuna alterazione",
      livello:"Livello 1",
      tempo:88,
      studio:[
        ["Mano destra","Parte dal Mi con il medio (3) e non si sposta mai: le cinque note stanno sotto le dita."],
        ["Mano sinistra","Solo semibrevi: un suono per battuta, tenuto per quattro movimenti."],
        ["Da curare","Le ultime due battute di ogni frase: la nota puntata dura un movimento e mezzo."]
      ],
      abc:[
"X:1",
"T:Inno alla gioia",
"C:Ludwig van Beethoven",
"M:4/4",
"L:1/4",
"Q:1/4=88",
"%%score {1 | 2}",
"V:1 clef=treble",
"V:2 clef=bass",
"K:C",
'V:1',
'"^3"E "^3"E "^4"F "^5"G | "^5"G "^4"F "^3"E "^2"D | "^1"C "^1"C "^2"D "^3"E | "^3"E3/2 "^2"D/2 "^2"D2 |',
'V:2',
'"_5"C,4 | "_1"G,4 | "_5"C,4 | "_1"G,4 |',
'V:1',
'"^3"E "^3"E "^4"F "^5"G | "^5"G "^4"F "^3"E "^2"D | "^1"C "^1"C "^2"D "^3"E | "^2"D3/2 "^1"C/2 "^1"C2 |]',
'V:2',
'"_5"C,4 | "_1"G,4 | "_5"C,4 | "_1"G,2 "_5"C,2 |]'
      ].join("\n"),
      dx:[[64,1],[64,1],[65,1],[67,1],[67,1],[65,1],[64,1],[62,1],[60,1],[60,1],[62,1],[64,1],[64,1.5],[62,.5],[62,2],
          [64,1],[64,1],[65,1],[67,1],[67,1],[65,1],[64,1],[62,1],[60,1],[60,1],[62,1],[64,1],[62,1.5],[60,.5],[60,2]],
      sx:[[48,4],[55,4],[48,4],[55,4],[48,4],[55,4],[48,4],[55,2],[48,2]]
    },
    {
      id:"mary",
      nome:"Mary Had a Little Lamb",
      sotto:"Tradizionale · 1830",
      tonalita:"Do maggiore · 4/4 · nessuna alterazione",
      livello:"Livello 1",
      tempo:96,
      studio:[
        ["Mano destra","Tre note vicine — Do, Re, Mi — con pollice, indice e medio. Solo due volte si sale al Sol."],
        ["Mano sinistra","Alterna Do e Sol: mignolo e pollice, senza mai muovere il braccio."],
        ["Da curare","Il salto Mi–Sol della quarta battuta: prepara il mignolo prima di suonare."]
      ],
      abc:[
"X:1",
"T:Mary Had a Little Lamb",
"C:Melodia tradizionale",
"M:4/4",
"L:1/4",
"Q:1/4=96",
"%%score {1 | 2}",
"V:1 clef=treble",
"V:2 clef=bass",
"K:C",
'V:1',
'"^3"E "^2"D "^1"C "^2"D | "^3"E "^3"E "^3"E2 | "^2"D "^2"D "^2"D2 | "^3"E "^5"G "^5"G2 |',
'V:2',
'"_5"C,4 | "_5"C,4 | "_1"G,4 | "_5"C,4 |',
'V:1',
'"^3"E "^2"D "^1"C "^2"D | "^3"E "^3"E "^3"E "^3"E | "^2"D "^2"D "^3"E "^2"D | "^1"C4 |]',
'V:2',
'"_5"C,4 | "_5"C,4 | "_1"G,4 | "_5"C,4 |]'
      ].join("\n"),
      dx:[[64,1],[62,1],[60,1],[62,1],[64,1],[64,1],[64,2],[62,1],[62,1],[62,2],[64,1],[67,1],[67,2],
          [64,1],[62,1],[60,1],[62,1],[64,1],[64,1],[64,1],[64,1],[62,1],[62,1],[64,1],[62,1],[60,4]],
      sx:[[48,4],[48,4],[55,4],[48,4],[48,4],[48,4],[55,4],[48,4]]
    },
    {
      id:"jingle",
      nome:"Jingle Bells",
      sotto:"J. Pierpont · 1857",
      tonalita:"Do maggiore · 4/4 · nessuna alterazione",
      livello:"Livello 1",
      tempo:112,
      studio:[
        ["Mano destra","Ritornello: il medio ripete il Mi per due battute, poi la frase scende fino al Do."],
        ["Mano sinistra","Tre suoni soltanto: Do, Fa e Sol, uno per battuta."],
        ["Da curare","Battuta 5: quattro Fa uguali con l'anulare, senza accelerare."]
      ],
      abc:[
"X:1",
"T:Jingle Bells",
"C:James Lord Pierpont",
"M:4/4",
"L:1/4",
"Q:1/4=112",
"%%score {1 | 2}",
"V:1 clef=treble",
"V:2 clef=bass",
"K:C",
'V:1',
'"^3"E "^3"E "^3"E2 | "^3"E "^3"E "^3"E2 | "^3"E "^5"G "^1"C "^2"D | "^3"E4 |',
'V:2',
'"_5"C,4 | "_5"C,4 | "_5"C,4 | "_5"C,4 |',
'V:1',
'"^4"F "^4"F "^4"F "^4"F | "^4"F "^3"E "^3"E "^3"E | "^5"G "^5"G "^4"F "^2"D | "^1"C4 |]',
'V:2',
'"_2"F,4 | "_5"C,4 | "_1"G,4 | "_5"C,4 |]'
      ].join("\n"),
      dx:[[64,1],[64,1],[64,2],[64,1],[64,1],[64,2],[64,1],[67,1],[60,1],[62,1],[64,4],
          [65,1],[65,1],[65,1],[65,1],[65,1],[64,1],[64,1],[64,1],[67,1],[67,1],[65,1],[62,1],[60,4]],
      sx:[[48,4],[48,4],[48,4],[48,4],[53,4],[48,4],[55,4],[48,4]]
    },
    {
      id:"ostinato",
      nome:"Ostinato in la minore",
      sotto:"Esercizio originale · 2026",
      tonalita:"La minore · 4/4 · nessuna alterazione",
      livello:"Livello 2",
      tempo:104,
      posizione:"LA",
      studio:[
        ["Mano destra","Posizione di La: pollice sul La, mignolo sul Mi. La melodia scende e risale sempre dentro queste cinque note."],
        ["Mano sinistra","Ostinato di due note, mignolo e pollice, uguale per tutto il pezzo: è il motore ritmico, tienilo regolare come un metronomo."],
        ["Da curare","Battute 9–10: la sinistra si sposta sul Do con il medio, poi torna al La. Il resto non cambia."]
      ],
      abc:[
"X:1",
"T:Ostinato in la minore",
"C:Esercizio originale per principianti",
"M:4/4",
"L:1/4",
"Q:1/4=104",
"%%score {1 | 2}",
"V:1 clef=treble",
"V:2 clef=bass",
"K:Am",
'V:1',
'"^5"e "^5"e "^4"d "^3"c | "^4"d "^3"c "^2"B2 | "^3"c "^3"c "^2"B "^1"A | "^2"B2 "^1"A2 |',
'V:2',
'"_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, |',
'V:1',
'"^5"e "^5"e "^4"d "^3"c | "^4"d "^3"c "^2"B2 | "^3"c "^3"c "^4"d "^5"e | "^1"A4 |',
'V:2',
'"_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, |',
'V:1',
'"^1"A "^3"c "^5"e "^3"c | "^4"d "^3"c "^2"B2 | "^1"A "^3"c "^5"e "^4"d | "^3"c2 "^2"B2 |',
'V:2',
'"_3"C, "_1"E, "_3"C, "_1"E, | "_3"C, "_1"E, "_3"C, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, |',
'V:1',
'"^5"e "^5"e "^4"d "^3"c | "^4"d "^3"c "^2"B2 | "^3"c "^2"B "^1"A "^2"B | "^1"A4 |]',
'V:2',
'"_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,, "_1"E, "_5"A,, "_1"E, | "_5"A,,4 |]'
      ].join("\n"),
      dx:[[76,1],[76,1],[74,1],[72,1],[74,1],[72,1],[71,2],[72,1],[72,1],[71,1],[69,1],[71,2],[69,2],
          [76,1],[76,1],[74,1],[72,1],[74,1],[72,1],[71,2],[72,1],[72,1],[74,1],[76,1],[69,4],
          [69,1],[72,1],[76,1],[72,1],[74,1],[72,1],[71,2],[69,1],[72,1],[76,1],[74,1],[72,2],[71,2],
          [76,1],[76,1],[74,1],[72,1],[74,1],[72,1],[71,2],[72,1],[71,1],[69,1],[71,1],[69,4]],
      sx:(function(){
        var a = [], i;
        for(i=0;i<8;i++) a.push([45,1],[52,1],[45,1],[52,1]);
        for(i=0;i<2;i++) a.push([48,1],[52,1],[48,1],[52,1]);
        for(i=0;i<5;i++) a.push([45,1],[52,1],[45,1],[52,1]);
        a.push([45,4]);
        return a;
      })()
    },
    {
      id:"chiarodiluna",
      nome:"Au clair de la lune",
      sotto:"Tradizionale francese · XVIII sec.",
      tonalita:"Do maggiore · 4/4 · nessuna alterazione",
      livello:"Livello 1+",
      tempo:84,
      posizione:"DO",
      spostamento:"Battute 9–12: la destra scende in posizione di Sol (pollice sul Sol sotto il Do centrale, mignolo sul Re). Alla battuta 13 torna in posizione di Do.",
      studio:[
        ["Mano destra","Le prime otto battute usano tre sole note: Do, Re, Mi. È il brano più facile della raccolta."],
        ["Mano sinistra","Do e Sol alternati, mignolo e pollice. Nella parte centrale passa a Sol e Fa."],
        ["Da curare","Lo spostamento di battuta 9: è il primo vero cambio di posizione. Guarda la tastiera, non le mani, e prepara il pollice sul Sol durante la pausa."]
      ],
      abc:[
"X:1",
"T:Au clair de la lune",
"C:Melodia tradizionale francese",
"M:4/4",
"L:1/4",
"Q:1/4=84",
"%%score {1 | 2}",
"V:1 clef=treble",
"V:2 clef=bass",
"K:C",
'V:1',
'"^1"C "^1"C "^1"C "^2"D | "^3"E2 "^2"D2 | "^1"C "^3"E "^2"D "^2"D | "^1"C4 |',
'V:2',
'"_5"C,4 | "_5"C,2 "_1"G,2 | "_5"C,2 "_1"G,2 | "_5"C,4 |',
'V:1',
'"^1"C "^1"C "^1"C "^2"D | "^3"E2 "^2"D2 | "^1"C "^3"E "^2"D "^2"D | "^1"C4 |',
'V:2',
'"_5"C,4 | "_5"C,2 "_1"G,2 | "_5"C,2 "_1"G,2 | "_5"C,4 |',
'V:1',
'"^5"D "^5"D "^5"D "^5"D | "^2"A,2 "^2"A,2 | "^5"D "^4"C "^3"B, "^2"A, | "^1"G,4 |',
'V:2',
'"_1"G,4 | "_2"F,4 | "_1"G,4 | "_5"C,4 |',
'V:1',
'"^1"C "^1"C "^1"C "^2"D | "^3"E2 "^2"D2 | "^1"C "^3"E "^2"D "^2"D | "^1"C4 |]',
'V:2',
'"_5"C,4 | "_5"C,2 "_1"G,2 | "_5"C,2 "_1"G,2 | "_5"C,4 |]'
      ].join("\n"),
      dx:(function(){
        var A = [[60,1],[60,1],[60,1],[62,1],[64,2],[62,2],[60,1],[64,1],[62,1],[62,1],[60,4]];
        return A.concat(A,
          [[62,1],[62,1],[62,1],[62,1],[57,2],[57,2],[62,1],[60,1],[59,1],[57,1],[55,4]],
          A);
      })(),
      sx:(function(){
        var A = [[48,4],[48,2],[55,2],[48,2],[55,2],[48,4]];
        return A.concat(A, [[55,4],[53,4],[55,4],[48,4]], A);
      })()
    },
    {
      id:"minuetto",
      nome:"Minuetto in Sol maggiore",
      sotto:"C. Petzold · Quaderno di Anna Magdalena Bach",
      tonalita:"Sol maggiore · 3/4 · un diesis (fa)",
      livello:"Livello 3",
      tempo:116,
      posizione:"LIBERA",
      studio:[
        ["Mano destra","Ogni battuta parte da una nota lunga e prosegue in crome: pensa a un movimento pesante seguito da tre leggeri. Alle battute 3 e 4 la mano sale di una terza, poi torna."],
        ["Mano sinistra","Qui smette di accompagnare e canta anche lei: è il primo brano in cui le due mani suonano due melodie diverse. Nella prima battuta tiene insieme Si e Re, con le dita 3 e 1."],
        ["Da curare","Studia le mani separate finché non vanno a memoria, poi unisci a metà velocità. Il salto di ottava alle battute 4 e 12 è il punto più delicato."]
      ],
      abc:[
"X:1",
"T:Minuetto in Sol maggiore",
"C:Christian Petzold — Quaderno di Anna Magdalena Bach, BWV Anh. 114",
"M:3/4",
"L:1/8",
"Q:1/4=116",
"%%score {1 | 2}",
"V:1 clef=treble",
"V:2 clef=bass",
"K:G",
'V:1',
'"^5"d2 "^1"G "^2"A "^3"B "^4"c | "^5"d2 "^1"G2 "^1"G2 | "^5"e2 "^1"c "^2"d "^3"e "^4"f | "^5"g2 "^1"G2 "^1"G2 |',
'V:2',
'[B,D]4 "_4"A,2 | "_3"B,6 | "_2"C6 | "_3"B,6 |',
'V:1',
'"^4"c2 "^5"d "^4"c "^3"B "^2"A | "^3"B2 "^4"c "^3"B "^2"A "^1"G | "^1"F2 "^2"G "^3"A "^4"B "^2"G | "^3"A6 |',
'V:2',
'"_4"A,6 | "_5"G,6 | "_1"D2 "_3"B,2 "_5"G,2 | "_1"D2 "_5"D, "_1"C "_2"B, "_3"A, |',
'V:1',
'"^5"d2 "^1"G "^2"A "^3"B "^4"c | "^5"d2 "^1"G2 "^1"G2 | "^5"e2 "^1"c "^2"d "^3"e "^4"f | "^5"g2 "^1"G2 "^1"G2 |',
'V:2',
'"_3"B,4 "_4"A,2 | "_5"G,2 "_3"B,2 "_5"G,2 | "_2"C6 | "_3"B,2 "_2"C "_3"B, "_4"A, "_5"G, |',
'V:1',
'"^4"c2 "^5"d "^4"c "^3"B "^2"A | "^3"B2 "^4"c "^3"B "^2"A "^1"G | "^3"A2 "^4"B "^3"A "^2"G "^1"F | "^2"G6 |]',
'V:2',
'"_3"A,4 "_5"F,2 | "_5"G,4 "_3"B,2 | "_2"C2 "_1"D2 "_5"D,2 | "_1"G,4 "_5"G,,2 |]'
      ].join("\n"),
      dx:(function(){
        var a1 = [[74,1],[67,.5],[69,.5],[71,.5],[72,.5],
                  [74,1],[67,1],[67,1],
                  [76,1],[72,.5],[74,.5],[76,.5],[78,.5],
                  [79,1],[67,1],[67,1]],
            a2 = [[72,1],[74,.5],[72,.5],[71,.5],[69,.5],
                  [71,1],[72,.5],[71,.5],[69,.5],[67,.5]];
        return a1.concat(a2,
          [[66,1],[67,.5],[69,.5],[71,.5],[67,.5],[69,3]],
          a1, a2,
          [[69,1],[71,.5],[69,.5],[67,.5],[66,.5],[67,3]]);
      })(),
      sx:[[59,2],[57,1],[59,3],[60,3],[59,3],
          [57,3],[55,3],
          [62,1],[59,1],[55,1],
          [62,1],[50,.5],[60,.5],[59,.5],[57,.5],
          [59,2],[57,1],
          [55,1],[59,1],[55,1],
          [60,3],
          [59,1],[60,.5],[59,.5],[57,.5],[55,.5],
          [57,2],[54,1],
          [55,2],[59,1],
          [60,1],[62,1],[50,1],
          [55,2],[43,1]]
    },
    {
      id:"perelisa",
      nome:"Per Elisa — tema iniziale",
      sotto:"L. van Beethoven · WoO 59",
      tonalita:"La minore · 3/8 · nessuna alterazione in chiave",
      livello:"Livello 3",
      tempo:84,
      posizione:"LIBERA",
      studio:[
        ["Mano destra","Il famoso Mi–Re♯ si suona con mignolo e anulare, facendo dondolare la mano: non alzare le dita, falle rotolare. Il Re♯ è il tasto nero subito sotto il Mi."],
        ["Mano sinistra","Tre note staccate che disegnano l'accordo, sempre con 5–2–1. Cambiano solo due volte: La-Mi-La per il la minore, Mi-Mi-Sol♯ per il mi maggiore."],
        ["Da curare","Le pause: valgono quanto le note. Se le salti il pezzo perde il respiro e diventa una corsa."]
      ],
      abc:[
"X:1",
"T:Per Elisa (tema iniziale)",
"C:Ludwig van Beethoven — WoO 59",
"M:3/8",
"L:1/16",
"Q:1/4=84",
"%%score {1 | 2}",
"V:1 clef=treble",
"V:2 clef=bass",
"K:Am",
'V:1',
'"^5"e "^4"^d | "^5"e "^4"^d "^5"e "^3"B "^2"=d "^1"c | "^1"A2 z "^1"C "^2"E "^4"A | "^5"B2 z "^1"E "^2"^G "^4"B | "^5"c2 z "^1"E "^5"e "^4"^d |',
'V:2',
'z2 | z6 | "_5"A,, "_2"E, "_1"A, z z2 | "_5"E,, "_2"E, "_1"^G, z z2 | "_5"A,, "_2"E, "_1"A, z z2 |',
'V:1',
'"^5"e "^4"^d "^5"e "^3"B "^2"=d "^1"c | "^1"A2 z "^1"C "^2"E "^4"A | "^5"B2 z "^1"E "^4"c "^3"B | "^2"A6 |]',
'V:2',
'z6 | "_5"A,, "_2"E, "_1"A, z z2 | "_5"E,, "_2"E, "_1"^G, z z2 | "_5"A,, "_2"E, "_1"A, z z2 |]'
      ].join("\n"),
      dx:(function(){
        var tema = [[76,.25],[75,.25],[76,.25],[71,.25],[74,.25],[72,.25]],
            am = [[69,.5],[0,.25],[60,.25],[64,.25],[69,.25]];
        return [[76,.25],[75,.25]].concat(tema, am,
          [[71,.5],[0,.25],[64,.25],[68,.25],[71,.25]],
          [[72,.5],[0,.25],[64,.25],[76,.25],[75,.25]],
          tema, am,
          [[71,.5],[0,.25],[64,.25],[72,.25],[71,.25]],
          [[69,1.5]]);
      })(),
      sx:(function(){
        var am = [[45,.25],[52,.25],[57,.25],[0,.75]],
            mi = [[40,.25],[52,.25],[56,.25],[0,.75]];
        return [[0,.5],[0,1.5]].concat(am, mi, am, [[0,1.5]], am, mi, am);
      })()
    }
  ];
