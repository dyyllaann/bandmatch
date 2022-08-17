import React from "react";
import format from "date-fns/format";
import "./Cards.css";
import Modal from "@mui/material/Modal";

const Cards = ({ headliners, localEvents, venues }) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

  const [activeHeadliner, setActiveHeadliner] = React.useState("")

  const clickHandler = (h) => {
    setActiveHeadliner(h);
    return handleOpen();
  }

	let cards = headliners.map((headliner, index) => (
		<div key={index} className="card" onClick={() => clickHandler(headliner)}>
			<div key={index} className="artistCard">
				<div className="cardOverlay"></div>
				<img
					alt={`${headliner.name}`}
					src={headliner.image_url}
					className="artistImage"
				></img>
				<h4 className="artistTitle">{headliner.name}</h4>
			</div>
		</div>
	));

	return (
		<div className="cardSection">
			{cards}
			<Modal
				open={open}
				onClose={handleClose}
			>
        <div className="associatedAct_list">
          <div className="associatedAct_intro">
            If you like <strong>{activeHeadliner.name}</strong>, check out...
          </div>
          {activeHeadliner.associated_acts &&
          venues.length > 0 &&
          localEvents.length > 0 ? (
            activeHeadliner.associated_acts.map((associatedAct) => {
              const event = localEvents.find(
                ({ id }) => id === associatedAct.event_id
              );
              const venue = venues.find(
                ({ id }) => id === event.venue_id
              );
              const eventStart = format(
                new Date(event.start_at),
                "E M/d, haaa"
              );

              return (
                <div key={associatedAct.name} className="associatedAct">
                  <h3 className="associatedAct_title">
                    {associatedAct.name}
                  </h3>
                  <span className="associatedAct_description">
                    Uptown funk gon' give it to ya.
                  </span>
                  <span className="associatedAct_event">{`${eventStart} @ ${
                    venue && venue.title
                  }`}</span>
                  <a
                    href={associatedAct.event_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="associatedAct_arrow">→</span>
                  </a>
                </div>
              );
            })
          ) : (
            <div className="associatedAct">
              <span>No associated artists found.</span>
            </div>
          )}
        </div>
			</Modal>
		</div>
	);
}

export default Cards;