import client from "../config/storefront";
import { GET_HOMEPAGE_BANNER } from "../constants/homepageQuery";

const frontpageApi = {
  async banner() {
    const response = await client.request(GET_HOMEPAGE_BANNER);
    const data = response.data;

    const mediaField = data.metaobject.fields.find(
      (field: any) => field.key === "media"
    );
    const titleField = data.metaobject.fields.find(
      (field: any) => field.key === "title"
    );
    const subTitleField = data.metaobject.fields.find(
      (field: any) => field.key === "subtitle"
    );

    const media = mediaField.references.nodes;

    const mediaDetails = await Promise.all(
      media.map(async (mediaItem: any) => {
        const mediaId = mediaItem.id.split("/").pop();
        console.log(mediaId, "Extracted Media ID");

        return {
          id: mediaId,
          src: mediaItem.image.src,
        };
      })
    );
    return { mediaDetails, titleField, subTitleField };
  },
};

export default frontpageApi;
