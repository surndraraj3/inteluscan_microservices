import UserPermission from "./model";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import "dotenv/config";

//Validate users whether exist in system or not
//Generate a new jwt token
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

//Forget password  
//Based on user request email on sucess send an email link
export const ForgetPassword = async (request, h) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'yoofootech@gmail.com',
        pass: 'P@ssw0rd149'
      }
    });
    
    var mailOptions = {
      from: 'yoofootech@gmail.com',
      to: request.params.email,
      subject: 'Yoofoo - Forget Password',
      text: process.env.email_link+'/change_password'
    };    
    const send_email = await transporter.sendMail(mailOptions);
    return h.response({Message: 'Email sent successfully'})
  } catch (error) {
    return h.response(error).code(500);
  }
} 