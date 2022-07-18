import "./Main.css";

function Main() {
  return (
    <main>
      <h5>
        Which <span>one trick</span> would you rather have on your team?
      </h5>
      <div class="choiceContainer">
        <div class="choice">
          <img class="image" src="/src/assets/rein.jpg" alt="Trick 1" />
          <button>Reinhardt</button>
        </div>
        <div class="choice">
          <img class="image" src="/src/assets/mei.jpg" alt="Trick 1" />
          <button>Mei</button>
        </div>
      </div>
    </main>
  );
}

export default Main;
