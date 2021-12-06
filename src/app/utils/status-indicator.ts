export class StatusIndicator {
    status: Status = Status.pending;
    inProgressText: string | undefined;
    errorText: string | undefined;
    completedText: string | undefined;
    
    setError(errText: string | undefined = undefined) {
        this.status = Status.error;
        this.errorText = errText
    }

    setProgress(progressText: string | undefined = undefined) {
        this.status = Status.inProgress;
        this.errorText = progressText
    }

    setCompleted(text: string | undefined = undefined) {
        this.status = Status.completed;
        this.completedText = text
    }

    isCompleted(): boolean {
        return this.status == Status.completed;
    }
}

export enum Status {
    pending, inProgress, completed, error
}
