export const CUSTOMER_ACCESS_TOKEN = `
mutation SignInWithEmailAndPassword(
    $email: String!, 
    $password: String!,
) {
    customerAccessTokenCreate(input: { 
        email: $email, 
        password: $password,
    }) {
        customerAccessToken {
            accessToken
            expiresAt
        }
        customerUserErrors {
            code
            message
        }
    }
}`;

export const CUSTOMER_CREATE = `
mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
        customer {
            firstName
            lastName
            email
            phone
            acceptsMarketing
        }
    customerUserErrors {
            field
            message
            code
        }
    }
}`;
