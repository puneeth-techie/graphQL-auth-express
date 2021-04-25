# Implementing User registration and authentication mechanism along with JWT access token and refresh token mechanism for the authenticated user using [**Node**](https://nodejs.org/en/), [**Express**](https://expressjs.com/), [**GraphQL**](https://en.wikipedia.org/wiki/GraphQL)

## About [GraphQL](https://graphql.org/)

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## Libraries Used:

1. [apollo-server-express](https://www.npmjs.com/package/apollo-server-express)
2. [graphql](https://www.npmjs.com/package/graphql)
3. [express](https://www.npmjs.com/package/express)
4. [mongoose](https://www.npmjs.com/package/mongoose)
5. [bcryptjs](https://www.npmjs.com/package/bcryptjs)
6. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
7. [joi](https://www.npmjs.com/package/joi)
8. [nodemon](https://www.npmjs.com/package/nodemon)
9. [dotenv](https://www.npmjs.com/package/dotenv)

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

You can also install and setup Babel if you would like.

## Execution steps

### Install Dependencies

```
npm install
```

### Create a .env file in the root level directory and configure the below environments

```
NODE_ENV = development
PORT = 4000
MONGODB_URL = mongodb://localhost/DB_NAME or you can use cluster url
ACCESS_TOKEN = yourAccessToken_String
REFRESH_TOKEN = yourRefreshToken_String
```

### Run

```
npm run dev
```

## License

MIT License

Copyright (c) 2021 Puneeth P Gowda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
