import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="welcome-screen">
      <div className="welcome-head">
        <h1><span className="quiz-word">Q</span>uiz Mania</h1>
        <h4>Try and Test your Knowledge</h4>
        <p>Welcome</p>
      </div>
      <Link to="/home" className="welcome-button">
        Next
      </Link>
      <p className="welcome-footer">Developed by Tanuj Srivastava</p>
    </div>
  );
}
