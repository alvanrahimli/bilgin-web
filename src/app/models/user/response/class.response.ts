import { GradeResponse } from "./grade.response";

export interface ClassResponse {
    id: string;
    name: string;
    grade: GradeResponse;
}