import React, { Component, Fragment } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

import styled from "@emotion/styled";

import { handleSaveQuestion } from "../actions/questions";
import NavBar from "./NavBar";

/* STYLED COMPONENTS */
const PageContainer = styled.div`
  padding-top: 50px;
`;

const NewQuestionContainer = styled.div`
  width: 70%;
  margin: auto;
  padding-top: 120px;
  padding-bottom: 90px;
  border: solid #4caf50 2px;
  padding: 30px 20px 40px 20px;
  border-radius: 4px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  margin: auto;
`;

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    onSubmit: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { authUser, dispatch } = this.props;
    dispatch(handleSaveQuestion(optionOne, optionTwo, authUser));
    this.setState({
      optionOne: "",
      optionTwo: "",
      onSubmit: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { optionOne, optionTwo, onSubmit } = this.state;
    const loading = this.props.loadingBar.default;

    let isBtnDisabled = true;
    if ((optionOne !== "") & (optionTwo !== "")) {
      isBtnDisabled = false;
    }

    if (loading === 0 && onSubmit === true) {
      return <Redirect to="/home" />;
    }

    return (
      <Fragment>
        <LoadingBar
          style={{ backgroundColor: "#4caf50", zIndex: `1000` }}
          updateTime={10}
          maxProgress={95}
          progressIncrease={10}
        />
        <NavBar history={this.props.history} />
        <PageContainer>
          <NewQuestionContainer>
            <h2 style={{ marginBottom: `40px`, color: `#000` }}>
              Would you rather...
            </h2>
            <Form onSubmit={this.handleSubmit}>
              <Container>
                <Input
                  value={optionOne}
                  name="optionOne"
                  placeholder="Add first option"
                  fluid
                  onChange={this.handleChange}
                />
                <strong>OR</strong>
                <Input
                  value={optionTwo}
                  name="optionTwo"
                  placeholder="Add second option"
                  fluid
                  onChange={this.handleChange}
                />
                <Button
                  fluid
                  content="Add question"
                  color="green"
                  type="submit"
                  disabled={isBtnDisabled}
                />
              </Container>
            </Form>
          </NewQuestionContainer>
        </PageContainer>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser, loadingBar }) {
  return {
    authUser,
    loadingBar,
  };
}

export default connect(mapStateToProps)(NewQuestion);
