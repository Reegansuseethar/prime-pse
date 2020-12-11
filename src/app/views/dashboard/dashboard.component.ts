import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: 'dashboard.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DashboardComponent implements OnInit {

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public random_bg_color() {
    var letters = '0123456789ABCDEF';
    var color: any = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return {
      'background': color
    }
  }

  grouplist: any;

  constructor(private ref: ChangeDetectorRef, private router: Router, private service: DataService, private spinner: NgxSpinnerService) {

  }
  ngOnInit() {
    this.service.getGroups().subscribe((res: any) => {
      // this.grouplist = res;
    });
    this.spinner.show();
    this.service.getDashboardData().subscribe((res: any) => {
      this.grouplist = res;
      this.spinner.hide();
    })
  }

  enterIntro(id: any) {
    this.router.navigate(['intro'], { queryParams: { 'id': id } })
  }
}
