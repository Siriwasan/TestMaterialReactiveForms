import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDatepickerIntl, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@coachcare/datepicker';
import { ThDatetimeIntl } from './th-datetime.intl';
import { CustomDateAdapter } from './custom-date-adapter';

import { HierarchyHelper, Control } from '../helper/hierarchy.helper';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
const PW_DATE_FORMATS = {
  parse: {
    datetime: 'DD/MM/YYYY H:mm',
    date: 'DD/MM/YYYY',
    time: 'H:mm'
  },
  display: {
    datetime: 'DD/MM/YYYY H:mm',
    date: 'DD/MM/YYYY',
    time: 'H:mm',
    monthDayLabel: 'D MMMM',
    monthDayA11yLabel: 'D MMMM',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    dateA11yLabel: 'LLLL',
    timeLabel: 'HH:mm'
  }
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [

    // * This is only for original mat-datepicker, no timepicker included
    // * The locale would typically be provided on the root module of your application. We do it at
    // * the component level here, due to limitations of our example generation script.
    // * { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    // * `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // * `MatMomentDateModule` in your applications root module. We provide it at the component level
    // * here, due to limitations of our example generation script.
    // * { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // * { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },

    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MatDatepickerIntl, useClass: ThDatetimeIntl },
    { provide: MAT_DATE_FORMATS, useValue: PW_DATE_FORMATS }
  ]
})
export class FormComponent implements OnInit {
  testForm: FormGroup;
  hierarchyHelper = new HierarchyHelper();
  result: object;

  hierarchy: Control[] = [
    {
      name: 'maritalStatus',
      conditions: [
        {
          values: ['Married'],
          subcontrols: [
            {
              name: 'numberOfChild'
            },
            {
              name: 'radioGroup1_1',
              conditions: [
                {
                  values: ['Good', 'Wow'],
                  subcontrols: [
                    {
                      name: 'radioGroup1_2',
                      conditions: [
                        {
                          values: ['200'],
                          subcontrols: [
                            {
                              name: 'radioGroup1_3'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          values: ['Married', 'Divorce'],
          subcontrols: [
            {
              name: 'checkBoxGroup',
              conditions: [
                {
                  values: [{ checkBox1: null, checkBox2: false, checkBox3: true }],
                  subcontrols: [
                    {
                      name: 'address'
                    },
                    {
                      name: 'radioGroup1_4'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'radioGroup2',
      conditions: [
        {
          values: ['Yes'],
          subcontrols: [
            {
              name: 'radioGroup2_1'
            },
            {
              name: 'select1'
            }
          ]
        }
      ]
    }
  ];

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('th');

    this.createForm();
    this.hierarchyHelper.initializeHierarchy(this.testForm, this.hierarchy);
    // this.hierarchyHelper.alwayShow();
  }

  ngOnInit() {}

  createForm() {
    this.testForm = this.formBuilder.group({
      firstName: '',
      sex: null,
      maritalStatus: null,
      numberOfChild: null,
      radioGroup1_1: null,
      radioGroup1_2: null,
      radioGroup1_3: null,
      radioGroup1_4: null,
      checkBoxGroup: this.formBuilder.group({
        checkBox1: null,
        checkBox2: null,
        checkBox3: null
      }),
      address: '',
      radioGroup2: null,
      radioGroup2_1: null,
      select1: null,
      dateOfBirth: null
    });
  }

  submit() {
    // const i = Number(this.testForm.value.radioGroup1_2);
    // this.testForm.get('radioGroup1_2').setValue(i);
    // console.log(i);

    this.result = { ...this.testForm.value };

    console.log(this.testForm.value);
  }

  clear() {
    this.testForm.reset();
  }

  load() {
    this.testForm.setValue(this.result);
  }
}
