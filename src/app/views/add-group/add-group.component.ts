import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  groupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.groupForm = this.formBuilder.group({
      groupId: [0],
      groupName: ['', Validators.required],
      createdBy: [0],
      createdAt: [new Date()],
      updatedAt: [new Date()],
      updatedBy: [0],
    });
  }

}
