export interface Word {
  italian: string;
  german: string;
  gender?: 'm' | 'f';
  plural?: string;
  context?: string;
}

export interface VerbConjugation {
  verb: string;
  meaning: string;
  regular: boolean;
  present: {
    io: string;
    tu: string;
    lui_lei: string;
    noi: string;
    voi: string;
    loro: string;
  };
  passato_prossimo: {
    auxiliary: 'essere' | 'avere';
    participle: string;
    example_io: string;
    example_german: string;
  };
  imperfetto: {
    io: string;
    tu: string;
    lui_lei: string;
    noi: string;
    voi: string;
    loro: string;
  };
  futuro: {
    io: string;
    tu: string;
    lui_lei: string;
    noi: string;
    voi: string;
    loro: string;
  };
}

export interface SentenceStructure {
  german: string;
  italian: string;
  scrambled: string[];
  explanation: string;
}

// Rich vocabulary groups for generator
export const VOCABULARY_A1 = {
  daily_life: [
    { italian: 'casa', german: 'Haus', gender: 'f', plural: 'case' },
    { italian: 'libro', german: 'Buch', gender: 'm', plural: 'libri' },
    { italian: 'amico', german: 'Freund', gender: 'm', plural: 'amici' },
    { italian: 'sedia', german: 'Stuhl', gender: 'f', plural: 'sedie' },
    { italian: 'chiave', german: 'Schlüssel', gender: 'f', plural: 'chiavi' },
    { italian: 'gatto', german: 'Katze', gender: 'm', plural: 'gatti' },
    { italian: 'scuola', german: 'Schule', gender: 'f', plural: 'scuole' },
    { italian: 'macchina', german: 'Auto', gender: 'f', plural: 'macchine' },
    { italian: 'strada', german: 'Straße', gender: 'f', plural: 'strade' },
    { italian: 'giornale', german: 'Zeitung', gender: 'm', plural: 'giornali' },
    { italian: 'città', german: 'Stadt', gender: 'f', plural: 'città' },
    { italian: 'porta', german: 'Tür', gender: 'f', plural: 'porte' },
    { italian: 'finestra', german: 'Fenster', gender: 'f', plural: 'finestre' },
    { italian: 'penna', german: 'Stift', gender: 'f', plural: 'penne' },
    { italian: 'parola', german: 'Wort', gender: 'f', plural: 'parole' }
  ] as Word[],
  family: [
    { italian: 'madre', german: 'Mutter', gender: 'f', plural: 'madri' },
    { italian: 'padre', german: 'Vater', gender: 'm', plural: 'padri' },
    { italian: 'fratello', german: 'Bruder', gender: 'm', plural: 'fratelli' },
    { italian: 'sorella', german: 'Schwester', gender: 'f', plural: 'sorelle' },
    { italian: 'figlio', german: 'Sohn', gender: 'm', plural: 'figli' },
    { italian: 'figlia', german: 'Tochter', gender: 'f', plural: 'figlie' },
    { italian: 'nonno', german: 'Großvater', gender: 'm', plural: 'nonni' },
    { italian: 'nonna', german: 'Großmutter', gender: 'f', plural: 'nonne' },
    { italian: 'zio', german: 'Onkel', gender: 'm', plural: 'zii' },
    { italian: 'zia', german: 'Tante', gender: 'f', plural: 'zie' },
    { italian: 'marito', german: 'Ehemann', gender: 'm', plural: 'mariti' },
    { italian: 'moglie', german: 'Ehefrau', gender: 'f', plural: 'mogli' }
  ] as Word[],
  work: [
    { italian: 'lavoro', german: 'Arbeit', gender: 'm', plural: 'lavori' },
    { italian: 'ufficio', german: 'Büro', gender: 'm', plural: 'uffici' },
    { italian: 'collega', german: 'Kollege', gender: 'm', plural: 'colleghi' },
    { italian: 'medico', german: 'Arzt', gender: 'm', plural: 'medici' },
    { italian: 'insegnante', german: 'Lehrer', gender: 'f', plural: 'insegnanti' },
    { italian: 'studente', german: 'Schüler', gender: 'm', plural: 'studenti' },
    { italian: 'negozio', german: 'Geschäft', gender: 'm', plural: 'negozi' },
    { italian: 'fabbrica', german: 'Fabrik', gender: 'f', plural: 'fabbriche' },
    { italian: 'stipendio', german: 'Gehalt', gender: 'm', plural: 'stipendi' }
  ] as Word[],
  food: [
    { italian: 'pane', german: 'Brot', gender: 'm', plural: 'pani' },
    { italian: 'acqua', german: 'Wasser', gender: 'f', plural: 'acque' },
    { italian: 'mela', german: 'Apfel', gender: 'f', plural: 'mele' },
    { italian: 'caffè', german: 'Kaffee', gender: 'm', plural: 'caffè' },
    { italian: 'formaggio', german: 'Käse', gender: 'm', plural: 'formaggi' },
    { italian: 'carne', german: 'Fleisch', gender: 'f', plural: 'carni' },
    { italian: 'pesce', german: 'Fisch', gender: 'm', plural: 'pesci' },
    { italian: 'vino', german: 'Wein', gender: 'm', plural: 'vini' },
    { italian: 'pasta', german: 'Nudeln', gender: 'f', plural: 'paste' },
    { italian: 'latte', german: 'Milch', gender: 'm', plural: 'latte' },
    { italian: 'frutta', german: 'Obst', gender: 'f', plural: 'frutta' },
    { italian: 'verdura', german: 'Gemüse', gender: 'f', plural: 'verdure' }
  ] as Word[],
  travel: [
    { italian: 'treno', german: 'Zug', gender: 'm', plural: 'treni' },
    { italian: 'stazione', german: 'Bahnhof', gender: 'f', plural: 'stazioni' },
    { italian: 'albergo', german: 'Hotel', gender: 'm', plural: 'alberghi' },
    { italian: 'aeroporto', german: 'Flughafen', gender: 'm', plural: 'aeroporti' },
    { italian: 'mare', german: 'Meer', gender: 'm', plural: 'mari' },
    { italian: 'spiaggia', german: 'Strand', gender: 'f', plural: 'spiagge' },
    { italian: 'biglietto', german: 'Fahrkarte', gender: 'm', plural: 'biglietti' },
    { italian: 'vacanza', german: 'Urlaub', gender: 'f', plural: 'vacanze' },
    { italian: 'città', german: 'Stadt', gender: 'f', plural: 'città' },
    { italian: 'via', german: 'Weg', gender: 'f', plural: 'vie' }
  ] as Word[],
  numbers: [
    { italian: 'uno', german: 'eins' },
    { italian: 'due', german: 'zwei' },
    { italian: 'tre', german: 'drei' },
    { italian: 'quattro', german: 'vier' },
    { italian: 'cinque', german: 'fünf' },
    { italian: 'sei', german: 'sechs' },
    { italian: 'sette', german: 'sieben' },
    { italian: 'otto', german: 'acht' },
    { italian: 'nove', german: 'neun' },
    { italian: 'dieci', german: 'zehn' },
    { italian: 'venti', german: 'zwanzig' },
    { italian: 'trenta', german: 'dreißig' },
    { italian: 'quaranta', german: 'vierzig' },
    { italian: 'cinquanta', german: 'fünfzig' },
    { italian: 'cento', german: 'hundert' },
    { italian: 'mille', german: 'tausend' }
  ] as Word[],
  time: [
    { italian: 'giorno', german: 'Tag', gender: 'm', plural: 'giorni' },
    { italian: 'notte', german: 'Nacht', gender: 'f', plural: 'notti' },
    { italian: 'ora', german: 'Stunde', gender: 'f', plural: 'ore' },
    { italian: 'mattina', german: 'Morgen', gender: 'f', plural: 'mattine' },
    { italian: 'pomeriggio', german: 'Nachmittag', gender: 'm', plural: 'pomeriggi' },
    { italian: 'sera', german: 'Abend', gender: 'f', plural: 'sere' },
    { italian: 'oggi', german: 'heute' },
    { italian: 'ieri', german: 'gestern' },
    { italian: 'domani', german: 'morgen' },
    { italian: 'settimana', german: 'Woche', gender: 'f', plural: 'settimane' },
    { italian: 'mese', german: 'Monat', gender: 'm', plural: 'mesi' },
    { italian: 'anno', german: 'Jahr', gender: 'm', plural: 'anni' }
  ] as Word[]
};

