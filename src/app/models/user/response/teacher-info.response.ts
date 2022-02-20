import { SchoolResponse } from "../../shared/school.response";

export interface TeacherInfoResponse {
    id: string;
    school: SchoolResponse | null;
}