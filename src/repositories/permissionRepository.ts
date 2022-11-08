import {PrismaClient} from "@prisma/client";

import {Pool} from "mysql2/promise";
import {IPermission} from "../models/Permission";
import {IResult, ResultOk, ResultError} from "../shared/Result";
import {Err} from "../shared/Err";
import {IOutputResult} from "../shared/SqlResult";

import db from "../shared/Database";


export default class PermissionRepository
{
    private readonly pool:Pool;
    private readonly prisma: PrismaClient;

    constructor(pool:Pool) {
        this.pool = pool;
        this.prisma = new PrismaClient();
    }

    /**
     * Get a permission list
     */
    async getPermissions(): Promise<IResult<IPermission[]>> {
        let permissions = [] as IPermission[];
        permissions = await this.prisma.permission.findMany() as IPermission[];
        return new ResultOk<IPermission[]>(permissions);
    }

    /** Create a permission */
    async createPermission(p:IPermission): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        const pFound = await this.prisma.permission.findUnique({where:{name:p.name}});
        if (pFound) {
            return new ResultError(
                new Err(`Error - 400|Permission name in use.`, "repo.createPermission", `0`)
            );
        }

        permission = await this.prisma.permission.create({
           data: p
        }) as IPermission;

        return new ResultOk(permission);
    }

    /** Delete a permission */
    async deletePermission(pName:string): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        const pFound = await this.prisma.permission.findUnique({where:{name:pName}});
        if (!pFound) {
            return new ResultError(
                new Err(`Error - 404|Permission not found.`, "repo.deletePermission", `0`)
            );
        }

        permission = await this.prisma.permission.delete({where:{name:pName}}) as IPermission;
        return new ResultOk(permission);
    }

    /** Get a permission */
    async getPermission(pName:string): Promise<IResult<IPermission>> {
        const pFound = await this.prisma.permission.findUnique({where:{name:pName}});
        if (!pFound) {
            return new ResultError(
                new Err(`Error - 404|Permission not found.`, "repo.getPermission", `0`)
            );
        }
        return new ResultOk(pFound as IPermission);
    }

    /** Update a permission */
    async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        let pFound = await this.prisma.permission.findUnique({where:{name:pName}});
        if (!pFound) {
            return new ResultError(
                new Err(`Error - 404|Permission not found.`, "repo.updatePermission", `0`)
            );
        }

        if (pName !== p.name) {
            pFound = await this.prisma.permission.findUnique({where:{name:p.name}});
            if (pFound) {
                return new ResultError(
                    new Err(`Error - 400|Permission name in use.`, "repo.updatePermission", `0`)
                );
            }
        }

        permission = await this.prisma.permission.update({
            where:{name:pName},
            data: p
        }) as IPermission;

        return new ResultOk(permission);
    }
}
