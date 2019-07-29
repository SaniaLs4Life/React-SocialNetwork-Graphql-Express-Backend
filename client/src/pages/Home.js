import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Header } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostSkeleton from "../components/PostSkeleton";

function Home() {
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);
  if (posts) {
    console.log(posts);
  }
  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <Header as="h3" textAlign="center" content="Recent Posts" />
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <PostSkeleton />
        ) : (
          posts &&
          posts.map((post, i) => (
            <Grid.Column key={i} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      likeCount
      username
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default Home;
