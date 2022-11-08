import {Request, Response} from "express";
import {validationResult} from "express-validator";

import PermissionService from "../services/permissionService";
import {
    HttpResponseBadRequest,
    HttpResponseCreated,
    HttpResponseInternalServerError, HttpResponseNotFound,
    HttpResponseOk
} from "../shared/HttpResponse";
import {IPermission} from "../models/Permission";
import {IErr} from "../shared/Err";
import GroupService from "../services/groupService";

/** Get group list. */
export const getGroups = async (req:Request, res:Response) => {
    const groupServ = new GroupService();

    const result = await groupServ.getGroups();
    if (!result.success) {
        return new HttpResponseInternalServerError(res, [result.err!]);
    }

    const groups = result.data;
    return new HttpResponseOk(res, groups);
};


/** Add permissions to group. */
export const addPermissions = async (req:Request, res:Response) => {
    const gName = req.params.gName;
    const pList = req.body as string[];

    const groupServ = new GroupService();

    const result = await groupServ.addPermissions(gName, pList);
    if (!result.success) {
        return new HttpResponseInternalServerError(res, [result.err!]);
    }

    const group = result.data;
    return new HttpResponseOk(res, group);
};
