import { PaidPeriodDto } from "./PaidPeriodDto";
import { RoleDto } from "./RoleDto";


export interface UserFullDto{
     id: number;
     firstName: string;
     lastName: string;
     email: string;
     paidPeriod: PaidPeriodDto;
     roles: Set<RoleDto>;
}