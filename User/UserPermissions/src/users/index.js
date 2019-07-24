import UserPermission from "./model";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ValidateUser = async (request, h) => {
  try{
    var result = await UserPermission.find(request.payload);   
    if (result.length > 0) {
      var token = jwt.sign({ id: request.payload.user_name }, process.env.secret, {
        expiresIn: '1h' 
      });
      return h.response({ Message: "Success", token: token }).code(200);
    } else return h.response({ Message: "Invalid login details" });
  }catch(error){
    return h.response(error).code(500)
  }
}