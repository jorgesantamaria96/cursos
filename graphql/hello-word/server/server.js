import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello Word!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const serverInfo = await server.listen({ port: 9000 });
console.log(`Server running at ${serverInfo.url}`);
