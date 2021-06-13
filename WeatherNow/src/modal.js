import "regenerator-runtime";

const StateUpdateEvent = new Event("stateUpdate");
function StateManager() {
  this.state = {
    isLoading: false,
    info: {},
  };
  this.setState = (newState) => {
    this.state = { ...newState };
    dispatchEvent(StateUpdateEvent);
  };
}

export const StateMan = new StateManager();

const API_KEY = "tumko kya laga me apni api bta dunga nananana";

export const getCityData = async (city) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
      {
        headers: {
          Accept: "application/json",
        },
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
