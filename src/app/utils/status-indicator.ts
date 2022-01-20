export class StatusIndicator {
    status: Status = Status.pending;
    inProgressText: string | undefined;
    errorText: string | undefined;
    completedText: string | undefined;
    persist: boolean = false;
    
    setError(errText: string | undefined = undefined) {
        this.status = Status.error;
        this.errorText = errText
    }

    setProgress(progressText: string | undefined = undefined) {
        this.status = Status.inProgress;
        this.inProgressText = progressText
    }

    setCompleted(text: string | undefined = undefined, shouldPersist: boolean = false) {
        this.status = Status.completed;
        this.completedText = text
        this.persist = shouldPersist;
    }

    isCompleted(): boolean {
        return this.status == Status.completed;
    }
}

export enum Status {
    pending, inProgress, completed, error
}
