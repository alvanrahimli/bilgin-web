import { MatchingResponse } from "./MatchingResponse";
import { TestChoiceResponse } from "./TestChoiceResponse";


export interface TestResponse {
    id: string;
    question: string;
    awardPoints: number;
    help: string;
    testType: string;
    testChoices: TestChoiceResponse[];
    matchings: MatchingResponse[];
}
