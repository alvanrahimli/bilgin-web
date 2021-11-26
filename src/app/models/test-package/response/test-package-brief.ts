import { UserBriefResponse } from "../../user/response/user-brief-response";

export interface TestPackageBriefResponse {
    id: string;
    description: string;
    timeLimitSeconds: number;
    price: number;
    visibility: string;
    gradeId: number | null;
    gradeName: string;
    subjectId: string | null;
    subjectName: string;
    paragraphId: string | null;
    paragraphName: string;
    author: UserBriefResponse;
}