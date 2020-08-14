import React from "react";

const LeaderboardCard = (props) => {
  const { name, avatarURL, questionsAnswered, questionsAsked, score } = props;

  return (
    <div className="leaders">
      <p>
        {<img className="avatar" alt="user avater" src={avatarURL} />} {name}
      </p>
      <p>{score}</p>
      <p>{questionsAsked}</p>
      <p>{questionsAnswered}</p>
    </div>
  );
};

export default LeaderboardCard;
