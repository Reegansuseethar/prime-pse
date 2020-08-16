import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  questionForm: FormGroup;
  showList: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      questionid: [0],
      questiongroup: ['', Validators.required],
      questionName: ['', Validators.required],
      createdBy: [0],
      createdAt: [new Date()],
      updatedAt: [new Date()],
      updatedBy: [0],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.questionForm.invalid) {
      return;
    } else {
      console.log(this.questionForm.value);
      this.showList = true;
    }
  }

  cancel() {
    this.initializeForm();
    this.showList = true;
  }

  addQuestion() {
    this.showList = false;
  }

}
