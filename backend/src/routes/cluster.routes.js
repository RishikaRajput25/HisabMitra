import { Router } from "express";
import { verifyJWT} from "../middlewares/auth.middleware.js";
import { createCluster ,deleteCluster,getClusters,updateCluster} from "../controllers/cluster.controller.js";

const router= Router();
router.route('/').get(verifyJWT,getClusters);
router.route('/create').post(verifyJWT,createCluster);
router.route('/:id').put(verifyJWT,updateCluster);
router.route('/:id').delete(verifyJWT, deleteCluster);
export default router;