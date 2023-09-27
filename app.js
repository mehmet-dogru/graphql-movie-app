const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const { connectDB } = require("./helpers/db");

require("dotenv").config();
connectDB();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(8080, () => {
  console.log("Server running is port 8080");
});
