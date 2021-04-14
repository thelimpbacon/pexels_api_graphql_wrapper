import { Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Example {
  @Field()
  description: string;
}

@Resolver(Example)
export class ExampleResolver {
  @Query(() => Example)
  async example() {
    return {
      description: "Example return ",
    };
  }
}
