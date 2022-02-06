import { SchoolResponse } from "../../shared/school.response";
import { ClassResponse } from "./class.response";

export interface StudentInfoResponse {
    id: string;
    interests: string;
    school: SchoolResponse | null;
    studentInfoClasses: ClassResponse[] | null;
}