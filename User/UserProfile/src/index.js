import "dotenv/config";
import Hapi from "hapi";
import mongoose from "mongoose";
import { AddNewProfile, ListOfUsers, UserPersonalInfoById, UpdateUsersProfileById, DeleteUserProfileById } from "../src/users/index";

mongoose
  .connect("mongodb://localhost:27017/user_management", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 4000,
  host: process.env.IP || "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});

//-----------------------------Profile Starts-------------------
//Create a new profile
server.route({
  method: "POST",
  path: "/user-profile/create-new-profile",
  handler: AddNewProfile
});

//List of users
server.route({
  method: "GET",
  path: "/user-profile/list-users",
  handler: ListOfUsers
});

//User info based on user id
server.route({
  method: 'GET',
  path:"/user-profile/user-profile-by-id/{user_profile_id}",
  handler: UserPersonalInfoById
})

//Update USer profile
server.route({
  method: 'PUT',
  path:"/user-profile/update-profile/{id}",
  handler: UpdateUsersProfileById
})

//Delete USer profile
server.route({
  method: 'DELETE',
  path:"/user-profile/delete-profile/{id}",
  handler: DeleteUserProfileById
})

//-----------------------------Profile Ends---------------------

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
