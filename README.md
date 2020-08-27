# Serverless Authentication + Authorization with Dgraph & Auth0 Webinar Resources (August 27th, 2020)



## Video

Video will be linked here after the webinar.

## Prerequesites

### Dgraph
Fastest way to get started with Dgraph is to create a free Slash GraphQL account: [click here](https://slash.dgraph.io).

### Auth0

Sign up for a free Auth0 account here: https://auth0.com

## Schema 
[Starting Schema](https://github.com/dgraph-io/auth-webinar/blob/master/schema.graphql)

[Finished Schema](https://github.com/dgraph-io/auth-webinar/blob/master/finished-schema.graphql)

## Mutations (Data)
[Mutation (Users + Todos)](https://github.com/dgraph-io/auth-webinar/blob/master/sampleData.graphql)

## Auth0
This rule is used to inject the claims needed by Dgraph into the JWT token created by Auth0.

```js
function (user, context, callback) {
  const namespace = "https://dgraph.io/jwt/claims";
  context.idToken[namespace] =
    {
      'USER': user.email,
    };
  
  return callback(null, user, context);
}
```

## Resources
### Intro to JWT - JWT.io
https://jwt.io/introduction/

### Intro to Dgraph Schema - Dgraph.io
https://dgraph.io/blog/post/slash-intro-to-schema/
