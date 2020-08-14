import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { handleInitialData } from "./actions/shared";
import Login from "./components/Login";
import LeaderboardPage from "./components/LeaderboardPage";
import Home from "./components/Home";
import NewQuestion from "./components/NewQuestion";
import ErrorPage from "./components/ErrorPage";
import QuestionPage from "./components/QuestionPage";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { isLogedIn } = this.props;
    return (
      <div>
        {!isLogedIn ? (
          <Route path="/" component={Login} />
        ) : (
          <Fragment>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/add" component={NewQuestion} />
              <Route exact path="/leaderboard" component={LeaderboardPage} />
              <Route exact path="/question/:id" component={QuestionPage} />
              <Route component={ErrorPage} />
            </Switch>
          </Fragment>
        )}
      </div>
    );
  }
}
function mapStateToProps({ authUser }) {
  return {
    isLogedIn: authUser !== null
  };
}

export default connect(mapStateToProps)(App);
