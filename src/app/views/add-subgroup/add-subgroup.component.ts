import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subgroup',
  templateUrl: './add-subgroup.component.html',
  styleUrls: ['./add-subgroup.component.scss']
})
export class AddSubgroupComponent implements OnInit {

  subgroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.subgroupForm = this.formBuilder.group({
      subgroupId: [0],
      questionGroup:['',Validators.required],
      subgroupName: ['', Validators.required],
      createdBy: [0],
      createdAt: [new Date()],
      updatedAt: [new Date()],
      updatedBy: [0],
    });
  }
}
