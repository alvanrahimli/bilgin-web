export interface TestPacksFilterContext {
    offset: number;
    limit: number;
    priceMin: number | null;
    priceMax: number | null;
    gradeId: number | null;
    subjectId: string | null;
    paragraphId: string | null;
    authorId: string | null;
}