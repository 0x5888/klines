// Create a new API endpoint handler in the appropriate directory for your project:
// Vercel: ./api/<endpoint-name>.{js|ts}
// Nextjs: ./pages/api/<endpoint-name>.{js|ts} or ./src/pages/api/<endpoint-name>.{js|ts}

import { ApolloServer } from "@saeris/apollo-server-vercel";

var axios = require('axios');
var data = JSON.stringify({
  "operationName": "GetStatistics",
  "variables": {
    "ammAddress": "0x5f714B5347f0b5de9F9598E39840E176CE889b9c"
  },
  "query": "query GetStatistics($ammAddress: String!) {\n  getStatistics(ammAddr: $ammAddress) {\n    volume24h\n    priceChangeRate24h\n    priceHigh24h\n    priceLow24h\n    __typename\n  }\n}\n"
});

var config = {
  method: 'post',
  url: 'https://4b3vdz2hdjho7gzuo4wl2jgsoe.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  headers: { 
    'X-Api-Key': 'da2-lq3fkypifbfp3mzfdkac26avzm', 
    'content-type': 'application/json'
  },
  data : data
};




// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Query { 
      ammAddr: String!
      lastTradePriceUsd: String
      volume24h: String
      priceChangeRate24h: String
      priceHigh24h: String
      priceLow24h: String
      timestamp: Int!
      blockNumber: Int!
    }`;



const getData = ()=>{
  let data = ""
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    data = JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  return  data
}


// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ammAddr: () =>"address",
    lastTradePriceUsd: () => "getData()",
    volume24h: () => "getData()",
    priceChangeRate24h: () => "getData()",
    priceHigh24h: () => "getData()",
    priceLow24h: () => "getData()",
    timestamp: () => 1,
    blockNumber: () => 1
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true
});

export default server.createHandler();

// You should now be able to access your new endpoint from via::
// http://localhost:3000/api/<endpoint-name>