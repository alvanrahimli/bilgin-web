import { AssignmentResponse } from "../../assignment/assignment.response";
import { UserBriefResponse } from "../../user/response/user-brief-response";
import { TestResponse } from "./TestResponse";


export interface TestPackageResponse {
    id: string;
    isAssignment: boolean;
    description: string;
    timeLimitSeconds: number;
    price: number;
    visibility: string;
    gradeId: number;
    gradeName: string;
    subjectId: string;
    subjectName: string;
    paragraphId: string;
    paragraphName: string;
    author: UserBriefResponse;
    assignment: AssignmentResponse;
    tests: TestResponse[];
}
