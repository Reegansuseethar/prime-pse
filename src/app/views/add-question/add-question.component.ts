import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  questionForm: FormGroup;
  showList: boolean = true;
  questionList: any;
  removeId: any;

  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private formBuilder: FormBuilder, private service: DataService) { }

  ngOnInit() {
    this.initializeForm();

    this.service.getQuestions().subscribe((res: any) => {
      console.log(res);
      this.questionList = res;
    })
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      questionId: [0],
      questionGroup: ['', Validators.required],
      questionSubgroup: ['', Validators.required],
      questionName: ['', Validators.required],
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
      this.service.addQuestion(this.questionForm.value).subscribe((res: any) => {
        console.log(res);
        this.service.showToaster(res.message);
      })
    }
  }

  cancel() {
    this.initializeForm();
    this.showList = true;
  }

  addQuestion() {
    this.showList = false;
  }

  openModel(id: any) {
    this.deleteModal.show();
    this.removeId = id;
  }

  removeQues() {
    this.service.removeQuestion(this.removeId).subscribe((res: any) => {
      console.log(res);
      this.service.showToaster(res.message);
      this.deleteModal.hide();
      this.ngOnInit();
    })
  }

}
