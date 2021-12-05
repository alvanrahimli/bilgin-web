
export interface TestAnswerRequest {
    testId: string;

    choiceId: string;   // for multiple choice questions
    matchings: MatchingAnswerRequest[]; // for matching questions
    text: string;   // for open ended questions
}

export interface MatchingAnswerRequest {
    choiceId: string;
    matchedChoiceId: string;
}