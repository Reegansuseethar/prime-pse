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
      'content2': 'NISM MUTUAL FUND',
      'content3': 'NISM MUTUAL FUND',
      'content4': 'NISM MUTUAL FUND'
    }]
  }, {
    'certificationName': 'NISM Certifications',
    'subContent': [{
      'content1': 'NISM MUTUAL FUND',
      'content2': 'NISM MUTUAL FUND',
      'content3': 'NISM MUTUAL FUND',
      'content4': 'NISM MUTUAL FUND'
    }]
  }, {
    'certificationName': 'NISM Certifications',
    'subContent': [{
      'content1': 'NISM MUTUAL FUND',
      'content2': 'NISM MUTUAL FUND',
      'content3': 'NISM MUTUAL FUND',
      'content4': 'NISM MUTUAL FUND'
    }]
  }, {
    'certificationName': 'NISM Certifications',
    'subContent': [{
      'content1': 'NISM MUTUAL FUND',
      'content2': 'NISM MUTUAL FUND',
      'content3': 'NISM MUTUAL FUND',
      'content4': 'NISM MUTUAL FUND'
    }]
  }, {
    'certificationName': 'NISM Certifications',
    'subContent': [{
      'content1': 'NISM MUTUAL FUND',
      'content2': 'NISM MUTUAL FUND',
      'content3': 'NISM MUTUAL FUND',
      'content4': 'NISM MUTUAL FUND'
    }]
  }, {
    'certificationName': 'NISM Certifications',
    'subContent': [{
      'content1': 'NISM MUTUAL FUND',
      'content2': 'NISM MUTUAL FUND',
      'content3': 'NISM MUTUAL FUND',
      'content4': 'NISM MUTUAL FUND'
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
