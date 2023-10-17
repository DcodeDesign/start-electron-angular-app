import { BranchStatusEnum } from "../enums/branch-status.enum";

export interface IBranch {
    uuid: string;
    status: BranchStatusEnum;
    id: string;
    text: string;
    name: string;
    description: string;
    link: string;
    isNew?: boolean;
  }