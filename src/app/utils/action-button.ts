export class ActionButton {
    id: string = "";
    visible: boolean = false;
    role: ActionButtonRole = ActionButtonRole.None;
    btnText: string | undefined;
    event: Function;

    constructor(role: ActionButtonRole, event: Function) {
        this.role = role;
        this.event = event;
    }
}

export enum ActionButtonRole {
    None, Filter, Add, Delete
}