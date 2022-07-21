import "./Main.css";
import { createResource, createSignal, createEffect } from "solid-js";

// fetch heroes from api
const fetchHeroes = async () => {
  // if local storage is empty, fetch heroes from api
  if (
    localStorage.getItem("heroes") === null ||
    localStorage.getItem("heroes") === "undefined"
  ) {
    const response = await fetch(`/api`);
    // loop through response and set each hero's votes to 0
    let heroes = await response.json();
    heroes.forEach((hero) => {
      hero.votes = 0;
    });
    return heroes;
  } else {
    // if local storage is not empty, return heroes from local storage
    return JSON.parse(localStorage.getItem("heroes"));
  }
};

function Main() {
  const [localVotes, setLocalVotes] = createSignal([]);
  const [heroes, setHeroes] = createSignal([]);
  const [heroesResource] = createResource(fetchHeroes);

  const hostURL = "http://localhost:3001/images";

  createEffect(() => {
    if (heroesResource()) {
      newHeroes(heroesResource());
      setLocalVotes(heroesResource());
      console.log(heroesResource());
    }
  });

  function newHeroes(heroList) {
    const length = heroList.length;
    // add 2 new heroes to array randomly selected from heroList
    const newHeroes = [
      heroList[Math.floor(Math.random() * length)],
      heroList[Math.floor(Math.random() * length)],
    ];
    // change 2nd hero if it is the same as the first
    while (newHeroes[0].name === newHeroes[1].name) {
      newHeroes[1] = heroList[Math.floor(Math.random() * length)];
    }
    // set newHeroes to heroes
    setHeroes(newHeroes);
  }

  async function updateVote(heroId) {
    // increment hero IDs vote by 1
    setLocalVotes((localVotes) => {
      const newVotes = localVotes.map((hero) => {
        if (hero._id === heroId) {
          hero.votes++;
        }
        return hero;
      });
      console.log(newVotes);
      return newVotes;
    });

    // add localVotes to local storage
    localStorage.setItem("heroes", JSON.stringify(localVotes()));

    const response = await fetch(
      `http://localhost:3001/api/${heroId}`,
      {
        method: "PATCH",
      }
    );
    const data = await response.json();
    console.log(data);
  }

  function handleChoice(heroId) {
    updateVote(heroId);
    newHeroes(heroesResource());
  }

  return (
    <main>
      <div class="mainContainer">
        <h5>
          Which <span>one trick</span> would you rather have on your
          team?
        </h5>
        <Show when={heroes()[0] !== undefined}>
          <div class="choiceContainer">
            <div
              class="choice"
              onClick={[handleChoice, heroes()[0]._id]}
            >
              <img
                class="image"
                src={`${hostURL}${heroes()[0].imageurl}`}
                alt={`Picture of ${heroes()[0].name} from Overwatch`}
              />
              <button>{heroes()[0].name}</button>
            </div>
            <div
              class="choice"
              onClick={[handleChoice, heroes()[1]._id]}
            >
              <img
                class="image"
                src={`${hostURL}${heroes()[1].imageurl}`}
                alt={`Picture of ${heroes()[1].name} from Overwatch`}
              />
              <button>{heroes()[1].name}</button>
            </div>
          </div>
        </Show>
      </div>
    </main>
  );
}

export default Main;
