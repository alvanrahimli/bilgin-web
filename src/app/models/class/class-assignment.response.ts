export interface ClassAssignmentResponse {
    type: string;
    assignmentDate: Date;
    dueDate: Date | null;
    relatedItemId: string | null;
}