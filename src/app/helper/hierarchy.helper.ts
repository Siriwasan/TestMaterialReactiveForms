import { FormGroup } from '@angular/forms';

interface HierarchyNode {
  control: string;
  parentControl: string;
  condition: string;
}

export class HierarchyHelper {
  form: FormGroup;
  hierarchy: any[];
  hierarchyNodes: HierarchyNode[] = [];

  constructor() { }

  initializeHierarchy(form: FormGroup, hierarchy: any[]) {
    this.form = form;
    this.hierarchy = hierarchy;

    this.subscribeValueChanges(this.hierarchy);
    this.createHierarchyNodes(this.hierarchy, {control: null, parentControl: null, condition: null});

    console.log(this.hierarchyNodes);
  }

  private subscribeValueChanges(controls: any[]) {
    controls.forEach(e => {
      if (e.conditions !== undefined) {
        // subscribe value change to each control
        this.form.get(e.control).valueChanges.subscribe(val => {
          console.log(e.control + ' ' + val);
          console.log(val);
          e.conditions.forEach(i => {
            console.log(i.value);
            if (!this.isEquivalent(val, i.value)) {
              i.subcontrols.forEach(a => {
                this.form.get(a.control).reset();
              });
            }
          });
        });
        // recursive subscribe to subcontrols
        e.conditions.forEach(n => this.subscribeValueChanges(n.subcontrols));
      }
    });
  }

  private createHierarchyNodes(controls: any[], parentNode: HierarchyNode) {
    controls.forEach(e => {
      const newNode = {control: e.control, parentControl: parentNode.parentControl, condition: parentNode.condition};
      this.hierarchyNodes.push(newNode);
      if (e.conditions !== undefined) {
        e.conditions.forEach(i => {
          const childNode = {control: null, parentControl: e.control, condition: i.value};
          this.createHierarchyNodes(i.subcontrols, childNode);
        });
      }
    });
  }

  showHierarchy(control: string): boolean {
    const targetNode = this.hierarchyNodes.find(e => e.control === control);

    // alway show if could not find control in hierarchy
    if (targetNode === undefined || targetNode.parentControl === null) {
      return true;
    }

    return this.isEquivalent(this.form.get(targetNode.parentControl).value, targetNode.condition);
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
