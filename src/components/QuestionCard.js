import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionCard extends Component {
  render() {
    const { name, avatarURL, questionTeaser, toBeAnswered, id } = this.props;

    const button = toBeAnswered ? (
      <Link
        className="pollBtn"
        to={{
          pathname: `/question/${id}`,
          state: { showResponse: false },
        }}
      >
        Answer
      </Link>
    ) : (
      <Link
        className="pollBtn"
        to={{
          pathname: `/question/${id}`,
          state: { showResponse: true },
        }}
      >
        Check results
      </Link>
    );

    return (
      <main id="site-main" className="site-main outer" role="main">
        <div className="inner">
          <div className="post-feed">
            <article className="post-card post">
              <div className="poll">
                <p>
                  {<img className="avatar" alt="avater" src={avatarURL} />}{" "}
                  {name}
                </p>
                <p>
                  <strong>{questionTeaser}</strong>
                  <br />
                  or
                  <br />
                  <strong>...</strong>
                  <br />
                  <br />
                  {button}
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  const avatarURL = users[question.author].avatarURL;
  const name = users[question.author].name;

  return {
    avatarURL,
    name,
    questionTeaser: question.optionOne.text,
  };
}

export default connect(mapStateToProps)(QuestionCard);
