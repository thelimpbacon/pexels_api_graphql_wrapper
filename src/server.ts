import "reflect-metadata";
import Express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./lib/schema";

interface ExpressReqResType {
  req: Request;
  res: Response;
}

const main = async () => {
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: ExpressReqResType) => {
      return { authorization: req.headers.authorization };
    },
  });

  await apolloServer.start();

  const app = Express();
  apolloServer.applyMiddleware({ app, path: "/pxapi" });

  await new Promise((resolve: any) => app.listen({ port: 5000 }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:5000${apolloServer.graphqlPath}`
  );
};

main();
