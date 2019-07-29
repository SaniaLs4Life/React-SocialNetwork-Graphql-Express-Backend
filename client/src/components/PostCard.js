import React from "react";
import { Card, Image, Label, Icon } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const likePost = () => {
    console.log("Post liked!");
  };

  const commentOnPost = () => {
    console.log("Commented on a post!");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="left"
          size="mini"
          src="https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label style={{ cursor: "pointer" }} onClick={likePost}>
          <Icon color="red" name="heart outline" /> {likeCount}
        </Label>
        <Label style={{ cursor: "pointer" }} onClick={commentOnPost}>
          <Icon color="blue" name="comments outline" /> <b>{commentCount}</b>
        </Label>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
