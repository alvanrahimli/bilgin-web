import { UserBriefResponse } from "../../user/response/user-brief-response";
import { TestResponse } from "./TestResponse";


export interface TestPackageResponse {
    id: string;
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
    tests: TestResponse[];
}
