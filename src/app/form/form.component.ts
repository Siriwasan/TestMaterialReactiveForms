import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HierarchyHelper } from '../helper/hierarchy.helper';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  testForm: FormGroup;
  hierarchyHelper = new HierarchyHelper();

  // hierarchy = [{
  //   control: 'radioGroup1', conditions: [{
  //     value: 'Other', subcontrols: [{
  //       control: 'radioGroup1_1', conditions: [{
  //         value: 'Wow', subcontrols: [{
  //           control: 'radioGroup1_2', conditions: [{
  //             value: 'Middle', subcontrols: [{
  //               control: 'radioGroup1_3'}]
  //           }]
  //         }]
  //       }]
  //     }, {
  //       control: 'checkBoxGroup'
  //     }]
  //   }]
  // }];

  hierarchy = [{
    control: 'radioGroup1', conditions: [{
      value: 'Other', subcontrols: [{
        control: 'radioGroup1_1', conditions: [{
          value: 'Wow', subcontrols: [{
            control: 'radioGroup1_2', conditions: [{
              value: '200', subcontrols: [{
                control: 'radioGroup1_3'}]}]}]}]}, {
        control: 'checkBoxGroup', conditions: [{
          value: {checkBox1: null, checkBox3: true, checkBox2: null}, subcontrols: [{
            control: 'address'
          }]
        }]
      }]
    }]
  }];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.hierarchyHelper.initializeHierarchy(this.testForm, this.hierarchy);
  }

  ngOnInit() {
  }

  createForm() {
    this.testForm = this.formBuilder.group({
      firstName: '',
      radioGroup1: null,
      radioGroup1_1: null,
      radioGroup1_2: null,
      radioGroup1_3: null,
      checkBoxGroup: this.formBuilder.group({
        checkBox1: null,
        checkBox2: null,
        checkBox3: null,
      }),
      address: '',
    });
  }

  clickMe() {
    console.log(this.testForm.get('checkBoxGroup').value);
  }
}
