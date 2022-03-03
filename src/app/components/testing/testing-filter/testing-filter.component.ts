import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingFilter } from 'src/app/models/shared/testing-filter.dto';
import { ParagraphResponse } from 'src/app/models/test-subject/response/paragraph.response';
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
  currentSubjectId: string = "";

  grades: GradeResponse[] = [];
  paragraphs: ParagraphResponse[] = [];

  selectedGrade: number = 0;
  selectedParagraph: string = "";
  
  async ngOnInit(): Promise<void>{
    let gradesResponse = await this.filterService.getGrades();
    if (!gradesResponse.hasError) {
      this.grades = gradesResponse.data;
    }

    let paragraphsResponse = await this.filterService.getParagraphs(this.currentSubjectId);
    if (!paragraphsResponse.hasError) {
      this.paragraphs = paragraphsResponse.data;
    }
  }
  
  async ngAfterViewInit(): Promise<void> {
    setTimeout(() => {
      $("#paragraph-select").selectpicker("refresh");
      $("#grade-select").selectpicker("refresh");
    }, 500);
  }

  async submitFilter(): Promise<void> {
    this.onSubmit.emit({
      gradeId: this.selectedGrade,
      paragraphId: this.selectedParagraph
    } as TestingFilter);
  }
}
