import React from "react";
import Cards from './Cards';
import axios from "axios";
import './App.css';
import banner from './banner.png'

const App = () => {
  const [headliners, setHeadliners] = React.useState([]);
  const [localEvents, setLocalEvents] = React.useState([]);
  const [venues, setVenues] = React.useState([]);

  React.useEffect(() => {
    (async function fetchHeadliners() {
      const res = await fetch(
				"https://bandmatch-server.herokuapp.com/testAPI"
			);
      const data = await res.json();
      setHeadliners(data.artist_list);
    })();

    (async function fetchLocalEvents() {
      const headers = {
        "x-api-key": "34ea052a82072d48",
      };
      await axios
        .get("/api/event?token=353a1e08a4525850", { headers })
        .then((response) => setLocalEvents(response.data));
    })();

    (async function fetchVenues() {
      const headers = {
        "x-api-key": "34ea052a82072d48",
      };
      await axios
        .get("/api/venue", { headers })
        .then((response) => setVenues(response.data));
    })();
  }, []);

  return (
		<div className="App">
			<img
        className="banner"
				src={banner}
				alt="Soundcheck Banner and navigation to main site."
			/>
			<header className="App-header">
				<Cards
					headliners={headliners}
					localEvents={localEvents}
					venues={venues}
				/>
			</header>
		</div>
	);
}

export default App;
