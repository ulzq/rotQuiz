
import React, { useState } from 'react';

import Button    from '@material-ui/core/Button';
import Question  from './Question'

/*
  Die [QuestionSet] Komponente bekommt den Namen der Kategorie,
  sowie die list aller Fragen/Anworten als props.

  Sie geht durch alle Fragen durch, und stellt diese mit der [Question]
  Komponente dar. Ausserdem ist siie für das zählen der Punkte zuständig.

  Ist man am Ende der Fragen angekommen wird eine zusammenfassung dargestell.
   - Der [button] ist mit der [reset] Funktion aus der [Categories] Komponente
     verbunden.
*/

export default function QuestionSet({category,questions,reset}) {

  const [state,setState] = useState({
    count:-1,      // Anzahl der beantworteten Fragen
    points:0,      // gesammelte Punkte
    questions,     // (Array) mit allen Fragen, kommt aus [props]
    question:null, // Aktuelle frage (String)
    answers:null,  // (Array[mit Strings]) der alle Antworten enthält
    correct:null,  // Index (Number) der richtigen Antwort
    chosen:null,   // (Array[mit Booleans]) der die angeklickten Felder darstellt
    finished:false // Ist das Set beendet?
  });

  // Destrukturiere die wichtigsten State-Werte in lokale Konstanten.
  const { count, points, question, correct, answers, chosen } = state;

  // Wenn das Set beendet wurde, stelle das Endergebnis dar und lasse
  // den Spieler zurück zu [Categories] wenn er den Button anklickt
  //   die [reset] Funktion kommt über [props] aus der [Categories] Komponente.
  if ( state.finished ){
    return ( <div className="endGame">
      <h1>You are done</h1>
      <h2>Score {points} of {count}</h2>
      <Button onClick={reset}>Done</Button>
    </div> )
  }

  // Die [nextQuestion] Funktion liest die Frage und Antworten aus dem aktuellen
  //   Datensatz und mischt die Antworten (normal ist die erste Antwort korrekt)
  function nextQuestion(point=0){
    // Generiert eine Zufallszahl von 0 bis [questions] Länge
    const random = Math.floor( Math.random() * questions.length );
    // Extrahiert den Datensatz aus dem [questions](Array)
    const record = questions.splice(random,1)[0];
    // Wenn keinen [record] mehr gibt ist das Set beendet.
    if ( ! record ){
      setState({...state,finished:true})
      return
    }
    const question = record[0]; // Das erste Element im Daten
    let    answers = record.slice(1); // Die antworten sind alles ab Index 1
    let    correct = answers[0]; // Merken uns die richtige Antwort (String)
           answers = answers.sort( (a,b)=> Math.random()-.5 ) // Mische die Karten
           // Math.random() gibt eine Zahl zwischen 0 und 1
           //   - minus 0.5 gibt da eine Zahl von -0.5 bis 0.5
           //   - sort erwartet eine positive oder negative Zahl
           //   - das ergebnis ist ein gemsichter array

    // Finde den Index(Number) der rictigen antwort
           correct = answers.indexOf(correct);
    // Erzeuge den [chosen](Array) mit allen weren auf (false)
    const   chosen = answers.map( ()=> false );
    setState({
      ...state,                   // Nehme den alten State mit
      question, correct, answers, chosen, // und setze alle Felder mit Änderungen
      count:  state.count + 1,     // Anzahl der Fragen erhöhen
      points: state.points + point // Addiere Punkte wenn es welche gab
    });
  }

  // Wend er Spieler eine Antwort anklich ändere den State
  // die ist ein Callback generator wenn man die funtion mit [index]
  // aufruft bekommt man einen individuellen Event-Handler zurück
  const select = index => e => {
    let copycat = [...state.chosen];
    copycat[index] = e.target.checked;
    setState({...state,chosen:copycat});
  }

  // Beim ersten laden der Komponente (count ist -1)
  // rufe die [nextQuestion] Funktion auf um eine Frage zu ziehen
  if ( state.count === -1 ){
    nextQuestion()
  }

  return (
    <div className="App">
      {state.count === -1 ? null : `Question: ${state.count} Points: ${state.points}`}
      <Question
        question={question}
        correct={correct}
        answers={answers}
        chosen={chosen}
        select={select}
        nextQuestion={nextQuestion}
      />
    </div>
  );
}
