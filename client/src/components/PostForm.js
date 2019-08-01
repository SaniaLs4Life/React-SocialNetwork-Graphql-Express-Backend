import React from "react";
import { Form, Button, Icon, Popup } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: ""
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    }
  });

  function createPostCallBack() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post</h2>
      <Popup
        trigger={<Form.Input
          iconPosition="left"
          icon="sticky note"
          placeholder="Write your post"
          name="body"
          onChange={onChange}
          error={error ? error.graphQLErrors[0].message : null}
          value={values.body}
          action={
            <Button type="submit" color="red">
              <Icon name="add" />
              Post
            </Button>
          }
        />}
        header='New Post'
        content='What is on your mind?'
        on='focus'
      />
    </Form>
  );
}
