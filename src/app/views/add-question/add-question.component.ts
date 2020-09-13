import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
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
  grouplist: any;
  subGrouplist: any;
  optionImage1: boolean;
  optionImage2: boolean;
  optionImage3: boolean;
  optionImage4: boolean;


  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private formBuilder: FormBuilder, private service: DataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initializeForm();
    this.spinner.show();
    this.service.getQuestions().subscribe((res: any) => {
      this.questionList = res;
      this.spinner.hide();
    });

    this.service.getGroups().subscribe((res: any) => {
      this.grouplist = res;
    })
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      // _id: [0],
      questionGroup: ['', Validators.required],
      questionSubgroup: ['', Validators.required],
      questionName: ['', Validators.required],
      freeQuestion: [false],
      premiumQuestion: [false],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      answer: ['', Validators.required]
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

  changeGroup(val: any) {
    this.service.getSubGroupByGroupId(val).subscribe((res: any) => {
      console.log(res)
      this.subGrouplist = res;
    })
  }

  enableOption1(e) {
    if (e) {
      this.optionImage1 = true;
    } else {
      this.optionImage1 = false;
    }
  }
  enableOption2(e) {
    if (e) {
      this.optionImage2 = true;
    } else {
      this.optionImage2 = false;
    }
  }
  enableOption3(e) {
    if (e) {
      this.optionImage3 = true;
    } else {
      this.optionImage3 = false;
    }
  }
  enableOption4(e) {
    if (e) {
      this.optionImage4 = true;
    } else {
      this.optionImage4 = false;
    }
  }

  editQuestion(id: any) {
    this.service.getQuesbyID(id).subscribe((res: any) => {
      this.showList = false;
      this.questionForm = this.formBuilder.group({
        _id: [res._id],
        questionGroup: [res.questionGroup, Validators.required],
        questionSubgroup: [res.questionSubgroup, Validators.required],
        questionName: [res.questionName, Validators.required],
        freeQuestion: [res.freeQuestion],
        premiumQuestion: [res.premiumQuestion],
        option1: [res.option1, Validators.required],
        option2: [res.option2, Validators.required],
        option3: [res.option3, Validators.required],
        option4: [res.option4, Validators.required],
        answer: [res.answer, Validators.required]
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

  getGroupQues(id: any) {
    this.questionList = [];
    if (id == 'all') {
      this.ngOnInit();
    } else {
      this.service.getQuestionBygroupId(id).subscribe((res: any) => {
        console.log(res);
        this.questionList = res;
      })
    }
  }

}
