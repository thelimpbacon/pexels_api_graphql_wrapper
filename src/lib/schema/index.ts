import { buildSchema } from "type-graphql";
import { PhotoResolver } from "../resolver/ImageResolver";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [PhotoResolver],
  });
};
