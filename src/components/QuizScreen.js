import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

export default function QuizScreen(props) {
  const [questionList, setQuestionList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [retake, setRetake] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const url = props.url;
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.results)
      .then((result) =>
        setQuestionList(
          result.map((ques) => {
            const newOptions = ques.incorrect_answers;
            const random = Math.floor(Math.random() * 4);
            newOptions.splice(random, 0, ques.correct_answer);
            return {
              ...ques,
              id: nanoid(),
              options: newOptions
            };
          })
        )
      );
    setTimeout(() => {
      setIsLoading(false);
      setScore(0);
    }, 1000);
  }, [retake]);

  function handleSubmit() {
    if (isSubmit) {
      setIsSubmit(false);
      setRetake(() => retake + 1);
    } else {
      setIsSubmit(true);
    }
  }

  function backToHome() {
    navigate("/home");
  }

  function handleScore() {
    setScore((prev) => prev + 1);
  }

  const QuestionElement = questionList.map((question) => (
    <Question
      isSubmit={isSubmit}
      key={question.id}
      id={question.id}
      options={question.options}
      question={question.question}
      correctAns={question.correct_answer}
      show={question.show}
      scoreHandle={handleScore}
    />
  ));

  return (
    <div className="quiz">
      <div className="welcome-head">
        <h1 style={{ marginTop: "unset" }}><span className="quiz-word">Q</span>uiz Mania</h1>
        <h4>Try and Test your Knowledge</h4>
      </div>
      <div>
        {QuestionElement}
        {!isLoading && (
          <div
            className={
              !isSubmit
                ? "quiz-button-footer"
                : "quiz-button-footer flex_justify"
            }
          >
            {isSubmit && (
              <button className="quiz-button" onClick={backToHome}>
                Home
              </button>
            )}
            {isSubmit && (
              <p>
                Your score is {score}/{questionList.length}
              </p>
            )}
            <button className="quiz-button" onClick={handleSubmit}>
              {isSubmit ? "Retake" : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
