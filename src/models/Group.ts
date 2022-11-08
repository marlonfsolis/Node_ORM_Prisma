import {check} from "express-validator";
import {IPermission} from "./Permission";

export interface IGroup {
    name: string;
    description: string
    permissions: IPermission[]
}

/**
 * Validate permission input param
 * */
// export const permissionValidator = () => [
//     check(`name`).exists().isLength({min:3, max:100}),
//     check(`description`).optional().isLength({min:0, max:1000})
// ];
