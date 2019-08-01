import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Label, Icon, Button, Popup } from "semantic-ui-react";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });
  // const likeButton = user ? (
  //   liked ? (
  //     <Icon color="red" name="heart" />
  //   ) : (
  //     <Icon color="red" name="heart outline" />
  //   )
  // ) : (
  //   <Icon color="red" name="heart outline" />
  // );
  const likeButton = user ? (
    liked ? (
      <Button color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="red" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );
  return (
    <Popup
      header="People who liked this post"
      content={likes.length > 0 ? likes
        .map(e => {
          return e.username;
        })
        .join(", ") : 'No one has liked this post yet'}
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
          <Label basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
