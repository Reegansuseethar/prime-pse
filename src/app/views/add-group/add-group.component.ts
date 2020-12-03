import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  groupForm: FormGroup;
  showList: boolean = true;
  grouplist: any;
  submitted: boolean;
  existsques: boolean;
  removeId: any;

  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private formBuilder: FormBuilder, private service: DataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.initializeForm();
    this.service.getGroups().subscribe((res: any) => {
      this.spinner.hide();
      this.grouplist = res;
    }, () => {
      this.service.showToaster("Something went wrong!!!");
      this.spinner.hide();
    });
  }

  get f() { return this.groupForm.controls; }

  initializeForm() {
    this.submitted = false;
    this.groupForm = this.formBuilder.group({
      questionGroup: ['', Validators.required],
    });
  }

  editGroup(id: any) {
    this.service.getGroupbyID(id).subscribe((res: any) => {
      this.showList = false;
      this.groupForm = this.formBuilder.group({
        _id: [res._id],
        questionGroup: [res.questionGroup, Validators.required],
      });
    })
  }


  openModel(id: any) {
    this.deleteModal.show();
    this.removeId = id;
  }

  removeGroup() {
    this.spinner.show();
    this.service.removeGroup(this.removeId).subscribe((res: any) => {
      this.spinner.hide();
      this.service.showToaster(res.message);
      this.deleteModal.hide();
      this.ngOnInit();
    }, () => {
      this.service.showToaster("Something went wrong!!!");
      this.spinner.hide();
    });
  }

  cancel() {
    this.groupForm.reset();
    this.submitted = false;
    this.showList = true;
  }

  checkGroup(value: any) {
    if (value) {
      this.grouplist.filter((result: any) => {
        if (result.questionGroup == value) {
          this.groupForm.controls.questionGroup.setErrors({ valid: false });
          this.existsques = true;
        }
      });
    } else {
      this.existsques = false;
    }
  }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.groupForm.invalid) {
      this.submitted = true;
      this.spinner.hide();
      return;
    } else {
      if (!this.groupForm.value._id) {
        this.service.addGroup(this.groupForm.value).subscribe((res: any) => {
          this.spinner.hide();
          this.submitted = false;
          this.service.showToaster(res.message);
          this.ngOnInit();
          this.showList = true;
        }, () => {
          this.service.showToaster("Something went wrong!!!");
          this.spinner.hide();
        });
      } else {
        this.service.updateGroupById(this.groupForm.value).subscribe((res: any) => {
          this.spinner.hide();
          this.service.showToaster(res.message);
          this.submitted = false;
          this.ngOnInit();
          this.showList = true;
        }, () => {
          this.service.showToaster("Something went wrong!!!");
          this.spinner.hide();
        });
      }
    }
  }

}
