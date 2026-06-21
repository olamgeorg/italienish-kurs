import { Level, Question, Topic } from '../types';
import { 
  VOCABULARY_A1, 
  VOCABULARY_A2, 
  VERBS_DATA, 
  SENTENCES_A1, 
  SENTENCES_A2,
  Word,
  VerbConjugation
} from './vocabulary';

export const TOPICS: Topic[] = [
  // A1 Topics
  { 
    id: 'verbs', 
    title: 'Verben (A1)', 
    italianTitle: 'Verbi al presente e passato', 
    description: 'Konjugation regelmäßiger & unregelmäßiger Verben in Gegenwart und naher Vergangenheit.', 
    level: 'A1', 
    iconName: 'Activity', 
    color: 'emerald' 
  },
  { 
    id: 'nouns', 
    title: 'Nomen & Plural (A1)', 
    italianTitle: 'Nomi e plurali', 
    description: 'Lernen Sie das Geschlecht italienischer Substantive (männlich/weiblich) und ihre Pluralformen.', 
    level: 'A1', 
    iconName: 'Layers', 
    color: 'blue' 
  },
  { 
    id: 'present', 
    title: 'Gegenwart (Presente)', 
    italianTitle: 'Presente indicativo', 
    description: 'Meistern Sie die wichtigste Zeitform für die tägliche Kommunikation im Präsens.', 
    level: 'A1', 
    iconName: 'Clock', 
    color: 'indigo' 
  },
  { 
    id: 'past', 
    title: 'Vergangenheit (A1)', 
    italianTitle: 'Passato prossimo base', 
    description: 'Bildung des Passato Prossimo mit den Hilfsverben "avere" und "essere" im A1 Niveau.', 
    level: 'A1', 
    iconName: 'CalendarDays', 
    color: 'violet' 
  },
  { 
    id: 'future', 
    title: 'Zukunft (Futuro A1)', 
    italianTitle: 'Futuro semplice', 
    description: 'Einfache Zukunft ausdrücken und über Pläne oder Verabredungen sprechen.', 
    level: 'A1', 
    iconName: 'TrendingUp', 
    color: 'pink' 
  },
  { 
    id: 'grammar', 
    title: 'Satzbau & Fragen', 
    italianTitle: 'Costruzione della frase', 
    description: 'Wortstellung im Satz, Fragen stellen und Verneinungen richtig anwenden.', 
    level: 'A1', 
    iconName: 'Sparkles', 
    color: 'rose' 
  },
  { 
    id: 'articles', 
    title: 'Artikel (il, la... un, una)', 
    italianTitle: 'Articoli in italiano', 
    description: 'Bestimmte und unbestimmte Begleiter für jedes Geschlecht meistern.', 
    level: 'A1', 
    iconName: 'Compass', 
    color: 'cyan' 
  },
  { 
    id: 'vocabulary', 
    title: 'Wortschatz (A1)', 
    italianTitle: 'Vocabolario tematico', 
    description: 'Alltagswörter, Familie, Einkauf, Essen, Richtungen, Zahlen und Uhrzeiten.', 
    level: 'A1', 
    iconName: 'Bookmark', 
    color: 'amber' 
  },

  // A2 Topics
  { 
    id: 'verbs', 
    title: 'Verben & Modalverben (A2)', 
    italianTitle: 'Verbi modali ed irregolari', 
    description: 'Hilfs- und Modalverben (potere, volere, dovere) sowie Vertiefung unregelmäßiger Verben.', 
    level: 'A2', 
    iconName: 'Activity', 
    color: 'emerald' 
  },
  { 
    id: 'nouns', 
    title: 'Nomen & Pronomen (A2)', 
    italianTitle: 'Nomi e pronomi diretti/indiretti', 
    description: 'Direkte und indirekte Objektpronomen (mi, ti, lo, la, ci, vi, li, le) flüssig anwenden.', 
    level: 'A2', 
    iconName: 'Layers', 
    color: 'blue' 
  },
  { 
    id: 'present', 
    title: 'Verlaufsform (Gegenwart)', 
    italianTitle: 'Stare + Gerundio', 
    description: 'Die Verlaufsform für gerade stattfindende Handlungen ("Ich lese gerade").', 
    level: 'A2', 
    iconName: 'Clock', 
    color: 'indigo' 
  },
  { 
    id: 'past', 
    title: 'Passato vs. Imperfetto', 
    italianTitle: 'Scelta tra passato e imperfetto', 
    description: 'Die Königsdisziplin: Wann benutze ich Passato Prossimo und wann Imperfetto?', 
    level: 'A2', 
    iconName: 'CalendarDays', 
    color: 'violet' 
  },
  { 
    id: 'future', 
    title: 'Futuro & Konditional (A2)', 
    italianTitle: 'Futuro e Condizionale', 
    description: 'Zukunftspläne, Vermutungen ausdrücken und höfliche Bitten mit dem Condizionale.', 
    level: 'A2', 
    iconName: 'TrendingUp', 
    color: 'pink' 
  },
  { 
    id: 'grammar', 
    title: 'Komplexere Sätze', 
    italianTitle: 'Sintassi complessa', 
    description: 'Nebensätze mit Konnektoren (perché, mentre, se...) und doppelten Pronomen.', 
    level: 'A2', 
    iconName: 'Sparkles', 
    color: 'rose' 
  },
  { 
    id: 'articles', 
    title: 'Zusammengesetzte Artikel', 
    italianTitle: 'Preposizioni articolate', 
    description: 'Präpositionen verschmolzen mit Artikeln (sul, negli, al, dalla, dei).', 
    level: 'A2', 
    iconName: 'Compass', 
    color: 'cyan' 
  },
  { 
    id: 'vocabulary', 
    title: 'Konversations-Wortschatz (A2)', 
    italianTitle: 'Vocabolario avanzato', 
    description: 'Wortschatz für Wohnen, Berufswelt, Gesundheit, Bank und Ämter.', 
    level: 'A2', 
    iconName: 'Bookmark', 
    color: 'amber' 
  }
];

