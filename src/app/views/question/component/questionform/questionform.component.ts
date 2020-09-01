import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { QuizQuestion } from '../../../../../model/QuizQuestion';
import { element } from '../../../../../../node_modules/protractor';
@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.scss']
})
export class QuestionformComponent implements OnInit {
  @Output() answer = new EventEmitter<string>();
  @Output() formGroup: FormGroup;
  @Input() question: QuizQuestion;
  @Input() disableAnswer :boolean;
  option = '';
  grayBorder = '2px solid #979797';

  constructor() {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
      this.formGroup.patchValue({answer: ''});
    }
    if(this.disableAnswer){
      this.displayExplanation()
    }
  }

  buildForm() {
    this.formGroup = new FormGroup({
      answer: new FormControl(['', Validators.required])
    });
  }

  resetOptionisChecked(){
    this.question.options.forEach((element:any) =>{
      return element.isChecked = false;
    })
  }
  radioChange(answer: string) {
    this.question.selectedOption = answer;
    this.answer.emit(answer);
    this.resetOptionisChecked()
    this.question.options[Number(answer)-1]['isChecked']= true;
    // this.displayExplanation();
  }

  displayExplanation(): void {
    const questionElem = document.getElementById('question');
    if (questionElem !== null) {
      questionElem.innerHTML = 'Option ' + this.question.answer + ' was correct because ' + this.question.explanation + '.';
      questionElem.style.border = this.grayBorder;
    }
  }

  // mark the correct answer regardless of which option is selected once answered
  isCorrect(option: string): boolean {
    return this.question.selectedOption && option === this.question.answer;
  }

  // mark incorrect answer if selected
  isIncorrect(option: string): boolean {
    return (option !== this.question.answer && option === this.question.selectedOption);
  }

  onSubmit() {
    this.formGroup.reset({answer: null});
  }

}
