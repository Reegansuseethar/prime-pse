import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit {

  public listOfCertications = [{
    'certificationName': 'NISM Certifications',
    'subContent': [{
      'content1': 'NISM MUTUAL FUND',
      'content2': 'NISM EQUITY DERIVATIVES',
      'content3': 'NISM DEPOSITORY OPERATIONS',
      'content4': 'NISM INVESTMENT ADVISER LEVEL 1'
    }]
  }, {
    'certificationName': 'IIBF Exams (JAIIB, CAIIB, AML-KYC)',
    'subContent': [{
      'content1': 'JAIIB PRINCIPLES AND PRACTICES OF BANKING',
      'content2': 'JAIIB ACCOUNTING AND FINANCE FOR BANKERS',
      'content3': 'JAIIB PRINCIPLES AND PRACTICES',
      'content4': 'JAIIB ACCOUNTING AND FINANCE'
    }]
  }, {
    'certificationName': 'IRDA / Licentiate / Associate',
    'subContent': [{
      'content1': 'IRDA IC 38 Life Insurance Agent Exam',
      'content2': 'IRDA IC 38 General Insurance Agent Exam',
      'content3': 'IC01 PRINCIPLES OF INSURANCE',
      'content4': 'IC11 PRACTICE OF GENERAL'
    }]
  }, {
    'certificationName': 'Financial Plan',
    'subContent': [{
      'content1': 'Inancial & Investment Planning Basics',
      'content2': 'Insurance Planning',
      'content3': 'Tax Planning & Estate Planning',
      'content4': 'Retirement Planning and Employee Benefits'
    }]
  }, {
    'certificationName': 'NEET',
    'subContent': [{
      'content1': 'NEET BIOLOGY',
      'content2': 'NEET BOTANY',
      'content3': 'NEET ZOOLOGY',
      'content4': 'NEET CHEMISTRY'
    }]
  }, {
    'certificationName': 'UGC NET & CSIR',
    'subContent': [{
      'content1': 'Law',
      'content2': 'Teaching & Research Aptitude',
      'content3': 'English',
      'content4': 'Management'
    }]
  }]

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public random_bg_color() {
    var letters = '0123456789ABCDEF';
    var color: any = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {

  }

  mockTest() {
    this.router.navigate(['question'])

  }

}
