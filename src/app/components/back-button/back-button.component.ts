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
  @Input()
  confirm: boolean = false;
  @Input()
  sameLevelPage: string | undefined;

  ngOnInit(): void {
  }

  goBack(): void {
    if (this.confirm) {
      if (!confirm("Çıxmaq istədiyinizdən əminsiniz? Nəticəniz ləğv olunacaq")) {
        return;
      }
    }

    let route = "../".repeat(this.level);
    if (this.sameLevelPage) route += this.sameLevelPage;
    this.router.navigate([route], {relativeTo: this.activatedRoute, queryParamsHandling: "merge"});
  }
}
