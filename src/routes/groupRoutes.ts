import {Router} from "express";

import * as PermissionController from "../controllers/permissionController";
import * as GroupController from "../controllers/groupController";
// import {permissionValidator} from "../models/Permission";


const router = Router();

/* GET groups. */
router.get('/', GroupController.getGroups);

/* POST groups-permissions. */
router.post('/permissions/:gName', GroupController.addPermissions);

export default router;
