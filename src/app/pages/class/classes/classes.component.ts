import { Component, OnInit } from '@angular/core';
import { TeacherClassResponse } from 'src/app/models/class/teacher-class.response';
import { ClassesService } from 'src/app/services/class/classes.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(private classesService: ClassesService) { }

  status: StatusIndicator = new StatusIndicator();
  classes: TeacherClassResponse[] = [];

  async ngOnInit(): Promise<void> {
    this.status.setProgress();

    let classesResponse = await this.classesService.getClassesForUser();
    if (classesResponse.hasError) {
      this.status.setError("Məlumatlar əldə oluna bilmədi");
      return;
    }

    this.classes = classesResponse.data;
    this.status.setCompleted();
  }

}
