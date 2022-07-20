import { createResource } from "solid-js";
import "./Results.css";

// fetch vote results from api
const fetchResults = async () => {
  const response = await fetch(`http://localhost:3001/api/results`);
  return response.json();
};

function Results() {
  const [results] = createResource(fetchResults);

  const hostURL = "http://localhost:3001/images";

  return (
    <div class="resultsContainer">
      <div class="resultsGrid">
        <Show when={!results.loading}>
          <For each={results()}>
            {(result, i) => (
              <div class="resultCard">
                <img src={`${hostURL}${result.imageurl}`} />
                <div class="resultCardText">
                  <h6>{result.name}</h6>
                  <p>Votes: {result.votes}</p>
                </div>
                <div class="resultCardRank">{i() + 1}</div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}

export default Results;
