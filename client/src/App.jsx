import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/footer";

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
      <Main />
      <Footer />
    </div>
  );
}

export default App;
