import { Address } from "../../shared/address";
import { RoleResponse } from "./role.response";
import { StudentInfoResponse } from "./student-info.response";
import { TeacherInfoResponse } from "./teacher-info.response";

export interface UserResponse {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    points: number;
    address: Address;
    studentInfo: StudentInfoResponse | null;
    teacherInfo: TeacherInfoResponse | null;
    roles: RoleResponse[];
}