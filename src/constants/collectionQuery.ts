export const GET_ALL_COLLECTIONS = `
    query {
        collections(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                    description
                    image {
                        url
                        altText
                    }
                    products(first: 5) {
                        edges {
                            node {
                                id
                                title
                                description
                                handle
                                images(first: 1) {
                                    edges {
                                        node {
                                            src
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`