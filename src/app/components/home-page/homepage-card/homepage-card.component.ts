import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerResponse } from 'src/app/models/homepage/banner.response';

@Component({
  selector: 'app-homepage-card',
  templateUrl: './homepage-card.component.html',
  styleUrls: ['./homepage-card.component.css']
})
export class HomepageCardComponent implements OnInit {

  constructor(public router: Router) { }

  @Input()
  banner: BannerResponse = {} as BannerResponse;

  ngOnInit(): void {
  }
  
  goToUrl(url: string): void {
    window.location.href = url;
  }

}
