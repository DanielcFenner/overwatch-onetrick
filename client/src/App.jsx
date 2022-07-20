import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Results from "./components/Results";
import { Route, Routes } from "solid-app-router";

// check which theme user prefers
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
  // add dark-theme to body class
  document.body.classList.add("dark-theme");
}

function App() {
  return (
    <div class="appWrapper">
      <Header />

      <Routes>
        <Route path="/" component={Main} />
        <Route path="/results" component={Results} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
