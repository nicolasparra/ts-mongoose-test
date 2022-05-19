import express from "express";
import morgan from "morgan";
import { PORT } from "./config";
import * as bodyParser from "body-parser";

//GraphQL
import { buildSchema } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";
import { userResolvers } from "./graphql/resolvers/userResolver";
import { userDefs } from "./graphql/typeDefs/userDefs";

// Routes
import UserRouter from "./routes/User.router";
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "world";
    },
  },
};
class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.settingGraphQl(this.app, userDefs, userResolvers);
    this.settings();
    this.routes();
  }

  private async settingGraphQl(app, typeDefs, resolvers) {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/gql" });
  }

  settings() {
    this.app.set("port", PORT);
  }

  middlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    // this.app.use(express.urlencoded({ extended: false }));
    // this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/user", new UserRouter().router);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(">>> Server is running at", this.app.get("port"));
    });
  }
}

export default App;
