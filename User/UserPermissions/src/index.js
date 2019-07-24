import "dotenv/config";
import Hapi from "hapi";
import mongoose from "mongoose";
import { ValidateUser } from "../src/users/index";

mongoose
  .connect("mongodb://localhost:27017/user_management", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 4002,
  host: process.env.IP || "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});

//-----------------------------User Permission Starts-------------------
//Create a new profile
server.route({
  method: "POST",
  path: "/user-permission/validate-user",
  handler: ValidateUser
});
//-----------------------------User Permission Ends---------------------

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
