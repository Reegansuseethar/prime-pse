import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html'
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
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
 console.log(bgColor);

 return bgColor
  }

  constructor(private cdRef:ChangeDetectorRef){

  }
  ngOnInit(): void {
  }
}
