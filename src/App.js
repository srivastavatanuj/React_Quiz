import "./styles.css";
import Welcome from "./components/welcome";
import Home from "./components/Home";
import Users from "./components/Users";
import QuizScreen from "./components/QuizScreen";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const [url, setUrl] = useState();
  const apidata = (api) => {
    setUrl(api);
  };

  return (
    <div className="container" style={{ width: window.innerWidth }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="home" element={<Home data={apidata} />} />
          <Route path="users" element={<Users />} />
          <Route path="quiz" element={<QuizScreen url={url} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
