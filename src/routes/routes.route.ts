import { Router } from 'express';
import { Vectors } from "../entity/vectors.entity";
import fs from 'fs';
import { predict } from '../controllers/users.controller';
// import { createUser, deleteUser, readUser, updateUser } from '../controllers/users.controller';






const router = Router();

//Rutas de users

router.post("/predict",predict)
// router.get("/user/:id?",readUser );
// router.put("/user/:id",updateUser );
// router.delete("/user/:id", deleteUser);

export default router;
