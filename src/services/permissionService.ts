import {Pool} from "mysql2/promise";

import {IResult, ResultError} from "../shared/Result";
import {IPermission} from "../models/Permission";
import PermissionRepository from "../repositories/permissionRepository";

export default class PermissionService
{
    private readonly pool: Pool;
    private readonly permRepo:PermissionRepository;

    constructor(pool:Pool) {
        this.pool = pool;
        this.permRepo = new PermissionRepository(pool);
    }

    /**
     * Get a permission list
     */
    async getPermissions(): Promise<IResult<IPermission[]>> {
        try {
            return await this.permRepo.getPermissions();
        } catch (err) {
            return ResultError.getDefaultError<IPermission[]>(err,`permissionService.getPermissions`);
        }
    }


    /**
     * Create a permission
     */
    async createPermission(p:IPermission): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.createPermission(p);
        } catch (err) {
            return ResultError.getDefaultError<IPermission>(err,`permissionService.createPermission`);
        }
    }


    /**
     * Delete a permission
     */
    async deletePermission(pName:string): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.deletePermission(pName);
        } catch (err) {
            return ResultError.getDefaultError<IPermission>(err,`permissionService.deletePermission`);
        }
    }

    /**
     * Get a permission
     */
    async getPermission(pName:string): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.getPermission(pName);
        } catch (err) {
            return ResultError.getDefaultError<IPermission>(err,`permissionService.getPermission`);
        }
    }

    /**
     * Update a permission
     */
    async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.updatePermission(pName, p);
        } catch (err) {
            return ResultError.getDefaultError<IPermission>(err,`permissionService.getPermission`);
        }
    }
}
