import { buildSchema } from "type-graphql";
import { ExampleResolver } from "../resolver/ExampleResolver";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [ExampleResolver],
  });
};
