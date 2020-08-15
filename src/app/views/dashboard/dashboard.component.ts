import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("changeDivSize", [
      state(
        "initial",
        style({
          backgroundColor: "green",
          width: "100px",
          height: "100px"
        })
      ),
      state(
        "final",
        style({
          backgroundColor: "red",
          width: "200px",
          height: "200px"
        })
      ),
      transition("initial=>final", animate("1500ms")),
      transition("final=>initial", animate("1000ms"))
    ]),

    trigger("balloonEffect", [
      state(
        "initial",
        style({
          backgroundColor: "green",
          transform: "scale(1)"
        })
      ),
      state(
        "final",
        style({
          backgroundColor: "red",
          transform: "scale(1.5)"
        })
      ),
      transition("final=>initial", animate("1000ms")),
      transition("initial=>final", animate("1500ms"))
    ]),

    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0
        })
      ),
      transition("void <=> *", animate(1000))
    ]),

    trigger("EnterLeave", [
      state("flyIn", style({ transform: "translateX(0)" })),
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("0.5s 300ms ease-in")
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ transform: "translateX(100%)" }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  currentState = "initial";

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
      'content2': 'JAIIB ACCOUNTING AND FINANCE FOR BANKERS'
    }]
  }, {
    'certificationName': 'IRDA / Licentiate / Associate / Fellowship',
    'subContent': [{
      'content1': 'IRDA IC 38 Life Insurance Agent Exam',
      'content2': 'IRDA IC 38 General Insurance Agent Exam',
      'content3': 'IC01 PRINCIPLES OF INSURANCE',
      'content4': 'IC11 PRACTICE OF GENERAL'
    }]
  }, {
    'certificationName': 'Financial Plan',
    'subContent': [{
      'content1': 'inancial & Investment Planning Basics',
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

  constructor(private cdRef: ChangeDetectorRef) {

  }
  ngOnInit(): void {
  }

  changeState() {
    this.currentState = this.currentState === "initial" ? "final" : "initial";
  }
}
