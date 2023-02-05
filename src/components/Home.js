import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    number: "",
    category: "",
    difficulty: "",
    type: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const buttonStyle = {
    backgroundColor: isDisabled ? " rgb(118 110 97)" : "#C69749",
  };

  useEffect(() => {
    if (
      !(
        data.type === "" ||
        data.number === "" ||
        data.category === "" ||
        data.difficulty === ""
      )
    ) {
      setIsDisabled(false);
    }
  }, [data]);

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...data, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = `https://opentdb.com/api.php?amount=${data.number}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`;
    props.data(url);
    navigate("/quiz");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="welcome-head">
        <h1>
          <span className="quiz-word">Q</span>uiz Mania
        </h1>
        <h4>Try and Test your Knowledge</h4>
      </div>
      <fieldset>
        <label htmlFor="number">Number</label>
        <select
          id="number"
          name="number"
          value={data.number}
          onChange={handleChange}
          className="welcome-option"
        >
          <option value="">Select Number</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          className="welcome-option"
        >
          <option value="">Select Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={data.difficulty}
          onChange={handleChange}
          className="welcome-option"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={data.type}
          onChange={handleChange}
          className="welcome-option"
        >
          <option value="">Select Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>

        <button
          className="home-button"
          disabled={isDisabled}
          style={buttonStyle}
        >
          START QUIZ
        </button>
      </fieldset>
    </form>
  );
}
