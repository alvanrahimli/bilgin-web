export interface TestCompletionBriefResponse {
    id: string;
    completionDate: string;
    result: number;
    maxResult: number;
    packageId: string;
    showResultImmediately: boolean;
    allCount: number;
    correctCount: number;
    failedCount: number;
    pendingCount: number;
    congratsText: string;
    awardImgUrl: string;
}