export const VOCABULARY_A2 = {
  daily_life: [
    { italian: 'appartamento', german: 'Wohnung', gender: 'm', plural: 'appartamenti' },
    { italian: 'palazzo', german: 'Gebäude', gender: 'm', plural: 'palazzi' },
    { italian: 'vicinato', german: 'Nachbarschaft', gender: 'm', plural: 'vicinati' },
    { italian: 'bolletta', german: 'Rechnung', gender: 'f', plural: 'bollette' },
    { italian: 'scaffale', german: 'Regal', gender: 'm', plural: 'scaffali' },
    { italian: 'lavatrice', german: 'waschmaschine', gender: 'f', plural: 'lavatrici' },
    { italian: 'immondizia', german: 'Müll', gender: 'f', plural: 'immondizie' },
    { italian: 'chiave di riserva', german: 'Ersatzschlüssel', gender: 'f', plural: 'chiavi' },
    { italian: 'documento', german: 'Dokument', gender: 'm', plural: 'documenti' }
  ] as Word[],
  family: [
    { italian: 'parente', german: 'Verwandter', gender: 'm', plural: 'parenti' },
    { italian: 'cognato', german: 'Schwager', gender: 'm', plural: 'cognati' },
    { italian: 'cognata', german: 'Schwägerin', gender: 'f', plural: 'cognate' },
    { italian: 'nipote', german: 'Neffe / Enkel', gender: 'm', plural: 'nipoti' },
    { italian: 'suocero', german: 'Schwiegervater', gender: 'm', plural: 'suoceri' },
    { italian: 'suocera', german: 'Schwiegermutter', gender: 'f', plural: 'suocere' },
    { italian: 'gemello', german: 'Zwilling', gender: 'm', plural: 'gemelli' },
    { italian: 'pronipote', german: 'Urenkel', gender: 'm', plural: 'pronipoti' }
  ] as Word[],
  work: [
    { italian: 'colloquio', german: 'Vorstellungsgespräch', gender: 'm', plural: 'colloqui' },
    { italian: 'impiego', german: 'Anstellung', gender: 'm', plural: 'impieghi' },
    { italian: 'azienda', german: 'Unternehmen', gender: 'f', plural: 'aziende' },
    { italian: 'scrivania', german: 'Schreibtisch', gender: 'f', plural: 'scrivanie' },
    { italian: 'contratto', german: 'Vertrag', gender: 'm', plural: 'contratti' },
    { italian: 'disoccupato', german: 'arbeitslos', gender: 'm' },
    { italian: 'tirocinio', german: 'Praktikum', gender: 'm', plural: 'tirocini' },
    { italian: 'pensionamento', german: 'Ruhestand', gender: 'm' },
    { italian: 'scadenza', german: 'Frist', gender: 'f', plural: 'scadenze' }
  ] as Word[],
  food: [
    { italian: 'ricetta', german: 'Rezept', gender: 'f', plural: 'ricette' },
    { italian: 'ingrediente', german: 'Zutat', gender: 'm', plural: 'ingredienti' },
    { italian: 'antipasto', german: 'Vorspeise', gender: 'm', plural: 'antipasti' },
    { italian: 'colazione', german: 'Frühstück', gender: 'f', plural: 'colazioni' },
    { italian: 'pranzo', german: 'Mittagessen', gender: 'm', plural: 'pranzi' },
    { italian: 'cena', german: 'Abendessen', gender: 'f', plural: 'cene' },
    { italian: 'bicchiere', german: 'Glas', gender: 'm', plural: 'bicchieri' },
    { italian: 'cucchiaio', german: 'Löffel', gender: 'm', plural: 'cucchiai' },
    { italian: 'forchetta', german: 'Gabel', gender: 'f', plural: 'forchette' },
    { italian: 'coltello', german: 'Messer', gender: 'm', plural: 'coltelli' }
  ] as Word[],
  travel: [
    { italian: 'itinerario', german: 'Reiseroute', gender: 'm', plural: 'itinerari' },
    { italian: 'prenotazione', german: 'Buchung', gender: 'f', plural: 'prenotazioni' },
    { italian: 'ritardo', german: 'Verspätung', gender: 'm', plural: 'ritardi' },
    { italian: 'valigia', german: 'Koffer', gender: 'f', plural: 'valigie' },
    { italian: 'dogana', german: 'Zoll', gender: 'f', plural: 'dogane' },
    { italian: 'guida turistica', german: 'Reiseleiter', gender: 'f' },
    { italian: 'destinazione', german: 'Reiseziel', gender: 'f', plural: 'destinazioni' },
    { italian: 'passaporto', german: 'Reisepass', gender: 'm', plural: 'passaporti' }
  ] as Word[],
  numbers: [
    { italian: 'primo', german: 'erste' },
    { italian: 'secondo', german: 'zweite' },
    { italian: 'terzo', german: 'dritte' },
    { italian: 'quarto', german: 'vierte' },
    { italian: 'quinto', german: 'fünfte' },
    { italian: 'ennesimo', german: 'X-te' },
    { italian: 'duecento', german: 'zweihundert' },
    { italian: 'cinquecento', german: 'fünfhundert' },
    { italian: 'milione', german: 'Million', gender: 'm', plural: 'milioni' },
    { italian: 'miliardo', german: 'Milliarde', gender: 'm', plural: 'miliardi' }
  ] as Word[],
  time: [
    { italian: 'epoca', german: 'Epoche', gender: 'f', plural: 'epoche' },
    { italian: 'secolo', german: 'Jahrhundert', gender: 'm', plural: 'secoli' },
    { italian: 'contemporaneamente', german: 'gleichzeitig' },
    { italian: 'frequentemente', german: 'häufig' },
    { italian: 'ritardo', german: 'Verspätung', gender: 'm' },
    { italian: 'anticipo', german: 'Vorsprung / zu früh', gender: 'm' },
    { italian: 'durata', german: 'Dauer', gender: 'f' },
    { italian: 'stagione', german: 'Jahreszeit', gender: 'f', plural: 'stagioni' }
  ] as Word[]
};

