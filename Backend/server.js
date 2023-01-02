let con = console.log;

const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling unCaught Exceptions
process.on("uncaughtException", (error) => {
  con(`Error: ${error}`);
  con("\n------------Shutting Down The Main Server------------")
  process.exit(1)
})

//Config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  con(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
  con(`Error: ${error}`);
  con("\n------------Shutting Down The Main Server------------")
  server.close(() => {
    process.exit(1)
  })
})