import { Injectable } from '@angular/core';
import { AddClassRequest } from 'src/app/models/class/add-class.request';
import { AddToClassRequest } from 'src/app/models/class/add-to-class.request';
import { AssignTestPackageRequest } from 'src/app/models/class/assignment.request';
import { ClassDetailsResponse } from 'src/app/models/class/class-details.response';
import { RemoveFromClassRequest } from 'src/app/models/class/remove-from-class.request';
import { StudentResponse } from 'src/app/models/class/student.response';
import { TeacherClassResponse } from 'src/app/models/class/teacher-class.response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends GeneralService {
  getClassesForUser(url: string = "class/Classes") {
    return this.sendGetRequest<TeacherClassResponse[]>(url, {"auth": "strict"})
  }

  getClass(id: string, url: string = "class/Classes/") {
    return this.sendGetRequest<ClassDetailsResponse>(url + id, {"auth": "strict"});
  }

  addClass(req: AddClassRequest, url: string = "class/Classes") {
    return this.sendPostRequest<AddClassRequest, ClassDetailsResponse>(req, url, {"auth": "strict"});
  }

  removeStudentFromClass(req: RemoveFromClassRequest, url: string = "class/Students/remove-from-class") {
    return this.sendDeleteRequest<RemoveFromClassRequest, any>(req, url);
  }

  addStudentToClass(req: AddToClassRequest, url: string = "class/Students/add-to-class") {
    return this.sendPostRequest<AddToClassRequest, any>(req, url);
  }

  searchStudents(term: string, url: string = "class/Students/search") {
    return this.sendGetRequest<StudentResponse[]>(`${url}?term=${term}`);
  }

  assignPackage(req: AssignTestPackageRequest, url: string = "class/Assignments/assign") {
    return this.sendPostRequest<AssignTestPackageRequest, any>(req, url, {"auth": "strict"});
  }
}
