import { ClassResponse } from "../user/response/class.response";

export interface TeacherClassResponse {
    isLead: boolean;
    class: ClassResponse
}