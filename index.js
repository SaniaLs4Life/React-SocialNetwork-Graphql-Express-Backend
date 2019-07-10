const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const gql = require("graphql-tag");

const { MONGODB } = require("./configDB.js");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
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
