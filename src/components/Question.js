import { decode } from "html-entities";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function Question(props) {
  const question = props;
  const [answers, setAnswers] = useState(props.options);

  useEffect(() => {
    setAnswers(
      answers.map((answer) => {
        const ans = answer === question.correctAns ? true : false;
        return {
          value: answer,
          id: nanoid(),
          isSelected: false,
          correct: question.correctAns,
          isCorrect: ans
        };
      })
    );
  }, []);
  function handleClick(id) {
    !question.isSubmit &&
      setAnswers(
        answers.map((answer) => {
          return id === answer.id && answer.isSelected === false
            ? { ...answer, isSelected: true }
            : { ...answer, isSelected: false };
        })
      );
  }

  useEffect(() => {
    answers.map((answer) => {
      if (answer.isSelected && answer.isCorrect) {
        props.scoreHandle();
      }
      return { ...answer };
    });
  }, [props.isSubmit]);

  return (
    <div>
      <div key={question.id} className="quiz-column">
        <span className="quiz-question">{decode(question.question)}</span>
        <div className="quiz-options">
          {answers.map((answer) => {
            const color2 = () => {
              if (answer.isCorrect && answer.isSelected) {
                return "#6cab6c";
              } else if (answer.isSelected) {
                return "#bb5d5d";
              }
            };

            const style1 = {
              backgroundColor: answer.isSelected ? "#C69749" : "#282A3A"
            };

            const style2 = {
              backgroundColor: color2()
            };

            return (
              <div
                className={
                  answer.isCorrect && props.isSubmit
                    ? "quiz-option correct_ans"
                    : "quiz-option"
                }
                key={nanoid()}
                onClick={() => handleClick(answer.id)}
                style={props.isSubmit ? style2 : style1}
              >
                <li>{decode(answer.value)}</li>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
