import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClassDetailsResponse } from 'src/app/models/class/class-details.response';
import { StudentResponse } from 'src/app/models/class/student.response';
import { ClassesService } from 'src/app/services/class/classes.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  constructor(private classesService: ClassesService,
    private activatedRoute: ActivatedRoute) { }

  status: StatusIndicator = new StatusIndicator();
  classDetails: ClassDetailsResponse = {} as ClassDetailsResponse;

  students: StudentResponse[] = [];
  async ngOnInit(): Promise<void> {
    this.status.setProgress();

    var params = await firstValueFrom(this.activatedRoute.params);
    let detailsResponse = await this.classesService.getClass(params["id"]);
    if (detailsResponse.hasError) {
      this.status.setError();
      return;
    }

    this.classDetails = detailsResponse.data;
    this.students = detailsResponse.data.students;
    this.status.setCompleted();
  }

}
