import React, { useContext } from "react";
import { Card, Image, Label, Icon, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);
  
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
        {/* {likes.map(e => <p>{e.username}</p>)} */}
        <LikeButton user={user} post={{ id, likeCount, likes }} />
        <Label style={{ cursor: "pointer" }} as={Link} to={`/posts/${id}`}>
          <Icon color="blue" name="comments outline" /> <b>{commentCount}</b>
        </Label>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            size="tiny"
            floated="right"
            onClick={() => console.log("Delete post")}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