// Rich verb database with tenses conjugation
export const VERBS_DATA: VerbConjugation[] = [
  {
    verb: 'essere',
    meaning: 'sein',
    regular: false,
    present: {
      io: 'sono',
      tu: 'sei',
      lui_lei: 'è',
      noi: 'siamo',
      voi: 'siete',
      loro: 'sono'
    },
    passato_prossimo: {
      auxiliary: 'essere',
      participle: 'stato',
      example_io: 'sono stato',
      example_german: 'ich bin gewesen'
    },
    imperfetto: {
      io: 'ero',
      tu: 'eri',
      lui_lei: 'era',
      noi: 'eravamo',
      voi: 'eravate',
      loro: 'erano'
    },
    futuro: {
      io: 'sarò',
      tu: 'sarai',
      lui_lei: 'sarà',
      noi: 'saremo',
      voi: 'sarete',
      loro: 'saranno'
    }
  },
  {
    verb: 'avere',
    meaning: 'haben',
    regular: false,
    present: {
      io: 'ho',
      tu: 'hai',
      lui_lei: 'ha',
      noi: 'abbiamo',
      voi: 'avete',
      loro: 'hanno'
    },
    passato_prossimo: {
      auxiliary: 'avere',
      participle: 'avuto',
      example_io: 'ho avuto',
      example_german: 'ich habe gehabt'
    },
    imperfetto: {
      io: 'avevo',
      tu: 'avevi',
      lui_lei: 'aveva',
      noi: 'avevamo',
      voi: 'avevate',
      loro: 'avevano'
    },
    futuro: {
      io: 'avrò',
      tu: 'avrai',
      lui_lei: 'avrà',
      noi: 'avremo',
      voi: 'avrete',
      loro: 'avranno'
    }
  },
  {
    verb: 'parlare',
    meaning: 'sprechen',
    regular: true,
    present: {
      io: 'parlo',
      tu: 'parli',
      lui_lei: 'parla',
      noi: 'parliamo',
      voi: 'parlate',
      loro: 'parlano'
    },
    passato_prossimo: {
      auxiliary: 'avere',
      participle: 'parlato',
      example_io: 'ho parlato',
      example_german: 'ich habe gesprochen'
    },
    imperfetto: {
      io: 'parlavo',
      tu: 'parlavi',
      lui_lei: 'parlava',
      noi: 'parlavamo',
      voi: 'parlavate',
      loro: 'parlavano'
    },
    futuro: {
      io: 'parlerò',
      tu: 'parlerai',
      lui_lei: 'parlerà',
      noi: 'parleremo',
      voi: 'parlerete',
      loro: 'parleranno'
    }
  },
  {
    verb: 'mangiare',
    meaning: 'essen',
    regular: true,
    present: {
      io: 'mangio',
      tu: 'mangi',
      lui_lei: 'mangia',
      noi: 'mangiamo',
      voi: 'mangiate',
      loro: 'mangiano'
    },
    passato_prossimo: {
      auxiliary: 'avere',
      participle: 'mangiato',
      example_io: 'ho mangiato',
      example_german: 'ich habe gegessen'
    },
    imperfetto: {
      io: 'mangiavo',
      tu: 'mangiavi',
      lui_lei: 'mangiava',
      noi: 'mangiavamo',
      voi: 'mangiavate',
      loro: 'mangiavano'
    },
    futuro: {
      io: 'mangerò',
      tu: 'mangerai',
      lui_lei: 'mangerà',
      noi: 'mangeremo',
      voi: 'mangerete',
      loro: 'mangeranno'
    }
  },
  {
    verb: 'andare',
    meaning: 'gehen',
    regular: false,
    present: {
      io: 'vado',
      tu: 'vai',
      lui_lei: 'va',
      noi: 'andiamo',
      voi: 'andate',
      loro: 'vanno'
    },
    passato_prossimo: {
      auxiliary: 'essere',
      participle: 'andato',
      example_io: 'sono andato',
      example_german: 'ich bin gegangen'
    },
    imperfetto: {
      io: 'andavo',
      tu: 'andavi',
      lui_lei: 'andava',
      noi: 'andavamo',
      voi: 'andate',
      loro: 'andavano'
    },
    futuro: {
      io: 'andrò',
      tu: 'andrai',
      lui_lei: 'andrà',
      noi: 'andremo',
      voi: 'andrete',
      loro: 'andranno'
    }
  },
  {
    verb: 'fare',
    meaning: 'machen',
    regular: false,
    present: {
      io: 'faccio',
      tu: 'fai',
      lui_lei: 'fa',
      noi: 'facciamo',
      voi: 'fate',
      loro: 'fanno'
    },
    passato_prossimo: {
      auxiliary: 'avere',
      participle: 'fatto',
      example_io: 'ho fatto',
      example_german: 'ich habe gemacht'
    },
    imperfetto: {
      io: 'facevo',
      tu: 'facevi',
      lui_lei: 'faceva',
      noi: 'facevamo',
      voi: 'facevate',
      loro: 'facevano'
    },
    futuro: {
      io: 'farò',
      tu: 'farai',
      lui_lei: 'farà',
      noi: 'faremo',
      voi: 'farete',
      loro: 'faranno'
    }
  },
  {
    verb: 'venire',
    meaning: 'kommen',
    regular: false,
    present: {
      io: 'vengo',
      tu: 'vieni',
      lui_lei: 'viene',
      noi: 'veniamo',
      voi: 'venite',
      loro: 'vengono'
    },
    passato_prossimo: {
      auxiliary: 'essere',
      participle: 'venuto',
      example_io: 'sono venuto',
      example_german: 'ich bin gekommen'
    },
    imperfetto: {
      io: 'venivo',
      tu: 'venivi',
      lui_lei: 'veniva',
      noi: 'venivamo',
      voi: 'venivate',
      loro: 'venivano'
    },
    futuro: {
      io: 'verrò',
      tu: 'verrai',
      lui_lei: 'verrà',
      noi: 'verremo',
      voi: 'verrete',
      loro: 'verranno'
    }
  },
  {
    verb: 'potere',
    meaning: 'können',
    regular: false,
    present: {
      io: 'posso',
      tu: 'puoi',
      lui_lei: 'può',
      noi: 'possiamo',
      voi: 'potete',
      loro: 'possono'
    },
    passato_prossimo: {
      auxiliary: 'avere',
      participle: 'potuto',
      example_io: 'ho potuto',
      example_german: 'ich habe gekonnt'
    },
    imperfetto: {
      io: 'potevo',
      tu: 'potevi',
      lui_lei: 'poteva',
      noi: 'potevamo',
      voi: 'potevate',
      loro: 'potevano'
    },
    futuro: {
      io: 'potrò',
      tu: 'potrai',
      lui_lei: 'potrà',
      noi: 'potremo',
      voi: 'potrete',
      loro: 'potranno'
    }
  },
  {
    verb: 'vedere',
    meaning: 'sehen',
    regular: true,
    present: {
      io: 'vedo',
      tu: 'vedi',
      lui_lei: 'vede',
      noi: 'vediamo',
      voi: 'vedete',
      loro: 'vedono'
    },
    passato_prossimo: {
      auxiliary: 'avere',
      participle: 'visto',
      example_io: 'ho visto',
      example_german: 'ich habe gesehen'
    },
    imperfetto: {
      io: 'vedevo',
      tu: 'vedevi',
      lui_lei: 'vedeva',
      noi: 'vedevamo',
      voi: 'vedevate',
      loro: 'vedevano'
    },
    futuro: {
      io: 'vedrò',
      tu: 'vedrai',
      lui_lei: 'vedrà',
      noi: 'vedremo',
      voi: 'vedrete',
      loro: 'vedranno'
    }
  },
  {
    verb: 'scrivere',
    meaning: 'schreiben',
    regular: false,
    present: {
      io: 'scrivo',
      tu: 'scrivi',
      lui_lei: 'scrive',
      noi: 'scriviamo',
      voi: 'scrivete',
      loro: 'scrivono'
    },
    passato_prossimo: {
      auxiliary: 'avere',
      participle: 'scritto',
      example_io: 'ho scritto',
      example_german: 'ich habe geschrieben'
    },
    imperfetto: {
      io: 'scrivevo',
      tu: 'scrivevi',
      lui_lei: 'scriveva',
      noi: 'scrivevamo',
      voi: 'scrivevate',
      loro: 'scrivevano'
    },
    futuro: {
      io: 'scriverò',
      tu: 'scriverai',
      lui_lei: 'scriverà',
      noi: 'scriveremo',
      voi: 'scriverete',
      loro: 'scriveranno'
    }
  }
];

