export interface BaseModelResponse<T> {
    data: T;
    hasError: boolean;
    error: any;
}