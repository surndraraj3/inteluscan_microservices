import UserProfile from "./model";
import jwt from "jsonwebtoken";
import "dotenv/config";

//Add a new user or register user
export const AddNewProfile = async (request, h) => {
  try {
    const chkUserExist = await UserProfile.find({
      user_name: request.payload.user_name
    });
    if (chkUserExist.length >= 1)
      return h.response({ Message: "Username exists already in system" });
    else {
      const nwPrflPyld = new UserProfile(request.payload);
      const savPrflPyld = await nwPrflPyld.save();
      return h.response({
        Message: "User registered successfully " + savPrflPyld.user_name,
        status: 200
      });
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//List of users
export const ListOfUsers = async (request, h) => {
  try {
    const lstAllUsers = await UserProfile.find({}).select(
      "-passcode -createdAt -updatedAt -__v"
    );
    return h.response(lstAllUsers);
    // var authToken = request.headers.authorization;
    // if (!authToken)
    //   return h.response({
    //     Message: "No token provided.",
    //     status: 401
    //   });
    //   const validateToken = await VerifyToken(authToken.split(' ')[1]);
    // if (
    //   validateToken.name === "JsonWebTokenError" ||
    //   validateToken.name === "TokenExpiredError"
    // ) {
    //   return h.response({ Message: validateToken.message });
    // } else {
    //   const lstAllUsers = await UserProfile.find({}).select(
    //     "-passcode -createdAt -updatedAt -__v"
    //   );
    //   return h.response(lstAllUsers);
    // }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Fetch User based on user id
//check 
export const UserPersonalInfoById = async (request, h) => {
  try {
    const lstAllUsers = await UserProfile.find({
      _id: request.params.user_profile_id
    }).select("-passcode -createdAt -updatedAt -__v");
    return h.response(lstAllUsers);
    // var authToken = request.headers.authorization;
    // if (!authToken)
    //   return h.response({
    //     Message: "No token provided.",
    //     status: 401
    //   });
    //   //Bearer Token spliting
    // const validateToken = await VerifyToken(authToken.split(' ')[1]);
    // if (
    //   validateToken.name === "JsonWebTokenError" ||
    //   validateToken.name === "TokenExpiredError"
    // ) {
    //   return h.response({ Message: validateToken.message });
    // } else {
    //   const lstAllUsers = await UserProfile.find({
    //     _id: request.params.user_profile_id
    //   }).select("-passcode -createdAt -updatedAt -__v");
    //   return h.response(lstAllUsers);
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

//Update Contactus based on ID
export const UpdateUsersProfileById = async (request, h) => {
  try {
    var result = await UserProfile.findByIdAndUpdate(
      request.params.id,
      request.payload,
      { new: true }
    );
    return h.response({
      Message: "User updated successfully " + result.user_name,
      status: 200
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Delete User profile based on id
export const DeleteUserProfileById = async (request, h) => {
  try {
    const result = await UserProfile.deleteOne({ _id: request.params.id });
    return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};