import "./Header.css";

function Header() {
  return (
    <header>
      <div class="headerContainer">
        <a href="/">
          <h5>OW1TRICK</h5>
        </a>
        <nav>
          <a href="/">Home</a>
          <a href="/results">Results</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
