import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentResponse } from 'src/app/models/class/student.response';
import { ClassesService } from 'src/app/services/class/classes.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css']
})
export class AddStudentModalComponent implements OnInit, AfterViewInit {

  constructor(private modalService: NgbModal,
    private classesService: ClassesService) { }
  
  @ViewChild('searchInput') 
  _searchInput: ElementRef | undefined;

  @Input()
  status: StatusIndicator = new StatusIndicator();

  @Output()
  onStudentSelected: EventEmitter<string> = new EventEmitter<string>();

  searchTerm: string = "";
  searchResult: StudentResponse[] = [];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._searchInput?.nativeElement.focus();
  }

  closeStudetModal() {
    this.modalService.dismissAll();
  }

  selectUser(infoId: string) {
    this.onStudentSelected.emit(infoId);
    this._searchInput?.nativeElement.focus();
    this._searchInput?.nativeElement.setSelectionRange(0, this.searchTerm.length)
  }

  async searchUser(): Promise<void> {
    let searchResponse = await this.classesService.searchStudents(this.searchTerm);
    if (searchResponse.hasError) {
      return;
    } else {
      this.searchResult = searchResponse.data;
      console.log(searchResponse.data);
    }
  }
}
