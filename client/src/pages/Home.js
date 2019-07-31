import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Header, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostSkeleton from "../components/PostSkeleton";

import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
  const { user } = useContext(AuthContext);
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
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <PostSkeleton />
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post, i) => (
                <Grid.Column key={i} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
