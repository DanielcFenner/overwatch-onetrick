import { createResource, createSignal } from "solid-js";
import { Tab, TabGroup, TabList, TabPanel } from "solid-headless";
import "./Results.css";

// fetch vote results from api
const fetchResults = async () => {
  const response = await fetch(`/api/results`);
  return response.json();
};

function Results() {
  const [active, setActive] = createSignal("Global");
  const [results] = createResource(fetchResults);
  const [localVotes, setLocalVotes] = createSignal(
    getAndSortHeroesFromStorage()
  );

  function getAndSortHeroesFromStorage() {
    if (
      localStorage.getItem("heroes") === null ||
      localStorage.getItem("heroes") === "undefined"
    ) {
      return [];
    } else {
      const heroes = JSON.parse(localStorage.getItem("heroes"));
      return heroes.sort((a, b) => b.votes - a.votes);
    }
  }

  const hostURL = "/images";

  console.log(localVotes());

  return (
    <main>
      <div class="resultsContainer">
        <TabGroup defaultValue="Global" class="tabGroup">
          {({ isSelected, isActive }) => (
            <>
              <TabList class="tabList">
                <Tab
                  value="Global"
                  class={isSelected("Global") ? "activeTab" : "tab"}
                >
                  Global
                </Tab>
                <Tab
                  value="Local"
                  class={isSelected("Local") ? "activeTab" : "tab"}
                >
                  Local
                </Tab>
              </TabList>
              <div>
                <TabPanel value="Global">
                  <div class="resultsGrid">
                    <Show when={!results.loading}>
                      <For each={results()}>
                        {(result, i) => (
                          <div
                            class="resultCard"
                            style={`--i:${i()}`}
                          >
                            <img
                              src={`${hostURL}${result.imageurl}`}
                            />
                            <div class="resultCardText">
                              <h6>{result.name}</h6>
                              <p>Votes: {result.votes}</p>
                            </div>
                            <div class="resultCardRank">
                              {i() + 1}
                            </div>
                          </div>
                        )}
                      </For>
                    </Show>
                  </div>
                </TabPanel>
                <TabPanel value="Local">
                  <div class="resultsGrid">
                    <For each={localVotes()}>
                      {(result, i) => (
                        <div class="resultCard" style={`--i:${i()}`}>
                          <img src={`${hostURL}${result.imageurl}`} />
                          <div class="resultCardText">
                            <h6>{result.name}</h6>
                            <p>Votes: {result.votes}</p>
                          </div>
                          <div class="resultCardRank">{i() + 1}</div>
                        </div>
                      )}
                    </For>
                  </div>
                </TabPanel>
              </div>
            </>
          )}
        </TabGroup>
      </div>
    </main>
  );
}

export default Results;
