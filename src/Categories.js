import React, { useState } from 'react';

import Button       from '@material-ui/core/Button';
import allQuestions from './questions.json'

import QuestionSet  from './QuestionSet'

/*
    Categories ist die Hauptkomponente unserer QuizApp

    Hier kann der Spieler eine der Kategorien auswählen,
    diese Auswahl wird in [state.category] gespeichert.

    a. Ist [state.category] === null wird die Auswahl angezeigt
    b. Ansonsten wird die [QuestionSet] Komponente dargestellt,
         diese wird mit den props [questions] und [category] versorgt.
*/

export default function Categories(){
  // Array mit den namen (String) aller Kategorien
  //   - Object.keys gibt uns alle Schüssel in einem Objekt zurück
  const categories = Object.keys(allQuestions);

  // Der state unserer Komponente, hier gibt es nur einen Schüssel,
  //   der Name unserer Kategorie
  const [state,setState] = useState({
    category:null
  });

  // Lese den Schüssel [category] aus dem state in eine Konstante
  //   (destrukturierung)
  const {category} = state;

  // Die [reset] Funktion setzt category auf null zurück um wieder die
  //   Liste aller Kategorien anzuzeigen
  const reset = e => setState({category:null});

  // Wenn [category] nicht null ist, zeige die QuestionSet Komponente
  if (category) return <QuestionSet
    category={category}
    questions={allQuestions[category]}
    reset={reset}
  />

  // Ansonsten zeige die Liste aller Kategorien
  return (
  <div className="categories">
    {categories.map( (category,index) =>
      <Button key={index} onClick={ e => {
        // Setze [category] auf die angeklickte Kategorie
        setState({category});
      }}>{category}</Button> )}
  </div> )
}
