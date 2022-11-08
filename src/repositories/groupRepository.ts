import {PrismaClient} from "@prisma/client";

import {IPermission} from "../models/Permission";
import {IResult, ResultOk, ResultError} from "../shared/Result";
import {Err} from "../shared/Err";
import {IGroup} from "../models/Group";
import PermissionService from "../services/permissionService";


export default class GroupRepository {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * Get a group list
     */
    async getGroups(): Promise<IResult<IGroup[]>> {
        let groups = [] as IGroup[];
        groups = await this.prisma.group.findMany({
            include: {
                permissions: true
            }
        }) as IGroup[];
        return new ResultOk<IGroup[]>(groups);
    }

    /**
     * Add permissions to group
     */
    async addPermissions(gName:string, pList: string[]): Promise<IResult<IGroup>> {
        let group = await this.prisma.group.findUnique({where: {name:gName}}) as IGroup;
        if (!group) {
            return new ResultError(
                new Err(`Error - 404|Group not found.`, "groupRepo.addPermissions", `0`)
            );
        }

        const perms = await this.prisma.permission.findMany({
            where: {
                name: { in: pList },
                groups: { none: { name: gName } }
            }
        }) as IPermission[];

        if (perms.length === 0) new ResultOk<IGroup>(group);

        const plist1 = perms.map(p=>{return {name: p.name} });
        group = await this.prisma.group.update({
            where: { name: gName },
            include: { permissions: true },
            data: { permissions: { connect: plist1 } }
        }) as IGroup;

        return new ResultOk<IGroup>(group);
    }
}
