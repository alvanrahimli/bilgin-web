
export interface TestAnswerRequest {
    testId: string;
    testType: string;
    choiceId: string;
    matchings: MatchingAnswerRequest[];
    text: string;
}

export interface MatchingAnswerRequest {
    choiceId: string;
    matchedChoiceId: string;
}