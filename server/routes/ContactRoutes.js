import { Router } from "express";
import {searchContacts,getAllContacts,getContactsForList} from "../controllers/ContactController.js";
import {verifyToken} from "../middlewares/AuthMiddleware.js";


const contactRoutes = Router();

contactRoutes.post("/search",verifyToken, searchContacts);
contactRoutes.get("/get-contacts-forDm",verifyToken, getContactsForList);
contactRoutes.get("/get-all-contacts",verifyToken, getAllContacts);

export default contactRoutes;