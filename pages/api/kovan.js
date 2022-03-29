import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
const axios = require('axios');


// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res)
  
  // GetStatistics
  var config = {
    method: 'post',
    url: 'https://4b3vdz2hdjho7gzuo4wl2jgsoe.appsync-api.ap-southeast-1.amazonaws.com/graphql',
    headers: { 
      'X-Api-Key': 'da2-lq3fkypifbfp3mzfdkac26avzm', 
      'content-type': 'application/json'
    },
    data : req.body
  };

  let response = await axios(config)
  // Rest of the API logic
  res.json(response.data)
}