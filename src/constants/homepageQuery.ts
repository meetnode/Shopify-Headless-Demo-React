export const GET_HOMEPAGE_BANNER = `
query {
    metaobject(id: "gid://shopify/Metaobject/98672902401") {
        id
        handle
        type
        fields {
            key
            value
            type
            references(first: 10) {
                nodes {
                ... on MediaImage {
                    id
                    image {
                        src
                        }
                    }
                }
            }
        }
    }
}`;
