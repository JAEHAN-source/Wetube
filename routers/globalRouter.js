import express from "express";
import routes from "../routes"
import { getJoin, postJoin, logout, getLogin, postLogin } from "../controllers/userController";
import { search, home } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);


export default globalRouter;
