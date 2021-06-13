import { getCityData, StateMan } from "./modal";
import InfoView from "./Views/InfoView";
import SearchView from "./Views/SearchView";
import "regenerator-runtime";

const handleSearch = async (event) => {
  event.preventDefault();
  console.log("handle search triggered");
  const { query } = SearchView;
  StateMan.setState({
    ...StateMan.state,
    isLoading: true,
  });
  const data = await getCityData(query);
  console.log(data);
  StateMan.setState({
    ...StateMan.state,
    isLoading: false,
    info: data,
  });
  SearchView.clearForm();
  console.log(data);
};

window.addEventListener("stateUpdate", () => {
  if (StateMan.state.isLoading) {
    InfoView.renderSpinner();
  } else InfoView.render(StateMan.state.info);
});

const init = () => {
  SearchView.addSubmitController(handleSearch);
};
init();
