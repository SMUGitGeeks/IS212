export interface RoleListingsType {
    rl_close: string;
    rl_creator: number;
    rl_desc: string;
    rl_id: number;
    rl_open: string;
    rl_ts_create: string;
    role_description: string;
    role_id: number;
    role_name: string;
    role_status: string;
    skill_match: number;
}

export interface ActionType {
    type: any;
    payload: any;
}

export interface SortPayloadType {
    direction: String;
}

export interface FilterRoleListingsByRoleIdPayloadType {
    roleIds: number[];
}

export interface GetStaffSkillsByStaffIdPayloadType {
    staffId: number;
}

export interface GetApplicationsByStaffIdPayloadType {
    rl_id: number;
    staffId: number;
    role_app_status: string;
    app_ts: string;
    role_name: string;
}

export interface GetRoleSkillsByRoleIdPayloadType {
    roleId: number;
}

export interface GetRoleListingsByHRPayLoadType {
    staffId: number;
}

export interface PostApplicationPayloadType {
    staff_id: number;
    rl_id: number;
    role_app_status: string;
}

export interface UploadApplicationPayloadType {
    staff_id: number;
    rl_id: number;
    role_app_status: string;
}

export interface UpdateRoleListingLoadType {
    rl_close: string;
    rl_desc: string;
    rl_open: string;
    role_id: number;
    rl_source: number,
    rl_updater: number,
}