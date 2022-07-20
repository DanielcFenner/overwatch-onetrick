import "./Main.css";
import { createResource, createSignal, createEffect } from "solid-js";

// fetch heroes from api
const fetchHeroes = async (id) => {
  (await fetch(`http://localhost:3001/api`)).json();
};

function Main() {
  const [heroes, setHeroes] = createSignal([]);
  const [heroesResource] = createResource(fetchHeroes);

  return (
    <main>
      <div class="mainContainer">
        <h5>
          Which <span>one trick</span> would you rather have on your team?
        </h5>
        <Show when={!heroesResource.loading}>
          <For each={heroesResource()}>{(hero) => <p>{hero.name}</p>}</For>
        </Show>
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
      </div>
    </main>
  );
}

export default Main;
