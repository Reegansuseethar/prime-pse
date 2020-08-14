import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {


  public listOfCertications=[{
    'certificationName': 'NISM Certifications',
    'subContent':[{
      'content1':'NISM MUTUAL FUND',
      'content2':'NISM MUTUAL FUND',
      'content3':'NISM MUTUAL FUND',
      'content4':'NISM MUTUAL FUND'
    }]
  },{
    'certificationName': 'NISM Certifications',
    'subContent':[{
      'content1':'NISM MUTUAL FUND',
      'content2':'NISM MUTUAL FUND',
      'content3':'NISM MUTUAL FUND',
      'content4':'NISM MUTUAL FUND'
    }]
  },{
    'certificationName': 'NISM Certifications',
    'subContent':[{
      'content1':'NISM MUTUAL FUND',
      'content2':'NISM MUTUAL FUND',
      'content3':'NISM MUTUAL FUND',
      'content4':'NISM MUTUAL FUND'
    }]
  },{
    'certificationName': 'NISM Certifications',
    'subContent':[{
      'content1':'NISM MUTUAL FUND',
      'content2':'NISM MUTUAL FUND',
      'content3':'NISM MUTUAL FUND',
      'content4':'NISM MUTUAL FUND'
    }]
  },{
    'certificationName': 'NISM Certifications',
    'subContent':[{
      'content1':'NISM MUTUAL FUND',
      'content2':'NISM MUTUAL FUND',
      'content3':'NISM MUTUAL FUND',
      'content4':'NISM MUTUAL FUND'
    }]
  },{
    'certificationName': 'NISM Certifications',
    'subContent':[{
      'content1':'NISM MUTUAL FUND',
      'content2':'NISM MUTUAL FUND',
      'content3':'NISM MUTUAL FUND',
      'content4':'NISM MUTUAL FUND'
    }]
  }]

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public random_bg_color(){
    var letters = '0123456789ABCDEF';
    var color:any = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  constructor(private cdRef:ChangeDetectorRef){

  }
  ngOnInit(): void {
  }
}
