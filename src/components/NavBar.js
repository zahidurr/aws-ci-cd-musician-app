import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import UserInfo from "./UserInfo";

/*STYLE components */
const activeLink = {
  fontWeight: "bold",
  paddingBottom: "5px",
};

class NavBar extends Component {
  render() {
    return (
      <header className="site-header outer no-cover">
        <div className="inner">
          <nav className="site-nav">
            <div className="site-nav-left">
              <ul className="nav" role="menu">
                <li>
                  <NavLink
                    exact
                    to="/home"
                    activeClassName="navActive"
                    activeStyle={activeLink}
                    style={{ color: `black` }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/leaderboard"
                    activeClassName="navActive"
                    activeStyle={activeLink}
                    style={{ color: `black` }}
                  >
                    Leaderboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/add"
                    activeClassName="navActive"
                    activeStyle={activeLink}
                    style={{ color: `black` }}
                  >
                    Add Question
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserInfo history={this.props.history} />
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
