import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { receivedAuth } from "../actions/authUser";

class UserInfo extends Component {
  onLogoutHandler = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(receivedAuth(null));
    history.push("/");
  };

  render() {
    const { name, avatarURL } = this.props;
    return (
      <div className="site-nav-center">
        <ul className="nav" role="menu">
          <li>
            <NavLink to="/home">
              <img
                className="author-profile-image"
                src={avatarURL}
                alt="avatar"
              />
              <strong>{name}</strong>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={this.onLogoutHandler}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authUser, users }) {
  return {
    name: users[authUser].name,
    avatarURL: users[authUser].avatarURL,
  };
}

export default connect(mapStateToProps)(UserInfo);
