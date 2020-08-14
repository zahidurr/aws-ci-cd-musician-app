import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";
import styled from "@emotion/styled";

import { responsePageData } from "../utils/helper";
import NavBar from "./NavBar";
import ErrorPage from "./ErrorPage";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const H4 = styled.h4`
  margin: 0px 10px 0px 0px;
  flex-basis: 30%;
`;

class QuestionResultsPage extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      avatarURL,
      name,
      optionOne,
      optionTwo,
      optionOneVotes,
      optionTwoVotes,
      totalVotes,
      isIdTrue,
    } = this.props;

    return (
      <div>
        <NavBar history={this.props.history} />
        {isIdTrue ? (
          <Fragment>
            <main id="site-main" className="site-main outer" role="main">
              <div className="inner">
                <div className="post-feed">
                  <article className="post-card post">
                    <div className="poll">
                      <p>
                        {
                          <img
                            className="avatar"
                            alt="avater"
                            src={avatarURL}
                          />
                        }{" "}
                        {name}
                      </p>

                      <FlexColumn style={{ flex: `4 1 200px` }}>
                        <div>
                          <H4>{optionOne}</H4>
                          <Progress
                            percent={Math.round(
                              (optionOneVotes / totalVotes) * 100
                            )}
                            progress="percent"
                            style={{ flexBasis: `60%` }}
                          >{`${optionOneVotes} out of ${totalVotes}`}</Progress>
                        </div>
                        <div>
                          <H4>{optionTwo}</H4>
                          <Progress
                            progress="percent"
                            percent={Math.round(
                              (optionTwoVotes / totalVotes) * 100
                            )}
                            style={{ flexBasis: `60%` }}
                          >{`${optionTwoVotes} out of ${totalVotes}`}</Progress>
                        </div>
                      </FlexColumn>

                      <button className="pollBtn" onClick={this.handleClick}>
                        Back
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </main>
          </Fragment>
        ) : (
          <ErrorPage />
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authUser }, { id }) {
  const {
    name,
    avatarURL,
    optionOne,
    optionTwo,
    optionOneVotes,
    optionTwoVotes,
    totalVotes,
    userAnswer,
    logedInUser,
    isIdTrue,
  } = responsePageData(users, questions, authUser, id);

  return {
    name,
    avatarURL,
    optionOne,
    optionTwo,
    optionOneVotes,
    optionTwoVotes,
    totalVotes,
    userAnswer,
    logedInUser,
    isIdTrue,
  };
}

export default connect(mapStateToProps)(QuestionResultsPage);
