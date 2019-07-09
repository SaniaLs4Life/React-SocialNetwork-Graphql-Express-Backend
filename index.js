const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const gql = require("graphql-tag");

const Post = require("./models/Post");
const { MONGODB } = require("./configDB.js");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected!");
    server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at 5000`);
  })
  .catch(err => {
    console.log(`An error occurred! Error: ${err}`);
  });
