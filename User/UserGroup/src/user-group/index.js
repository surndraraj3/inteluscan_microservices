import UserGroup from "./model";
import jwt from "jsonwebtoken";
import "dotenv/config";

//Create user group
export const CreateUserGroup = async (request, h) => {
  try {
    const chkUserGroupExist = await UserGroup.find({
      group_name: request.payload.group_name
    });
    // console.log("User Exists", chkUserGroupExist.length);
    if (chkUserGroupExist.length >= 1)
      return h.response({
        Message: request.payload.group_name + " already exists in system"
      });
    else {
      const reqPayload = new UserGroup(request.payload);
      const savePayload = await reqPayload.save();
      //   console.log("CreateUserGroup");
      return h.response({
        Message: savePayload.group_name + " created successfully ",
        status: 200
      });
    }
    // var authToken = request.headers.authorization;
    // if (!authToken)
    //   return h.response({
    //     Message: "No token provided.",
    //     status: 401
    //   });
    // //Bearer Token spliting
    // const validateToken = await VerifyToken(authToken.split(" ")[1]);
    // if (
    //   validateToken.name === "JsonWebTokenError" ||
    //   validateToken.name === "TokenExpiredError"
    // ) {
    //   return h.response({ Message: validateToken.message });
    // } else {
    //   const chkUserGroupExist = await UserGroup.find({
    //     group_name: request.payload.group_name
    //   });
    //   // console.log("User Exists", chkUserGroupExist.length);
    //   if (chkUserGroupExist.length >= 1)
    //     return h.response({
    //       Message: request.payload.group_name + " already exists in system"
    //     });
    //   else {
    //     const reqPayload = new UserGroup(request.payload);
    //     const savePayload = await reqPayload.save();
    //     //   console.log("CreateUserGroup");
    //     return h.response({
    //       Message: savePayload.group_name + " created successfully ",
    //       status: 200
    //     });
    //   }
    // }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//List all users group
export const ListAllUserGroups = async (request, h) => {
  try {
    const lstAllUsers = await UserGroup.find({}).select(
      " -createdAt -updatedAt -__v"
    );
    return h.response(lstAllUsers);
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Update user group information based on user group id
export const UpdateUserGroupInfoById = async (request, h) => {
  try {
    const updateUserGroup = await UserGroup.updateOne(
      { _id: request.params.userGroupId },
      request.payload,
      { new: true }
    );
    return h.response({
      Message: request.payload.group_name + " is updated sucessfully",
      status: 200
    });
  } catch (error) {
    return h.response(error).code(500);
  }
}

//Delete User group by id
export const DeleteUserGroupById = async (request, h) => {
  try {
    const userGroupName = await UserGroup.find({ _id: request.params.userGroupId }).select("group_name -_id");   
    const result = await UserGroup.deleteOne({ _id: request.params.userGroupId });
    return h.response({
      Message: userGroupName[0].group_name + " is deleted sucessfully",
      status: 200
    });
  } catch (error) {
    return h.response(error).code(500)
  }
}

//Add group users
export const AddGroupUsers = async (request, h) => {
  try {
    const usrGrpId = request.params.group_id;
    const userGroupName = await UserGroup.find({ _id: usrGrpId }).select("group_name -_id");   
    const addUsrs = await UserGroup.updateOne(
      { _id: usrGrpId },
      { $push: { group_users: request.payload } }
    );
    return h.response({
      Message: userGroupName[0].group_name + " is added users sucessfully",
      status: 200
    });
    // var authToken = request.headers.authorization;
    // if (!authToken)
    //   return h.response({
    //     Message: "No token provided.",
    //     status: 401
    //   });
    // //Bearer Token spliting
    // const validateToken = await VerifyToken(authToken.split(" ")[1]);
    // if (
    //   validateToken.name === "JsonWebTokenError" ||
    //   validateToken.name === "TokenExpiredError"
    // ) {
    //   return h.response({ Message: validateToken.message });
    // } else {
    //   const usrGrpId = request.params.group_id;
    //   const addUsrs = await UserGroup.update(
    //     { _id: usrGrpId },
    //     { $push: { group_users: request.payload } }
    //   );
    //   return h.response(addUsrs);
    // }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Verify JSON Token
const VerifyToken = async tokn => {
  try {
    var decodedToken = jwt.verify(tokn, process.env.secret);
    return decodedToken;
  } catch (err) {
    return { name: err.name, message: err.message };
  }
};


