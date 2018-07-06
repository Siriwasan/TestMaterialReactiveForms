import { FormGroup } from '@angular/forms';

export interface Control {
  control: string;
  conditions?: Condition[]; // one control can have no condition or many conditions
}

export interface Condition {
  values: any[]; // difference conditions can have same result
  subcontrols: Control[]; // one result can have many control
}
interface HierarchyNode {
  control: string;
  parentControl: string;
  conditionValues: string;
}

export class HierarchyHelper {
  private formGroup: FormGroup;
  private hierarchy: Control[];
  private hierarchyNodes: HierarchyNode[] = [];
  private isAlwayShow = false;

  constructor() { }

  initializeHierarchy(form: FormGroup, hierarchy: any[]) {
    this.formGroup = form;
    this.hierarchy = hierarchy;

    // this.createHierarchyNodes(this.hierarchy, {control: null, parentControl: null, conditionValues: null});
    this.createHierarchyNodes(this.hierarchy);
    this.subscribeValueChanges(this.hierarchy);

    console.log(this.hierarchyNodes);
  }

  private createHierarchyNodes(controls: any[], parentNode: HierarchyNode = {control: null, parentControl: null, conditionValues: null}) {
    controls.forEach(control => {
      const newNode = {control: control.control, parentControl: parentNode.parentControl, conditionValues: parentNode.conditionValues};
      this.hierarchyNodes.push(newNode);
      if (control.conditions !== undefined) {
        control.conditions.forEach(condition => {
          const childNode = {control: null, parentControl: control.control, conditionValues: condition.values};
          this.createHierarchyNodes(condition.subcontrols, childNode);
        });
      }
    });
  }

  private subscribeValueChanges(controls: any[]) {
    controls.forEach(control => {
      if (control.conditions !== undefined) {
        // subscribe value change to each control
        this.formGroup.get(control.control).valueChanges.subscribe(newValue => {
          const oldValue = this.formGroup.value[control.control];

          for (let index = 0; index < control.conditions.length; index++) {
            const condition = control.conditions[index];

            // if old value is in hierarchy, reset controls
            if (condition.values.indexOf(oldValue) >= 0) {
              // in case of new and old value are in same condition, don't reset control
              if (condition.values.indexOf(newValue) >= 0) {
                break;
              }

              // otherwise, reset previous condition controls
              condition.subcontrols.forEach(a => {
                this.formGroup.get(a.control).reset();
              });
            }
          }
        });
        // recursive subscribe to subcontrols
        control.conditions.forEach(consition => this.subscribeValueChanges(consition.subcontrols));
      }
    });
  }

  showHierarchy(control: string): boolean {
    if (this.isAlwayShow) {
      return true;
    }

    const targetNode = this.hierarchyNodes.find(node => node.control === control);

    // alway show if could not find control in hierarchy
    if (targetNode === undefined || targetNode.parentControl === null) {
      return true;
    }

    for (let index = 0; index < targetNode.conditionValues.length; index++) {
      const value = targetNode.conditionValues[index];

      if (this.isEquivalent(this.formGroup.get(targetNode.parentControl).value, value)) {
        return true;
      }
    }

    return false;
  }

  alwayShow(show: boolean = true) {
    this.isAlwayShow = show;
  }

  private isEquivalent(a: any, b: any): boolean {
    // exclude compare 'null'(object) with basic type
    if (typeof a === 'object' && typeof b === 'object') {
      // console.log('a:' + typeof a + ' b:' + typeof b);
      // console.log('a:' + a + ' b:' + b);
      return this.compareObject(a, b);
    }

    return a === b;
  }

  private compareObject(a: any, b: any): boolean {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
}
