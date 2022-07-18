import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div class="appWrapper">
      <div class="container">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
