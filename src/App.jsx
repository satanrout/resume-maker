import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ResumeMaker from "./Resume";

function App() {
  const [count, setCount] = useState(0);

  return <ResumeMaker />;
}

export default App;
