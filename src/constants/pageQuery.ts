export const GET_PAGE_BY_HANDLE = `
  query GetPage($handle: String!) {
    pageByHandle(handle: $handle) {
      id
      body
      bodySummary
      seo {
        title
        description
      }
    }
  }
`;
