import { Arg, Args, Query, Resolver } from "type-graphql";
import { default as axios } from "axios";
import {
  PhotoResource,
  GetPhotoArgs,
  PhotoArrayResponse,
  PhotosArgs,
} from "../../utils/graphqlTypes";
import { PHOTO_BASE_URL, CURATED_PHOTOS } from "../../utils/urls";

@Resolver()
export class PhotoResolver {
  @Query(() => PhotoResource, { nullable: true })
  async getPhoto(
    @Args()
    { id }: GetPhotoArgs
  ) {
    try {
      const photo = await axios.get(`${PHOTO_BASE_URL}/photos/${id}`, {
        headers: {
          Authorization: process.env.API_KEY,
        },
      });
      return photo?.data;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  @Query(() => PhotoArrayResponse)
  async getCuratedPhotos(
    @Args()
    { page, per_page }: PhotosArgs
  ) {
    try {
      const curatedPhotos = await axios.get(CURATED_PHOTOS, {
        headers: {
          Authorization: process.env.API_KEY,
        },
        params: {
          page,
          per_page,
        },
      });

      return curatedPhotos.data;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
}