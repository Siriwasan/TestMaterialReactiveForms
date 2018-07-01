import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HierarchyHelper } from '../helper/hierarchy.helper';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
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
  }, {
    control: 'radioGroup2', conditions: [{
      value: 'Yes', subcontrols: [{
        control: 'radioGroup2_1'
      }, {
        control: 'select1', conditions: [{
          value: 'Pizza', subcontrols: [{
            control: 'dateOfBirth'
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
      radioGroup2: null,
      radioGroup2_1: null,
      select1: null,
      dateOfBirth: null,
    });
  }

  clickMe() {
    const i = Number(this.testForm.value.radioGroup1_2);
    this.testForm.get('radioGroup1_2').setValue(i);
    console.log(i);
  }
}
