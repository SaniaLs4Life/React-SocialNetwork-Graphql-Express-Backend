import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      likeCount
      username
      likes {
        id
        username
        createdAt
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

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
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
