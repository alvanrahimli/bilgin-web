import { Injectable } from '@angular/core';
import { AssignmentResponse } from 'src/app/models/assignment/assignment.response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService extends GeneralService {

  getAll() {
    return this.sendGetRequest<AssignmentResponse[]>("class/Assignments/all");
  }
}
