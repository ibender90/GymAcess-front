import { PaidPeriodDto } from "./PaidPeriodDto";

export interface UserWithPaidPeriodDto{
     id: number;
     firstName: string;
     lastName: string;
     email: string;
     paidPeriod?: PaidPeriodDto;
}