// Rich structural patterns for translation & reordering sentences
export const SENTENCES_A1: SentenceStructure[] = [
  {
    german: 'Ich wohne in Rom.',
    italian: 'Io abito a Roma.',
    scrambled: ['abito', 'Roma.', 'Io', 'a'],
    explanation: 'Bei Städten wird im Italienischen die Präposition "a" verwendet.'
  },
  {
    german: 'Wo wohnst du?',
    italian: 'Dove abiti tu?',
    scrambled: ['Dove', 'abiti', 'tu?'],
    explanation: 'Fragesatz: Fragepronomen "dove" steht meistens am Anfang.'
  },
  {
    german: 'Ich trinke einen schwarzen Kaffee.',
    italian: 'Bevo un caffè nero.',
    scrambled: ['Bevo', 'un', 'caffè', 'nero.'],
    explanation: 'Adjektive wie "nero" stehen im Italienischen meistens nach dem Nomen.'
  },
  {
    german: 'Wie heißt du?',
    italian: 'Come ti chiami?',
    scrambled: ['Come', 'ti', 'chiami?'],
    explanation: 'Reflexivpronomen steht im Präsens vor dem konjugierten Verb.'
  },
  {
    german: 'Das ist mein Bruder.',
    italian: 'Questo è mio fratello.',
    scrambled: ['Questo', 'è', 'mio', 'fratello.'],
    explanation: 'Bei nahen Verwandten im Singular entfällt meistens der Artikel vor dem Possessivpronomen ("mio fratello", nicht "il mio fratello").'
  },
  {
    german: 'Hast du ein Auto?',
    italian: 'Hai una macchina?',
    scrambled: ['Hai', 'una', 'macchina?'],
    explanation: '"macchina" ist weiblich singulär, der unbestimmte Artikel ist "una".'
  },
  {
    german: 'Wir essen Pasta am Mittag.',
    italian: 'Noi mangiamo la pasta a pranzo.',
    scrambled: ['Noi', 'mangiamo', 'la', 'pasta', 'a', 'pranzo.'],
    explanation: 'Präpositionen im Italienischen: "a pranzo" bedeutet zu Mittag.'
  }
];

