import { Router } from "express";
import {getContactsForList, searchContacts} from "../controllers/ContactController.js";
import {verifyToken} from "../middlewares/AuthMiddleware.js";


const contactRoutes = Router();

contactRoutes.post("/search",verifyToken, searchContacts);
contactRoutes.get("/get-contacts-forDm",verifyToken, getContactsForList);

export default contactRoutes;