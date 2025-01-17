export const SHOP_DETAILS = `
    query ShopDetail {
        shop {
        id
        name
        moneyFormat
        description
        brand {
            logo {
            image {
                src
            }
            }
        }
        }
    }
  `;
