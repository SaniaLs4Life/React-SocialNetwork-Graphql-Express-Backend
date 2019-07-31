import React, { useState, useContext } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

import { useForm } from "../utils/hooks";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    username: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallBack() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form noValidate onSubmit={onSubmit} loading={loading}>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          error={errors.username}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={errors.password}
          value={values.password}
          onChange={onChange}
        />
        <Button primary>Register</Button>
      </Form>
      {errors.general && (
        <Message error>
          <Message.Header>
            There was an error with your submission!
          </Message.Header>
          <Message.Item>{errors.general}</Message.Item>
        </Message>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Login;
