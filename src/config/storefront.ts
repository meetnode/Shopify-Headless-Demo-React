import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: import.meta.env.VITE_STORE_DOMAIN,
  apiVersion: "2024-10",
  publicAccessToken: import.meta.env.VITE_PRIVATE_ACCESS_TOKEN,
});

export default client;
