import React from "react";
import "../stylesheets/intro.css";

const Intro = props => {
  return (
    <div className="intro">
      <p>Hello, and welcome on the 30-Day Challenges app! </p>
      <p>
        {" "}
        It is said that if you can push yourself to do something for 30
        consecutive days it becomes a habit. This app helps you challenge
        yourself and stick to your goals.
      </p>
      <p>
        Take one of the existing challenges or create a new one and follow-up by
        logging your progress every day. If you miss one day however, the
        challenge is over.{" "}
      </p>
      <p>Good luck on this journey toward self improvement.</p>
      <button className="btn btn-primary btn-sm" {...props}>
        Got it
      </button>
    </div>
  );
};

export default Intro;
