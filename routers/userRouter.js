import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

const userRouter = express.Router();


//userDetail에서 넘어가지 않고 있음 -> editprofile이 아래에 있기 때문 /:id 뒤에 붙는형식으로 지정되어야 함
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.users, users);
userRouter.get(routes.userDetail(), userDetail);



export default userRouter;