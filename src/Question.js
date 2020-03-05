import React from 'react';

import Checkbox       from '@material-ui/core/Checkbox';
import Button         from '@material-ui/core/Button';
import Favorite       from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

/*
  Die [Question] Komponente stellt eine Frage und alle antworten dar

  Sie wird über [props] mit der Frage, allen Antworten und dem Index der
  richtigen Antwork versorgt. Wenn der Spieler [Next] drückt,
  werden die Antworten ausgwertet und [nextQuestion] aus der [QuestionSet]
  Komponente aufgerufen.
 */

export default function Question({
  question, correct, answers, chosen, select, nextQuestion
}){ return (
  <div className="question">
    <h1>{question}</h1>
    { answers.map(
      (answer,index)=> (
        <div key={index} className="answer">
          <Checkbox
            onChange={select(index)}
            checked={chosen[index]}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          /> {answer}
        </div> )
      )}
      <Button variant="contained" color="primary" onClick={
        e => {
          const wasAnsweredCorrectly = chosen.reduce(
            (isCorrect,value,index)=> {
              if ( ! isCorrect ) return false; // wenn eine Antwort falsch ist ist die Frage immer falsch beantwortet
              if ( value === false && index === correct ) return false; // Wenn der Benuter nein gesag hat aber die antwor ist richtig
              if ( value === true  && index !== correct ) return false; // Wenn der Benutzer ja gesagt hat aber die Antwort ist falsch
              return true;
            }
          ,true)
          nextQuestion(wasAnsweredCorrectly ? 1 : 0);
      }}>
        Next
      </Button>
  </div> )
}
