import React from "react";
import { connect } from "react-redux";

import { leaderboardData } from "../utils/helper";
import NavBar from "./NavBar";
import LeaderboardCard from "./LeaderboardCard";

const LeaderboardPage = (props) => {
  window.scrollTo(0, 0);
  const { leaderboard, authUser } = props;
  return (
    <div>
      <NavBar history={props.history} />
      <main id="site-main" className="site-main outer" role="main">
        <div className="inner">
          <div className="post-feed">
            <article className="post-card post">
              <div className="leadersList">
                <div className="leaders head">
                  <p>User</p>
                  <p>Score</p>
                  <p>Questions Asked</p>
                  <p>Questions Answered</p>
                </div>
                {leaderboard.map((user) => {
                  return (
                    <LeaderboardCard
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      avatarURL={user.avatarURL}
                      questionsAnswered={user.questionsAnswered}
                      questionsAsked={user.questionsAsked}
                      score={user.score}
                      authUser={authUser}
                    />
                  );
                })}
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
};

function mapStateToProps({ users, authUser }) {
  const leaderboard = leaderboardData(users);
  return {
    leaderboard,
    authUser,
  };
}

export default connect(mapStateToProps)(LeaderboardPage);