// Simple deterministic hash to get pseudo-random-walk from seed index
// This keeps generations perfectly stable (same index = same question text/options)
function getHash(seedStr: string): number {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    const char = seedStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate an exact stable question for level, topicId, and index (0-999)
// Allows endless play without massive upfront payloads
export function generateQuestion(level: Level, topicId: string, index: number): Question {
  const seed = `${level}_${topicId}_${index}`;
  const hash = getHash(seed);
  
  const questionId = `${level}_${topicId}_Q_${index}`;
  
  // Choose standard category lists
  const vocabList = level === 'A1' ? VOCABULARY_A1 : VOCABULARY_A2;
  const sentenceList = level === 'A1' ? SENTENCES_A1 : SENTENCES_A2;
  
  // Destructure vocab keys for picking
  const vocabCategories = Object.keys(vocabList) as Array<keyof typeof vocabList>;
  const activeCategory = vocabCategories[hash % vocabCategories.length];
  const activeVocabs = vocabList[activeCategory];
  const activeWord = activeVocabs[hash % activeVocabs.length];

  const persons = ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'];
  const personGerman = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie (Pl.)'];
  const pIdx = hash % persons.length;
  const activePerson = persons[pIdx];
  const activePersonGer = personGerman[pIdx];

  const activeVerb = VERBS_DATA[hash % VERBS_DATA.length];

  // Map of generation formulas based on topic
  switch (topicId) {
    case 'articles': {
      // Questions about articles
      if (level === 'A1') {
        // A1 Articles: Choose correct article for masculine/feminine, singular/plural noun
        // Pick sub-nouns from vocabularies that have genders
        const nounsWithGender = activeVocabs.filter(w => w.gender);
        const targetNoun = nounsWithGender.length > 0 ? nounsWithGender[hash % nounsWithGender.length] : activeVocabs[0];
        
        const correctArticle = getCorrectArticle(targetNoun);
        const wrongAnswers = getWrongArticles(correctArticle);

        const prompt = `Welcher bestimmte Artikel gehört zu dem Nomen "${targetNoun.italian}" (${targetNoun.german})?`;
        const helpText = `Tipp: "${targetNoun.italian}" ist ${targetNoun.gender === 'm' ? 'männlich (maschile)' : 'weiblich (femminile)'}.`;
        const explanation = `Im Italienischen wird "${targetNoun.italian}" mit dem bestimmten Artikel "${correctArticle}" gebildet, da es ${targetNoun.gender === 'm' ? 'ein männliches' : 'ein weibliches'} Nomen im Singular ist, das mit "${targetNoun.italian[0].toLowerCase()}" beginnt.`;

        const options = shuffleArray([correctArticle, ...wrongAnswers], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'article-select',
          prompt,
          helpText,
          italianSentence: `____ ${targetNoun.italian}`,
          options,
          correctAnswer: correctArticle,
          explanation
        };
      } else {
        // A2 Articles: Preposizioni articolate
        const preposizioni = ['in', 'a', 'da', 'su', 'di'];
        const prep = preposizioni[hash % preposizioni.length];
        
        const nounsWithGender = activeVocabs.filter(w => w.gender);
        const targetNoun = nounsWithGender.length > 0 ? nounsWithGender[hash % nounsWithGender.length] : activeVocabs[0];
        
        const article = getCorrectArticle(targetNoun);
        const correctPrepArt = mergePrepArt(prep, article);
        
        const prompt = `Fügen Sie die richtige zusammengesetzte Präposition (Preposizione articolata) für "${prep} + [Artikel von ${targetNoun.italian}]" ein.`;
        const helpText = `Tipp: "${targetNoun.italian}" benötigt den Artikel "${article}". Die Präposition "${prep}" verschmilzt damit.`;
        const options = shuffleArray([
          correctPrepArt, 
          `${prep} ${article}`, 
          mergePrepArt(prep, article === 'il' ? 'la' : 'il'), 
          mergePrepArt(prep === 'in' ? 'a' : 'in', article)
        ], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt,
          helpText,
          italianSentence: `Vado ${correctPrepArt} ${targetNoun.italian}.`,
          options,
          correctAnswer: correctPrepArt,
          explanation: `Die Präposition "${prep}" und der Artikel "${article}" verschmelzen im Italienischen zu "${correctPrepArt}" vor dem Nomen "${targetNoun.italian}".`
        };
      }
    }

    case 'nouns': {
      // Nouns & Plural
      if (level === 'A1') {
        const nounWithPlural = activeVocabs.filter(w => w.plural && w.gender);
        const targetNoun = nounWithPlural.length > 0 ? nounWithPlural[hash % nounWithPlural.length] : activeVocabs[0];
        
        const correctPlural = targetNoun.plural || `${targetNoun.italian}i`;
        const correctArticleSingular = getCorrectArticle(targetNoun);
        const correctArticlePlural = getCorrectPluralArticle(targetNoun);
        
        const typeSelectNum = hash % 2;
        if (typeSelectNum === 0) {
          // Identify plural form
          const wrongPlurals = [
            targetNoun.italian + 'e',
            targetNoun.italian + 'o',
            targetNoun.italian.slice(0, -1) + 'a'
          ].filter(x => x !== correctPlural).slice(0, 3);
          
          while (wrongPlurals.length < 3) {
            wrongPlurals.push(correctPlural + 's');
          }

          const options = shuffleArray([correctPlural, ...wrongPlurals], hash);

          return {
            id: questionId,
            level,
            topicId,
            type: 'multiple-choice',
            prompt: `Wie heißt die korrekte Pluralform von "${targetNoun.italian}" (${targetNoun.german})?`,
            helpText: `Tipp: ${targetNoun.gender === 'm' ? 'Männliche' : 'Weibliche'} Wörter, die auf "${targetNoun.italian.slice(-1)}" enden, ändern dies im Plural meistens.`,
            italianSentence: `Un(a) ${targetNoun.italian} -> Molti ${correctPlural}`,
            options,
            correctAnswer: correctPlural,
            explanation: `Im Italienischen enden männliche Wörter auf -o im Plural meist auf -i (z.B. ${targetNoun.italian} -> ${correctPlural}) und weibliche Wörter auf -a enden auf -e.`
          };
        } else {
          // Identify gender
          const options = ['männlich (maschile)', 'weiblich (femminile)'];
          const correctOption = targetNoun.gender === 'm' ? options[0] : options[1];

          return {
            id: questionId,
            level,
            topicId,
            type: 'multiple-choice',
            prompt: `Welches Geschlecht hat das Nomen "${targetNoun.italian}" (${targetNoun.german})?`,
            helpText: `Tipp: Welcher Begleiter passt dazu? "${correctArticleSingular} ${targetNoun.italian}".`,
            italianSentence: `${correctArticleSingular} ${targetNoun.italian}`,
            options,
            correctAnswer: correctOption,
            explanation: `Das Nomen "${targetNoun.italian}" ist ${targetNoun.gender === 'm' ? 'männlich' : 'weiblich'}. Man lernt Nomen am besten immer direkt mit ihrem Artikel!`
          };
        }
      } else {
        // A2 Nouns & Pronomen: direct or indirect pronoun quiz
        const pronounsTemplates = [
          {
            german: 'Kaufst du das Buch? Ja, ich kaufe es.',
            italian: 'Compri il libro? Sì, ____ compro.',
            correct: 'lo',
            wrong: ['la', 'gli', 'li'],
            explanation: '"il libro" ist ein direktes Akkusativobjekt (männlich, Singular), das durch das Pronomen "lo" ersetzt wird.'
          },
          {
            german: 'Triffst du Maria? Ja, ich treffe sie.',
            italian: 'Incontri Maria? Sì, ____ incontro.',
            correct: 'la',
            wrong: ['lo', 'le', 'ci'],
            explanation: '"Maria" ist ein direktes Akkusativobjekt (weiblich, Singular), das durch das Pronomen "la" ersetzt wird.'
          },
          {
            german: 'Schreibst du deinem Onkel? Ja, ich schreibe ihm.',
            italian: 'Scrivi a tuo zio? Sì, ____ scrivo.',
            correct: 'gli',
            wrong: ['lo', 'le', 'ci'],
            explanation: '"a tuo zio" ist ein indirektes Dativobjekt (ihm), das durch das betonte Dativpronomen "gli" ersetzt wird.'
          },
          {
            german: 'Schreibst du deiner Tante? Ja, ich schreibe ihr.',
            italian: 'Scrivi a tua zia? Sì, ____ scrivo.',
            correct: 'le',
            wrong: ['la', 'gli', 'ci'],
            explanation: '"a tua zia" ist ein indirektes Dativobjekt (ihr), das im Italienischen mit "le" abgekürzt wird.'
          },
          {
            german: 'Trinkst du die Säfte? Ja, ich trinke sie.',
            italian: 'Bevi i succhi? Sì, ____ bevo.',
            correct: 'li',
            wrong: ['le', 'lo', 'la'],
            explanation: '"i succhi" ist Plural männlich, das zugehörige direkte Objektpronomen lautet "li".'
          }
        ];
        
        const template = pronounsTemplates[hash % pronounsTemplates.length];
        const options = shuffleArray([template.correct, ...template.wrong], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Gebrauchen Sie das richtige Direkt/Indirektpronomen für: "${template.german}"`,
          helpText: 'Tipp: Handelt es sich um wen (Akkusativ) oder wem (Dativ)? Und ist es männlich oder weiblich?',
          italianSentence: template.italian,
          options,
          correctAnswer: template.correct,
          explanation: template.explanation
        };
      }
    }

    case 'present': {
      // Present tense conjugation
      if (level === 'A1') {
        const verbKey = activePerson as keyof typeof activeVerb.present;
        const correctConjugation = activeVerb.present[verbKey];
        
        // Form wrong answers dynamically
        const wrongKeys = Object.keys(activeVerb.present).filter(k => k !== verbKey);
        const wrongAnswers = Array.from(new Set(wrongKeys.map(k => activeVerb.present[k as keyof typeof activeVerb.present])))
          .filter(ans => ans !== correctConjugation)
          .slice(0, 3);
          
        while (wrongAnswers.length < 3) {
          wrongAnswers.push(correctConjugation + 'te');
        }

        const options = shuffleArray([correctConjugation, ...wrongAnswers], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Konjugieren Sie das Verb "${activeVerb.verb}" (bedeutet: ${activeVerb.meaning}) im Presente (Gegenwart) für "${activePersonGer} (${activePerson})".`,
          helpText: `Tipp: "${activeVerb.verb}" ist ein ${activeVerb.regular ? 'regelmäßiges' : 'unregelmäßiges'} Verb.`,
          italianSentence: `[${activePerson}] ________ molto bene in italiano.`,
          options,
          correctAnswer: correctConjugation,
          explanation: `Die Form von "${activeVerb.verb}" im Presente für "${activePerson}" ist "${correctConjugation}".`
        };
      } else {
        // A2 Present: Gerundio (Verlaufsform) stare + gerundio
        const gerunds = [
          { verb: 'parlare', gerund: 'parlando', meaning: 'sprechen' },
          { verb: 'mangiare', gerund: 'mangiando', meaning: 'essen' },
          { verb: 'scrivere', gerund: 'scrivendo', meaning: 'schreiben' },
          { verb: 'andare', gerund: 'andando', meaning: 'gehen' },
          { verb: 'vedere', gerund: 'vedendo', meaning: 'sehen' }
        ];
        
        const gerundChoice = gerunds[hash % gerunds.length];
        const stareForm = getStarePresent(activePerson);
        const correctSentence = `${stareForm} ${gerundChoice.gerund}`;
        
        const wrongAnswers = [
          `${stareForm} ${gerundChoice.verb}`,
          `sono ${gerundChoice.gerund}`,
          `${stareForm} ${gerundChoice.gerund.replace('ndo', 'to')}`
        ];

        const options = shuffleArray([correctSentence, ...wrongAnswers], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Drücken Sie die Verlaufsform (Gegenwart) aus für: "${activePersonGer} bin gerade am ${gerundChoice.meaning}." (Stare + Gerundio)`,
          helpText: `Tipp: Konjugieren Sie "stare" für "${activePerson}" und hängen Sie das Gerundium auf "-ando" oder "-endo" an.`,
          italianSentence: `In questo momento io [${activePerson}] ________________.`,
          options,
          correctAnswer: correctSentence,
          explanation: `Die Verlaufsform im Italienischen wird mit dem konjugierten Hilfsverb "stare" ("${stareForm}") und dem Gerundium des Hauptverbs ("${gerundChoice.gerund}") gebildet.`
        };
      }
    }

    case 'past': {
      // Past tense conjugation (Passato prossimo vs Imperfetto)
      if (level === 'A1') {
        // Simple A1 Passato Prossimo helper picker
        const verbChoice = activeVerb;
        const aux = verbChoice.passato_prossimo.auxiliary;
        const part = verbChoice.passato_prossimo.participle;
        
        const auxVerb = aux === 'essere' ? getEsserePresent(activePerson) : getAverePresent(activePerson);
        // Gender alignment in case of essere
        let finalPart = part;
        if (aux === 'essere') {
          if (activePerson === 'noi' || activePerson === 'voi' || activePerson === 'loro') {
            finalPart = part.slice(0, -1) + 'i'; // plural masculine default
          }
        }
        
        const correctForm = `${auxVerb} ${finalPart}`;
        const wrongForm1 = `${aux === 'essere' ? 'ho' : 'sono'} ${finalPart}`;
        const wrongForm2 = `${auxVerb} ${part.slice(0, -1) + 'o'}`;
        const wrongForm3 = `${auxVerb} ${verbChoice.verb}`;

        const options = shuffleArray([correctForm, wrongForm1, wrongForm2, wrongForm3], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Was ist die richtige Form im Passato Prossimo für den Satz: "${activePersonGer} habe/bin ${verbChoice.meaning}"?`,
          helpText: `Tipp: Das Hilfsverb für das Verb "${verbChoice.verb}" ist "${aux}".`,
          italianSentence: `Ieri ${activePerson} ________________.`,
          options,
          correctAnswer: correctForm,
          explanation: `Das Verb "${verbChoice.verb}" konjugiert mit "${aux}" als Hilfsverb. Für "${activePerson}" lautet die vollständige Vergangenheit "${correctForm}".`
        };
      } else {
        // A2 Past: Passato Prossimo vs Imperfetto
        const situations = [
          {
            german: 'Wir schrieben gerade, als das Telefon klingelte.',
            italian: 'Mentre noi [scrivere/imperfetto] ________, il telefono ha squillato.',
            correct: 'scrivevamo',
            wrong: ['abbiamo scritto', 'scrivevano', 'scriveremo'],
            explanation: 'Sich im Verlauf befindende Handlungen in der Vergangenheit, die durch eine neue Handlung unterbrochen werden, erfordern das Imperfetto.'
          },
          {
            german: 'Letzten Sonntag bin ich nach Mailand gefahren.',
            italian: 'Domenica scorsa [andare/passato] ________ a Milano.',
            correct: 'sono andato',
            wrong: ['andavo', 'ero andato', 'ho andato'],
            explanation: 'Einmalige, abgeschlossene Ereignisse zu einem konkreten Zeitpunkt verlangen das Passato Prossimo.'
          },
          {
            german: 'Als ich klein war, lebte ich auf dem Land.',
            italian: 'Quando [essere/imperfetto] ________ piccolo, vivevo in campagna.',
            correct: 'ero',
            wrong: ['sono stato', 'sono', 'fui'],
            explanation: 'Beschreibungen von Zuständen, Gewohnheiten oder Altersangaben in der Vergangenheit verlangen das Imperfetto.'
          }
        ];
        
        const situation = situations[hash % situations.length];
        const options = shuffleArray([situation.correct, ...situation.wrong], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Wählen Sie das richtige Tempus (Passato Prossimo vs Imperfetto) für den Satz: "${situation.german}"`,
          helpText: 'Tipp: Drückt der Vergangenheitskontext eine fortlaufende Situation/Hintergrundbeschreibung aus oder eine abgeschlossene Punktualhandlung?',
          italianSentence: situation.italian,
          options,
          correctAnswer: situation.correct,
          explanation: situation.explanation
        };
      }
    }

    case 'future': {
      // Future tense / Futuro
      const verbChoice = activeVerb;
      const futForm = verbChoice.futuro[activePerson as keyof typeof verbChoice.futuro];
      
      const wrong1 = verbChoice.present[activePerson as keyof typeof verbChoice.present];
      const wrong2 = futForm.slice(0, -2) + 'remo';
      const wrong3 = futForm + 'te';
      
      const options = shuffleArray([futForm, wrong1, wrong2, wrong3], hash);

      if (level === 'A1') {
        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Überführen Sie das Verb "${verbChoice.verb}" (${verbChoice.meaning}) für "${activePersonGer} (${activePerson})" ins Futuro (Zukunft).`,
          helpText: `Tipp: Im Futuro haben regelmäßige Verben auf -are wie "parlare" Endungen auf -erò, -erai, -erà...`,
          italianSentence: `Domani noi/io [${activePerson}] ________________ con lui.`,
          options,
          correctAnswer: futForm,
          explanation: `Das Futuro Semplice von "${verbChoice.verb}" für "${activePerson}" lautet "${futForm}".`
        };
      } else {
        // A2 Futuro & periodi ipotetici (Conditionals)
        const conditionalPhrases = [
          {
            german: 'Wenn morgen die Sonne scheint, werden wir ans Meer fahren.',
            italian: 'Se domani ci sarà il sole, [andare/futuro] ________ al mare.',
            correct: 'andremo',
            wrong: ['andiamo', 'andavamo', 'andremmo'],
            explanation: 'In einem realen Bedingungssatz (Bedingungstyp I) steht nach "se" ein Präsens oder Futuro, und im Hauptsatz das Futuro.'
          },
          {
            german: 'Wenn ich groß bin, werde ich ein neues Auto kaufen.',
            italian: 'Quando sarò grande, [comprare/futuro] ________ una nuova macchina.',
            correct: 'comprerò',
            wrong: ['compro', 'comprerei', 'compravo'],
            explanation: 'Mit "quando" eingeleitete zukünftige Konditionen stehen im Italienischen meistens direkt im Futuro.'
          }
        ];
        
        const phrase = conditionalPhrases[hash % conditionalPhrases.length];
        const opt = shuffleArray([phrase.correct, ...phrase.wrong], hash);
        
        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Vollenden Sie den hypothetischen Zukunftssatz richtig: "${phrase.german}"`,
          helpText: 'Tipp: Achten Sie auf die Person (wir = andremo, ich = comprerò) im Futuro.',
          italianSentence: phrase.italian,
          options: opt,
          correctAnswer: phrase.correct,
          explanation: phrase.explanation
        };
      }
    }

    case 'verbs': {
      // Verbs general topic (Unregelmäßige Verben & Modalverben)
      if (level === 'A1') {
        const modalVerbs = ['potere', 'dovere', 'volere'];
        const mv = modalVerbs[hash % modalVerbs.length];
        // simple test on modal verbs
        const correctConjugation = mv === 'potere' ? 'posso' : mv === 'dovere' ? 'devo' : 'voglio';
        const wrongAns = ['potete', 'dovete', 'volete', 'può', 'deve', 'vuole'].filter(x => x !== correctConjugation).slice(0, 3);
        const options = shuffleArray([correctConjugation, ...wrongAns], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Wählen Sie das korrekte Modalverb für "ich" (io) im Präsens: "Ich will / muss / kann heute Deutsch lernen."`,
          helpText: `Tipp: Das Verb ist "${mv}".`,
          italianSentence: `Io ________ studiare oggi.`,
          options,
          correctAnswer: correctConjugation,
          explanation: `Das Modalverb "${mv}" lautet für die 1. Person Singular (io) im Presente "${correctConjugation}".`
        };
      } else {
        // A2: Modalverben im Passato Prossimo (auxiliary selection rule!)
        // Aux-selection rule: modal takes aux of the following main verb!
        const modalPastQuestions = [
          {
            german: 'Ich habe arbeiten gemusst (lavorare = braucht avere)',
            italian: 'Io [dovere] ________ lavorare oggi.',
            correct: 'ho dovuto',
            wrong: ['sono dovuto', 'devo', 'ho dovere'],
            explanation: 'Modalverben im Passato Prossimo nehmen das Hilfsverb des nachfolgenden Infinitivs. Da "lavorare" mit "avere" konjugiert wird, gilt: "ho dovuto lavorare".'
          },
          {
            german: 'Er ist weggehen müssen (andare = braucht essere)',
            italian: 'Lui [dovere] ________ andare via.',
            correct: 'è dovuto',
            wrong: ['ha dovuto', 'è dovere', 'era andato'],
            explanation: 'Weil "andare" im Passato Prossimo mit "essere" gebildet wird, nimmt auch das Modalverb "dovere" das Hilfsverb "essere": "Lui è dovuto andare".'
          }
        ];
        
        const q = modalPastQuestions[hash % modalPastQuestions.length];
        const options = shuffleArray([q.correct, ...q.wrong], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Fortgeschrittene Regel für Modalverben in der Vergangenheit: "${q.german}"`,
          helpText: 'Tipp: Welches Hilfsverb benutzt das nachfolgende Vollverb (lavorare = avere, andare = essere)? Extrapolieren Sie dieses!',
          italianSentence: q.italian,
          options,
          correctAnswer: q.correct,
          explanation: q.explanation
        };
      }
    }

    case 'grammar': {
      // Sentence syntax / Negatives / Questions
      const targetSentence = sentenceList[hash % sentenceList.length];
      
      const typeNum = hash % 2;
      if (typeNum === 0) {
        // Type 1: Reorder sentence (Scrambled)
        return {
          id: questionId,
          level,
          topicId,
          type: 'reorder',
          prompt: `Bringen Sie die folgenden Wörter in die grammatikalisch richtige italienische Reihenfolge: "${targetSentence.german}"`,
          helpText: 'Tipp: Denken Sie an die Reihenfolge Subjekt -> Verb -> Objekt/Ergänzung.',
          italianSentence: '',
          options: targetSentence.scrambled, // the scrambled blocks
          correctAnswer: targetSentence.italian,
          explanation: targetSentence.explanation
        };
      } else {
        // Type 2: Negative and question selection
        const isA1 = level === 'A1';
        const originalPhrase = isA1 ? 'Io parlo italiano.' : 'Abito in Germania da un anno.';
        const expectedNegation = isA1 ? 'Io non parlo italiano.' : 'Non abito in Germania da un anno.';
        const wrong1 = isA1 ? 'Io parlo non italiano.' : 'Abito in Germania no da un anno.';
        const wrong2 = isA1 ? 'No io parlo italiano.' : 'Abito in Germania non da un anno.';
        
        const options = shuffleArray([expectedNegation, originalPhrase, wrong1, wrong2], hash);

        return {
          id: questionId,
          level,
          topicId,
          type: 'multiple-choice',
          prompt: `Welcher Satz stellt die grammatikalisch korrekte Verneinung dar für: "${isA1 ? 'Ich spreche kein Italienisch' : 'Ich wohne seit einem Jahr nicht in Deutschland'} "?`,
          helpText: 'Tipp: Die Verneinung "non" steht immer direkt vor dem konjugierten Verb.',
          italianSentence: `Vorlage: "${originalPhrase}"`,
          options,
          correctAnswer: expectedNegation,
          explanation: 'Im Italienischen verneint man Sätze, indem man das Wort "non" unmittelbar vor das konjugierte Verb stellt.'
        };
      }
    }

    case 'vocabulary':
    default: {
      // General vocabulary matching
      const prompt = `Welches Wort bedeutet das deutsche Wort "${activeWord.german}" auf Italienisch?`;
      const correctWord = activeWord.italian;
      
      // Select 3 random wrong words from the same category
      const wrongChoices = activeVocabs
        .filter(w => w.italian !== correctWord)
        .map(w => w.italian);
      
      const wrongAnswers = shuffleArray(wrongChoices, hash).slice(0, 3);
      while (wrongAnswers.length < 3) {
        wrongAnswers.push('parola_' + Math.floor(Math.random() * 100));
      }

      const options = shuffleArray([correctWord, ...wrongAnswers], hash);
      const genderText = activeWord.gender ? ` Genderspezifikation: ${activeWord.gender === 'm' ? 'Männlich (maschile)' : 'Weiblich (femminile)'}.` : '';

      return {
        id: questionId,
        level,
        topicId,
        type: 'translation',
        prompt,
        helpText: `Kategorie: ${activeCategory.toUpperCase()}.${genderText}`,
        italianSentence: `Vokabeltest: ${activeWord.german} = ?`,
        options,
        correctAnswer: correctWord,
        explanation: `Das italienische Wort für "${activeWord.german}" ist "${correctWord}". ${activeWord.plural ? 'Der Plural lautet: ' + activeWord.plural : ''}`
      };
    }
  }
}

// Simple helpers
function getCorrectArticle(w: Word): string {
  if (w.gender === 'f') {
    // feminine
    const first = w.italian[0].toLowerCase();
    if (['a','e','i','o','u'].includes(first)) return "l'";
    return 'la';
  } else {
    // masculine
    const first = w.italian[0].toLowerCase();
    if (['a','e','i','o','u'].includes(first)) return "l'";
    if (first === 'z' || w.italian.startsWith('ps') || w.italian.startsWith('gn') || (first === 's' && !['a','e','i','o','u'].includes(w.italian[1]))) return 'lo';
    return 'il';
  }
}

function getCorrectPluralArticle(w: Word): string {
  if (w.gender === 'f') {
    return 'le';
  } else {
    const first = w.italian[0].toLowerCase();
    if (['a','e','i','o','u'].includes(first) || first === 'z' || (first === 's' && !['a','e','i','o','u'].includes(w.italian[1]))) return 'gli';
    return 'i';
  }
}

function getWrongArticles(correct: string): string[] {
  const all = ['il', 'la', 'lo', "l'", 'un', 'una'];
  return all.filter(a => a !== correct).slice(0, 3);
}

function mergePrepArt(prep: string, art: string): string {
  const map: Record<string, Record<string, string>> = {
    in: { il: 'nel', la: 'nella', "l'": 'nell\'', lo: 'nello', i: 'nei', le: 'nelle', gli: 'negli' },
    a: { il: 'al', la: 'alla', "l'": 'all\'', lo: 'allo', i: 'ai', le: 'alle', gli: 'agli' },
    da: { il: 'dal', la: 'dalla', "l'": 'dall\'', lo: 'dallo', i: 'dai', le: 'dalle', gli: 'dagli' },
    su: { il: 'sul', la: 'sulla', "l'": 'sull\'', lo: 'sullo', i: 'sui', le: 'sulle', gli: 'sugli' },
    di: { il: 'del', la: 'della', "l'": 'dell\'', lo: 'dello', i: 'dei', le: 'delle', gli: 'degli' }
  };
  return map[prep]?.[art] || `${prep} ${art}`;
}

function getEsserePresent(person: string): string {
  const m: Record<string, string> = { io: 'sono', tu: 'sei', 'lui/lei': 'è', noi: 'siamo', voi: 'siete', loro: 'sono' };
  return m[person] || 'sono';
}

function getAverePresent(person: string): string {
  const m: Record<string, string> = { io: 'ho', tu: 'hai', 'lui/lei': 'ha', noi: 'abbiamo', voi: 'avete', loro: 'hanno' };
  return m[person] || 'ho';
}

function getStarePresent(person: string): string {
  const m: Record<string, string> = { io: 'sto', tu: 'stai', 'lui/lei': 'sta', noi: 'stiamo', voi: 'state', loro: 'stanno' };
  return m[person] || 'sto';
}

// Shuffle array deterministically with seed
function shuffleArray<T>(arr: T[], seedValue: number): T[] {
  const result = [...arr];
  let curSeed = seedValue;
  for (let i = result.length - 1; i > 0; i--) {
    curSeed = (curSeed * 9301 + 49297) % 233280;
    const j = Math.floor((curSeed / 233280) * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}
