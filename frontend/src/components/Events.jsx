import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import starNightImage from "../assets/events/event1.png";
import  EVENT from "../assets/events/EVENTS.png";
import mridang from "../assets/events/Group 3.png";
import "./Events.css";
const events = [
  {
    title: "STAR-NIGHT",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
  {
    title: "BATTLE OF BANDS",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
  {
    title: "DANCERS DEN",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
  {
    title: "RAP SHOWCASE",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },

  // Row 2
  {
    title: "STAR-NIGHT",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
  {
    title: "BATTLE OF BANDS",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
  {
    title: "DANCERS DEN",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
  {
    title: "RAP SHOWCASE",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },

  // Row 3
  {
    title: "STAR-NIGHT",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
  {
    title: "BATTLE OF BANDS",
    image: starNightImage,
    prize: "₹45,000/-",
    fee: "₹1399",
  },
];

export default function Events() {
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

 return (
    <>
    <Navbar/>
  <section className="events-page">

    <div className="events-header">

     <div className="events-brand">
  <img
    src={mridang}
    alt="Mridang"
    className="events-mridang-logo"
  />

  <img
    src={EVENT}
    alt="Events"
    className="events-title-logo"
  />
</div>

      <div className="events-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search Event"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    </div>

    <div className="events-grid">

      {filteredEvents.map((event, index) => (

        <div
          className="event-card"
          key={`${event.title}-${index}`}
        >

          <h2 className="event-card-title">
            {event.title}
          </h2>

          <img
            className="event-image"
            src={event.image}
            alt={event.title}
          />

          <div className="event-details">
<div className="event-detail-row">
  <span>Prize Pool</span>
  <span className="event-dash">-</span>
  <strong>{event.prize}</strong>
</div>
<div className="event-detail-row">
  <span>Registration Fee</span>
  <span className="event-dash">-</span>
 <strong className="event-fee">
  {event.fee} /<br className="fee-break" />
  band
</strong>
</div>

          </div>

         <button className="event-register">
  <span>REGISTER</span>
</button>

        </div>

      ))}

    </div>

  </section>
  <Footer/>
  </>
);
}