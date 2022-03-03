import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingFilter } from 'src/app/models/shared/testing-filter.dto';
import { ParagraphResponse } from 'src/app/models/test-subject/response/paragraph.response';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { GradeResponse } from 'src/app/models/user/response/grade.response';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-testing-filter',
  templateUrl: './testing-filter.component.html',
  styleUrls: ['./testing-filter.component.css']
})
export class TestingFilterComponent implements OnInit, AfterViewInit {

  constructor(private filterService: FilterService) { }

  @Output()
  onSubmit = new EventEmitter<TestingFilter>();

  @Input()
  currentSubject: string = "";

  grades: GradeResponse[] = [];
  subjects: SubjectResponse[] = [];
  paragraphs: ParagraphResponse[] = [];

  selectedGrade: number = 0;
  selectedSubject: string = "";
  selectedParagraph: string = "";
  
  async ngOnInit(): Promise<void>{
    let gradesResponse = await this.filterService.getGrades();
    if (!gradesResponse.hasError) {
      this.grades = gradesResponse.data;
    }

    let subjectsResponse = await this.filterService.getSubjects();
    if (!subjectsResponse.hasError) {
      this.subjects = subjectsResponse.data;
    }

    await this.loadParagraphs();
  }
  
  async ngAfterViewInit(): Promise<void> {
    setTimeout(() => {
      $("#grade-select").selectpicker("refresh");
      // $("#subject-select").selectpicker("refresh");
      $("#paragraph-select").selectpicker("refresh");
    }, 500);
  }

  async loadParagraphs(): Promise<void> {
    let paragraphsResponse = await this.filterService.getParagraphs(this.currentSubject);
    if (!paragraphsResponse.hasError) {
      this.paragraphs = paragraphsResponse.data;
    }

    setTimeout(() => {
      $("#paragraph-select").selectpicker("refresh");
    }, 500);
  }

  async submitFilter(): Promise<void> {
    this.onSubmit.emit({
      gradeId: this.selectedGrade,
      subjectId: this.currentSubject,
      paragraphId: this.selectedParagraph
    });
  }
}
