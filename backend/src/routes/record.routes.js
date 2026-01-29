import { Router } from "express";
import { verifyJWT} from "../middlewares/auth.middleware.js";
import { createRecord, deleteRecord, getRecordsByClusture ,updateRecord} from "../controllers/recordController.js";

const router= Router({ mergeParams: true });

 router.route('/add').post(verifyJWT,createRecord);
 router.route('/').get(verifyJWT,getRecordsByClusture)
 router.route('/:recordId').put(verifyJWT,updateRecord);
 router.route("/:recordId").delete(verifyJWT,deleteRecord);
 export default router;

