import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalDirective } from 'ngx-bootstrap/modal';

import { QuizQuestion } from '../../../model/QuizQuestion';
import { DataService } from '../../services/data.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() answer: string;
  questionAttempted: number;
  @Input() formGroup: FormGroup;
  @Input() question: QuizQuestion;
  totalQuestions: number;
  completionTime: number;
  correctAnswersCount = 0;
  previous: boolean;
  questionID = 0;
  currentQuestion = 0;
  questionIndex: number = 0;
  correctAnswer: boolean;
  hasAnswer: boolean;
  disabled: boolean;
  quizIsOver: boolean;
  progressValue: number;
  timeLeft: any;
  timePerQuestion = 20;
  interval: any;
  elapsedTime: number;
  elapsedTimes = [];
  disableAnswer: true;
  blueBorder = '2px solid #007aff';
  questionList: any;
  quesArr = []
  allQuestions: any;
  totalMarks: number;
  markedScore: number;
  subscribeTimer: any;
  math = Math;

  @ViewChild('resultModal', { static: false }) public resultModal: ModalDirective;
  @ViewChild('closeModal', { static: false }) public closeModal: ModalDirective;


  constructor(private route: ActivatedRoute, private router: Router, private service: DataService, private spinner: NgxSpinnerService) { }

  counter(i: number) {
    return new Array(i);
  }
  ngOnInit() {
    this.spinner.show();

    this.route.queryParams.subscribe(params => {
      this.service.getQuestionBygroupId(params.id).subscribe((res: any) => {

        if (!this.disableAnswer) {
          this.observableTimer();
        }

        for (let i in res) {
          // if (!res[i].premiumQuestion) {
            this.quesArr.push({
              questionId: Number(i),
              questionText: res[i].questionName,
              options: [
                { optionValue: '1', optionText: res[i].option1 },
                { optionValue: '2', optionText: res[i].option2 },
                { optionValue: '3', optionText: res[i].option3 },
                { optionValue: '4', optionText: res[i].option4 }
              ],
              answer: res[i].answer,
              explanation: '',
              selectedOption: ''
            })
          // }
        }
        // console.log(this.allQuestions)

        this.allQuestions = this.quesArr;
        this.setQuestionID(0);  // get the question ID and store it
        this.question = this.getQuestion;

        this.question = this.getQuestion;
        this.totalQuestions = this.allQuestions.length;
        // change the multiply value
        this.totalMarks = this.allQuestions.length;
        this.timeLeft = this.totalQuestions * 10;
        this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
        this.spinner.hide();

        // });

      })
    })
  }
  observableTimer() {
    this.timeLeft = timer(1000, 2000);
    const abc = this.timeLeft.subscribe(val => {
      // console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer <= 0) {
        this.navigateToResults();
        this.timeLeft.unsubscribe();
      }
    });
  }
  displayNextQuestion() {
    this.resetTimer();
    // this.increaseProgressValue();

    this.questionIndex = this.questionID++;

    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question').style.border = this.blueBorder;
    }
  }

  displayPreviousQuestion() {
    this.questionIndex = this.questionID--;

    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question').style.border = this.blueBorder;
    }
  }
  setskipStatus(qId) {
    if (this.allQuestions[qId]['selectedOption'] == '') {
      this.allQuestions[qId]['isSkipped'] = true
    }
  }

  navigateToNextQuestion(val, fromqnAttempted?: boolean): void {
    if (!fromqnAttempted) {
      this.setskipStatus(val);
      this.setQuestionID(val + 1);
    } else {
      this.setQuestionID(val);
    }

    this.question = this.getQuestion;
    this.displayNextQuestion();
    this.previous = true;
  }

  navigateToPreviousQuestion(val): void {
    this.setQuestionID(val - 1);
    this.question = this.getQuestion;
    this.displayPreviousQuestion();
    // this.previous = true;
  }

  navigateToResults() {
    this.questionAttempted = this.allQuestions.filter(x => {
      if (x.selectedOption != '') {
        return x
      }
    }).length;

    this.markedScore = this.allQuestions.filter(x => {
      if (x.selectedOption == x.answer) {
        return x
      }
    }).length;
    this.subscribeTimer = 0
    this.resultModal.show();
    this.previous = false;
  }

  viewAnswers() {
    this.resultModal.hide();
    this.disableAnswer = true;
    this.setQuestionID(0);
    this.question = this.getQuestion;
    this.ngOnInit();
  }

  closeExam() {
    this.closeModal.show();
  }

  endExam() {
    // this.questionAttempted = this.allQuestions.filter(x=>{
    //   if(x.selectedOption != ''){
    //     return x
    //   }
    // }).length;

    // this.markedScore  = this.allQuestions.filter(x=>{
    //   if(x.selectedOption  == x.answer){
    //     return x
    //   }
    // }).length;
    this.closeModal.hide();
    // this.resultModal.show();
    // this.previous = false;
    this.router.navigate(['/dashboard'])
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
  }


  // checks whether the question is valid and is answered correctly
  checkIfAnsweredCorrectly() {
    if (this.isThereAnotherQuestion() && this.isCorrectAnswer()) {
      this.incrementCorrectAnswersCount();
      this.correctAnswer = true;
      this.hasAnswer = true;
      this.disabled = false;

      this.elapsedTime = Math.ceil(this.timePerQuestion - this.timeLeft);
      if (this.getQuestionID() < this.totalQuestions) {
        this.elapsedTimes = [...this.elapsedTimes, this.elapsedTime];
      } else {
        this.elapsedTimes = [...this.elapsedTimes, 0];
        this.completionTime = this.calculateTotalElapsedTime(this.elapsedTimes);
      }

      this.quizDelay(3000);

      // if (this.getQuestionID() < this.totalQuestions) {
      //   this.navigateToNextQuestion();
      // } else {
      //   this.navigateToResults();
      // }
    }
  }

  incrementCorrectAnswersCount() {
    if (this.questionID <= this.totalQuestions && this.isCorrectAnswer()) {
      if (this.correctAnswersCount === this.totalQuestions) {
        return this.correctAnswersCount;
      } else {
        this.correctAnswer = true;
        this.hasAnswer = true;
        return this.correctAnswersCount++;
      }
    } else {
      this.correctAnswer = false;
      this.hasAnswer = false;
    }
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionID()) / this.totalQuestions).toFixed(1));
  }

  /* decreaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionID() - 1) / this.totalQuestions).toFixed(1));
  } */

  calculateTotalElapsedTime(elapsedTimes) {
    return this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  /****************  public API  ***************/
  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID <= this.allQuestions.length;
  }

  isFinalQuestion(): boolean {
    return this.currentQuestion === this.totalQuestions;
  }

  isCorrectAnswer(): boolean {
    return this.question.selectedOption === this.question.answer;
  }

  get getQuestion() {
    if (this.allQuestions) {
      return this.allQuestions.filter(
        question => question.questionId === this.questionID
      )[0];
    }
  }

  // countdown clock
  private countdown() {
    if (this.questionID <= this.totalQuestions) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.checkIfAnsweredCorrectly();

          if (this.correctAnswersCount <= this.totalQuestions) {
            this.calculateTotalElapsedTime(this.elapsedTimes);
          }
          if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            // this.navigateToNextQuestion();
          }
          if (this.timeLeft === 0 && this.isFinalQuestion()) {
            // this.navigateToResults();
          }
          if (this.isFinalQuestion() && this.hasAnswer === true) {
            // this.navigateToResults();
            this.quizIsOver = true;
          }

          // disable the next button until an option has been selected
          this.question.selectedOption === '' ? this.disabled = true : this.disabled = false;

        }
      }, 1000);
    }
  }

  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }

}
