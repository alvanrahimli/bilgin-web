import { SchoolResponse } from "../../shared/school.response";
import { GradeResponse } from "./grade.response";

export interface ClassResponse {
    id: string;
    name: string;
    grade: GradeResponse;
    school: SchoolResponse;
}