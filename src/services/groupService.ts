
import {IResult, ResultError} from "../shared/Result";
import {IPermission} from "../models/Permission";
import PermissionRepository from "../repositories/permissionRepository";
import GroupRepository from "../repositories/groupRepository";
import {IGroup} from "../models/Group";

export default class GroupService {
    private readonly groupRepo: GroupRepository;

    constructor() {
        this.groupRepo = new GroupRepository();
    }

    /**
     * Get a group list
     */
    async getGroups(): Promise<IResult<IGroup[]>> {
        try {
            return await this.groupRepo.getGroups();
        } catch (err) {
            return ResultError.getDefaultError<IGroup[]>(err,`service.getGroups`);
        }
    }

    /**
     * Add permissions to group
     */
    async addPermissions(gName:string, pList: string[]): Promise<IResult<IGroup>> {
        try {
            return await this.groupRepo.addPermissions(gName, pList);
        } catch (err) {
            console.log(err);
            return ResultError.getDefaultError<IGroup>(err,`groupService.addPermissions`);
        }
    }
}
