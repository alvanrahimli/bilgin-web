export interface Author {
    id: string;
    fullName: string;
    role: string;
}

export interface TestChoice {
    id: string;
    name: string;
    content: string;
    imageUrl: string;
}

export interface Matching {
    id: string;
    name: string;
    content: string;
}

export interface Test {
    id: string;
    question: string;
    awardPoints: number;
    help: string;
    imageUrl: string;
    testType: string;
    testChoices: TestChoice[];
    matchings: Matching[];
}

export interface AssignmentTestPack {
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
    author: Author;
    tests: Test[];
}

export interface AssignmentResponse {
    type: string;
    assignmentDate: Date;
    dueDate: Date;
    completed: boolean;
    assignmentTestPack: AssignmentTestPack;
}
