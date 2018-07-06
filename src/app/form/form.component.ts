import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { HierarchyHelper, Control } from '../helper/hierarchy.helper';

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
  result: object;

  hierarchy: Control[] = [{
    control: 'maritalStatus', conditions: [{
      values: ['Married', 'Divorce'], subcontrols: [{
        control: 'numberOfChild'}, {
        control: 'radioGroup1_1', conditions: [{
          values: ['Good', 'Wow'], subcontrols: [{
            control: 'radioGroup1_2', conditions: [{
              values: ['200'], subcontrols: [{
                control: 'radioGroup1_3'}]}]}]}]}, {
        control: 'checkBoxGroup', conditions: [{
          values: [{checkBox1: null, checkBox3: true, checkBox2: null}], subcontrols: [{
            control: 'address'
          }]
        }]
      }]
    }]
  }, {
    control: 'radioGroup2', conditions: [{
      values: ['Yes'], subcontrols: [{
        control: 'radioGroup2_1'
      }, {
        control: 'select1'
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
      sex: null,
      maritalStatus: null,
      numberOfChild: null,
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

  submit() {
    // const i = Number(this.testForm.value.radioGroup1_2);
    // this.testForm.get('radioGroup1_2').setValue(i);
    // console.log(i);

    this.result = {...this.testForm.value};
  }

  clear() {
    this.testForm.reset();
  }

  load() {
    this.testForm.setValue(this.result);
  }
}
