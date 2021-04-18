import { ArgsType, Field, Int, ObjectType } from "type-graphql";
import { IsIn, Max } from "class-validator";
import { LOCALE, ORIENTATION, SIZE } from "./supportedArgs";

@ObjectType()
class SrcType {
  @Field()
  original: string;

  @Field()
  large: string;

  @Field()
  large2x: string;

  @Field()
  medium: string;

  @Field()
  small: string;

  @Field()
  portrait: string;

  @Field()
  landscape: string;

  @Field()
  tiny: string;
}

@ObjectType()
export class PhotoResource {
  @Field()
  id: number;

  @Field()
  width: number;

  @Field()
  height: number;

  @Field()
  url: string;

  @Field()
  photographer: string;

  @Field()
  photographer_url: string;

  @Field()
  photographer_id: number;

  @Field()
  avg_color: string;

  @Field()
  src: SrcType;
}

@ObjectType()
export class PhotoArrayResponse {
  @Field(() => [PhotoResource])
  photos: PhotoResource[];

  @Field()
  page: number;

  @Field()
  per_page: number;

  @Field()
  total_results: number;

  @Field()
  prev_page: number;

  @Field()
  next_page: number;
}

@ArgsType()
export class GetPhotoArgs {
  @Field({ nullable: false })
  id: number;
}

@ArgsType()
export class PhotosArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 15 })
  @Max(80)
  per_page?: number;
}

@ArgsType()
export class PhotoSearchArgs extends PhotosArgs {
  @Field({ nullable: false })
  query: string;

  @Field({ nullable: true })
  @IsIn(ORIENTATION)
  orientation: string;

  @Field({ nullable: true })
  @IsIn(SIZE)
  size: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  @IsIn(LOCALE)
  locale: string;
}
