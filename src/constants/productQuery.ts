export const GET_ALL_PRODUCTS = `
    query GetProducts($first: Int!, $after: String) {
            products(first: $first, after: $after) {
                edges {
                    cursor
                    node {
                        id
                        title
                        description
                        descriptionHtml
                        images(first:10) {
                            edges {
                                cursor
                                node {
                                    id
                                    src
                                }
                            }
                        }
                        variants(first: 99) {
                            edges {
                                node {
                                    id
                                    availableForSale
                                    compareAtPrice {
                                        amount
                                        currencyCode
                                    }
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    quantityAvailable
                                    title
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
`;

export const GET_PRODUCT_BY_ID = `
    query ProductById($productId: ID!) {
        product(id: $productId) {
            id
            title
            productType
            description
            descriptionHtml
            images(first: 10) {
                edges {
                    node {
                        id
                        src
                    }
                }
            }
            variants(first: 10) {
                edges {
                    node {
                        id
                        title
                        image {
                            id
						    src
                        }
                        quantityAvailable
                        compareAtPrice {
                            amount
                            currencyCode
                        }
                        price {
                            amount
                            currencyCode
                        }
                    }
                }
            }
            metafield(namespace: "custom", key: "delivery_estimated") {
                id
                namespace
                key
                value
            }
        }
    }
`
