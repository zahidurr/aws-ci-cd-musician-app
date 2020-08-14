import React from "react";
import { connect } from "react-redux";

import { userOptions } from "../utils/helper";
import { receivedAuth } from "../actions/authUser";

class Login extends React.Component {
  state = {
    userId: "",
    logedin: false,
  };

  handleUserChange = (e) => {
    const { value } = e.target;
    this.setState({
      userId: value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { userId } = this.state;
    dispatch(receivedAuth(userId));
    this.setState({ userId: "", logedin: true });
    if (window.location.pathname === "/") {
      history.push("/home");
    } else {
      history.push(window.location.pathname);
    }
  };

  render() {
    const { userId } = this.state;
    const { userOptions } = this.props;

    let btnDisable = true;
    if (userId !== "") {
      btnDisable = false;
    }

    return (
      <main id="site-main" className="site-main outer" role="main">
        <div className="inner">
          <div className="post-feed">
            <section className="post-card post section-form">
              <h2>Would You Rather...?</h2>
              <h3>Choose user to sign in</h3>
              <form id="add-trip-form" onSubmit={this.onSubmitHandler}>
                <div>
                  <select onChange={this.handleUserChange}>
                    <option value="" disabled="">
                      Choose user
                    </option>
                    {Object.values(userOptions).map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.text}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <button onClick={this.onSubmitHandler} disabled={btnDisable}>
                    Enter
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userOptions: userOptions(users),
  };
}

export default connect(mapStateToProps)(Login);
