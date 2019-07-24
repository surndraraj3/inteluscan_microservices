import "dotenv/config";
import Hapi from "hapi";
import mongoose from "mongoose";
import {
  CreateUserGroup,
  AddGroupUsers,
  ListAllUserGroups,
  UpdateUserGroupInfoById,
  DeleteUserGroupById
} from "../src/user-group/index";

mongoose
  .connect("mongodb://localhost:27017/user_management", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 4001,
  host: process.env.IP || "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});

//----------------Create user group starts-------------------
server.route({
  method: "GET",
  path: "/",
  handler: function(request, reply) {
    return reply.response("Hello, world!");
  }
});
//------------------------------CRUD USER GROUP STARTS-------------------
//Create user group
server.route({
  method: "POST",
  path: "/user-group/create-user-group",
  handler: CreateUserGroup
});
//List all user groups
server.route({
  method: "GET",
  path: "/user-group/list-all-user-groups",
  handler: ListAllUserGroups
});
//Update group details by group id
server.route({
  method: "PUT",
  path:"/user-group/update-user-group-by-id/{userGroupId}",
  handler: UpdateUserGroupInfoById
})
//Delete user group by group id
server.route({
  method: "DELETE",
  path:"/user-group/delete-user-group-by-id/{userGroupId}",
  handler: DeleteUserGroupById
})

server.route({
  method: "POST",
  path: "/user-group/add-users/{group_id}",
  handler: AddGroupUsers
});

//----------------Create user group ends--------------

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
// console.log("Welcome to node js web project.");

// console.log(process.env.MY_SECRET);
