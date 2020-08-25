import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  showList: boolean;
  subGrouplist:any;

  constructor(private formBuilder: FormBuilder, private service: DataService) { }

  ngOnInit() {
    this.initializeForm();

    this.service.getGroups().subscribe((res: any) => {
      this.grouplist = res;
    });

    this.service.getSubgroups().subscribe((res: any) => {
      this.subGrouplist = res;
    });
  }

  get f() { return this.subgroupForm.controls; }

  initializeForm() {
    this.subgroupForm = this.formBuilder.group({
      questionGroupid: ['', Validators.required],
      questionSubgroup: ['', Validators.required],
    });
  }

  getGroupData(val: any) {
    console.log(val);

  }

  onSubmit() {
    if (this.subgroupForm.invalid) {
      this.submitted = true;
      return;
    } else {
      if (!this.subgroupForm.value._id) {
        this.service.addSubgroup(this.subgroupForm.value).subscribe((res: any) => {
          this.submitted = false;
          this.service.showToaster(res.message);
          this.ngOnInit();
          this.showList = true;
        });
      } else {
        this.service.updateSubgroupById(this.subgroupForm.value).subscribe((res: any) => {
          this.service.showToaster(res.message);
          this.submitted = false;
          this.ngOnInit();
          this.showList = true;
        });
      }
    }
  }
}
