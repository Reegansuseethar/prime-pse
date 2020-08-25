import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  submitted:boolean;

  removeId:any;

  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private formBuilder: FormBuilder,private service: DataService) { }

  ngOnInit() {
    this.initializeForm();
    this.service.getGroups().subscribe((res: any) => {
      this.grouplist = res;
    })
  }

  get f() { return this.groupForm.controls; }


  initializeForm() {
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
    this.service.removeGroup(this.removeId).subscribe((res: any) => {
      this.service.showToaster(res.message);
      this.deleteModal.hide();
      this.ngOnInit();
    })
  }

  cancel(){
    this.groupForm.reset();
    this.submitted = false;
    this.showList = true;
  }

  onSubmit() {
    if (this.groupForm.invalid) {
      this.submitted =true;
      return;
    } else {
      if (!this.groupForm.value._id) {
        this.service.addGroup(this.groupForm.value).subscribe((res: any) => {
          this.submitted = false;
          this.service.showToaster(res.message);
          this.ngOnInit();
          this.showList = true;
        });
      } else {
        this.service.updateGroupById(this.groupForm.value).subscribe((res: any) => {
          this.service.showToaster(res.message);
          this.submitted = false;
          this.ngOnInit();
          this.showList = true;
        });
      }
    }
  }

}
