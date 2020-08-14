import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { userQuestionData } from "../utils/helper";
import NavBar from "./NavBar";
import QuestionCard from "./QuestionCard";

class Home extends Component {
  state = {
    toBeAnswered: true,
  };

  tbAnsweredHandler = () => {
    this.setState({
      toBeAnswered: true,
    });
  };

  answeredHandler = () => {
    this.setState({
      toBeAnswered: false,
    });
  };

  render() {
    console.log(this.props);
    const { toBeAnswered } = this.state;
    const { answeredId, unansweredId } = this.props.questionsSplit;

    const questionsToAnswer = unansweredId.map((id) => (
      <QuestionCard key={id} id={id} toBeAnswered={toBeAnswered} />
    ));

    const answeredQuestions = answeredId.map((id) => (
      <QuestionCard id={id} key={id} toBeAnswered={toBeAnswered} />
    ));

    return (
      <Fragment>
        <NavBar history={this.props.history} />

        <div className="tab">
          <button
            className={toBeAnswered ? "active" : ""}
            onClick={this.tbAnsweredHandler}
          >
            Unanswered Questions
          </button>

          <button
            className={toBeAnswered ? "" : "active"}
            onClick={this.answeredHandler}
          >
            Answered Questions
          </button>
        </div>

        {toBeAnswered ? questionsToAnswer : answeredQuestions}
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser, questions, users }) {
  const questionsSplit = userQuestionData(users, authUser, questions);

  return {
    authUser,
    questions,
    questionsSplit,
  };
}

export default connect(mapStateToProps)(Home);
