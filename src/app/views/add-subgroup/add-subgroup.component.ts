import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-subgroup',
  templateUrl: './add-subgroup.component.html',
  styleUrls: ['./add-subgroup.component.scss']
})
export class AddSubgroupComponent implements OnInit {

  subgroupForm: FormGroup;
  grouplist: any;
  submitted: boolean;
  showList: boolean = true;
  subGrouplist: any;
  existsques: boolean;
  removeId: any;

  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private formBuilder: FormBuilder, private service: DataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.initializeForm();

    this.service.getGroups().subscribe((res: any) => {
      this.grouplist = res;
    });

    this.service.getSubgroups().subscribe((res: any) => {
      this.spinner.hide();
      this.subGrouplist = res;
    });
  }

  get f() { return this.subgroupForm.controls; }

  initializeForm() {
    this.submitted = false;
    this.subgroupForm = this.formBuilder.group({
      questionGroupid: ['', Validators.required],
      questionSubgroup: ['', Validators.required],
      amount: [''],
      videoUrl: [''],
      pdfMaterial: ['']
    });
  }

  getGroupData(val: any) {
    // console.log(val);
  }

  editSubgroup(id: any) {
    this.service.getSubgroupbyID(id).subscribe((res: any) => {
      this.showList = false;
      this.subgroupForm = this.formBuilder.group({
        _id: [res._id],
        questionGroupid: [res.questionGroupid, Validators.required],
        questionSubgroup: [res.questionSubgroup, Validators.required],
        amount: [res.amount],
        videoUrl: [res.videoUrl],
        pdfMaterial: [res.pdfMaterial]
      });
    })
  }

  openModel(id: any) {
    this.deleteModal.show();
    this.removeId = id;
  }

  removeSubgroup() {
    this.spinner.show();
    this.service.removeSubgroup(this.removeId).subscribe((res: any) => {
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
    this.subgroupForm.reset();
    this.submitted = false;
    this.showList = true;
  }

  checkSubgroup(value: any) {
    if (value) {
      this.grouplist.filter((result: any) => {
        if (result.questionSubgroup == value) {
          this.subgroupForm.controls.questionSubgroup.setErrors({ valid: false });
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
    if (this.subgroupForm.invalid) {
      this.submitted = true;
      this.spinner.hide();
      return;
    } else {
      if (!this.subgroupForm.value._id) {
        this.service.addSubgroup(this.subgroupForm.value).subscribe((res: any) => {
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
        this.service.updateSubgroupById(this.subgroupForm.value).subscribe((res: any) => {
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

  uploadDoc(event: any) {
    if (event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        // this.subgroupForm.patchValue({
        //   pdfMaterial: reader.result
        // });
        return reader.result
      }
    }
  }
}
