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
      this.questionList = res;
    })
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      // _id: [0],
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
      if (!this.questionForm.value._id) {
        this.service.addQuestion(this.questionForm.value).subscribe((res: any) => {
          this.service.showToaster(res.message);
          this.ngOnInit();
          this.showList = true;
        });
      } else {
        this.service.updateQuesById(this.questionForm.value).subscribe((res: any) => {
          this.service.showToaster(res.message);
          this.ngOnInit();
          this.showList = true;
        });
      }
    }
  }

  cancel() {
    this.initializeForm();
    this.showList = true;
  }

  addQuestion() {
    this.showList = false;
  }

  editQuestion(id: any) {
    this.service.getQuesbyID(id).subscribe((res: any) => {
      this.showList = false;
      this.questionForm = this.formBuilder.group({
        _id: [res._id],
        questionGroup: [res.questionGroup, Validators.required],
        questionSubgroup: [res.questionSubgroup, Validators.required],
        questionName: [res.questionName, Validators.required],
        option1: [res.option1, Validators.required],
        option2: [res.option2, Validators.required],
        option3: [res.option3, Validators.required],
        option4: [res.option4, Validators.required]
      });
    })
  }

  openModel(id: any) {
    this.deleteModal.show();
    this.removeId = id;
  }

  removeQues() {
    this.service.removeQuestion(this.removeId).subscribe((res: any) => {
      this.service.showToaster(res.message);
      this.deleteModal.hide();
      this.ngOnInit();
    })
  }

}
