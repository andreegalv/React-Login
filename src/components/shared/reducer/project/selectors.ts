import { ISharedState } from "../types";

export const getCurrentCustomerId = (state:ISharedState) => state.project.customerId;
export const getCurrentDepartmentId = (state:ISharedState) => state.project.departmentId;
export const getCurrentProjectId = (state:ISharedState) => state.project.projectId;