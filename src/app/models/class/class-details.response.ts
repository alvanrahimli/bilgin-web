import { SchoolResponse } from "../shared/school.response";
import { GradeResponse } from "../user/response/grade.response";
import { ClassAssignmentResponse } from "./class-assignment.response";
import { StudentResponse } from "./student.response";
import { TeacherResponse } from "./teacher.response";

export interface ClassDetailsResponse {
    id: string;
    name: string;
    grade: GradeResponse;
    school: SchoolResponse;
    students: StudentResponse[];
    teachers: TeacherResponse[];
    assignments: ClassAssignmentResponse[];
}