export const SENTENCES_A2: SentenceStructure[] = [
  {
    german: 'Gestern bin ich ins Kino gegangen.',
    italian: 'Ieri sono andato al cinema.',
    scrambled: ['Ieri', 'sono', 'andato', 'al', 'cinema.'],
    explanation: '"andare" bildet das Passato Prossimo mit "essere". Das Partizip "andato" gleicht sich an.'
  },
  {
    german: 'Als ich klein war, spielte ich oft.',
    italian: 'Quando ero piccolo, giocavo spesso.',
    scrambled: ['Quando', 'ero', 'piccolo,', 'giocavo', 'spesso.'],
    explanation: 'Für Zustände und Gewohnheiten in der Vergangenheit verwendet man das Imperfetto ("ero", "giocavo").'
  },
  {
    german: 'Nächstes Jahr werden wir nach Italien reisen.',
    italian: 'L’anno prossimo viaggeremo in Italia.',
    scrambled: ['L’anno', 'prossimo', 'viaggeremo', 'in', 'Italia.'],
    explanation: 'Das Futuro Semplice von "viaggiare" (wir) ist "viaggeremo". Bei Ländern verwendet man "in".'
  },
  {
    german: 'Wenn ich Zeit habe, werde ich dich anrufen.',
    italian: 'Se avrò tempo, ti chiamerò.',
    scrambled: ['Se', 'avrò', 'tempo,', 'ti', 'chiamerò.'],
    explanation: 'Im Italienischen steht nach "se" (wenn) oft das Futuro, wenn die Handlung in der Zukunft liegt.'
  },
  {
    german: 'Ich habe das Buch gestern gelesen.',
    italian: 'Ho letto il libro ieri.',
    scrambled: ['Ho', 'letto', 'il', 'libro', 'ieri.'],
    explanation: '"leggere" hat das unregelmäßige Partizip "letto" und bildet das Passato Prossimo mit "avere".'
  },
  {
    german: 'Er will heute nicht im Büro arbeiten.',
    italian: 'Lui non vuole lavorare in ufficio oggi.',
    scrambled: ['Lui', 'non', 'vuole', 'lavorare', 'in', 'ufficio', 'oggi.'],
    explanation: 'Die Verneinung "non" steht direkt vor dem konjugierten Hilfsverb oder Modalverb.'
  }
];
