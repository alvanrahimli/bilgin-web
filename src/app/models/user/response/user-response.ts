import { Address } from "../../shared/address";

export interface UserResponse {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    points: number;
    address: Address;
}