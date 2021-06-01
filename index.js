const sequelize = require("./database");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();
app.use(
  "/graphql",
  graphqlHTTP(async (request, response, graphQLParams) => {
    return {
      schema,
      graphiql: true,
      context: {
        req: request,
      },
    };
  })
);
//sequelize.sync(); /// to create tables if not exist

app.listen(3000, () => {
  console.log("Linstening to port 3000...");
});

// async function testDbConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("connected ..");
//   } catch (error) {
//     console.log("unable to connect to DB ..", error);
//   }
// }
// testDbConnection();
