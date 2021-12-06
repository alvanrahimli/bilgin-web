import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }
  
  @Input()
  level: number = 1;

  ngOnInit(): void {
  }

  goBack(): void {
    let route = "../".repeat(this.level);
    this.router.navigate([route], {relativeTo: this.activatedRoute});
  }
}
