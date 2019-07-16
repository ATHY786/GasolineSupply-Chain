/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TruckService } from './Truck.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-truck',
  templateUrl: './Truck.component.html',
  styleUrls: ['./Truck.component.css'],
  providers: [TruckService]
})
export class TruckComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  truckId = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  flag = new FormControl('', Validators.required);
  loadtime = new FormControl('', Validators.required);
  unloadtime = new FormControl('', Validators.required);
  refinery = new FormControl('', Validators.required);
  gasstation = new FormControl('', Validators.required);


  constructor(public serviceTruck: TruckService, fb: FormBuilder) {
    this.myForm = fb.group({
      truckId: this.truckId,
      quantity: this.quantity,
      flag: this.flag,
      loadtime: this.loadtime,
      unloadtime: this.unloadtime,
      refinery: this.refinery,
      gasstation: this.gasstation
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceTruck.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'gasolinesupplychain.Truck',
      'truckId': this.truckId.value,
      'quantity': this.quantity.value,
      'flag': this.flag.value,
      'loadtime': this.loadtime.value,
      'unloadtime': this.unloadtime.value,
      'refinery': this.refinery.value,
      'gasstation': this.gasstation.value
    };

    this.myForm.setValue({
      'truckId': null,
      'quantity': null,
      'flag': null,
      'loadtime': null,
      'unloadtime': null,
      'refinery': null,
      'gasstation': null
    });

    return this.serviceTruck.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'truckId': null,
        'quantity': null,
        'flag': null,
        'loadtime': null,
        'unloadtime': null,
        'refinery': null,
        'gasstation': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'gasolinesupplychain.Truck',
      'quantity': this.quantity.value,
      'flag': this.flag.value,
      'loadtime': this.loadtime.value,
      'unloadtime': this.unloadtime.value,
      'refinery': this.refinery.value,
      'gasstation': this.gasstation.value
    };

    return this.serviceTruck.updateParticipant(form.get('truckId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceTruck.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceTruck.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'truckId': null,
        'quantity': null,
        'flag': null,
        'loadtime': null,
        'unloadtime': null,
        'refinery': null,
        'gasstation': null
      };

      if (result.truckId) {
        formObject.truckId = result.truckId;
      } else {
        formObject.truckId = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.flag) {
        formObject.flag = result.flag;
      } else {
        formObject.flag = null;
      }

      if (result.loadtime) {
        formObject.loadtime = result.loadtime;
      } else {
        formObject.loadtime = null;
      }

      if (result.unloadtime) {
        formObject.unloadtime = result.unloadtime;
      } else {
        formObject.unloadtime = null;
      }

      if (result.refinery) {
        formObject.refinery = result.refinery;
      } else {
        formObject.refinery = null;
      }

      if (result.gasstation) {
        formObject.gasstation = result.gasstation;
      } else {
        formObject.gasstation = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'truckId': null,
      'quantity': null,
      'flag': null,
      'loadtime': null,
      'unloadtime': null,
      'refinery': null,
      'gasstation': null
    });
  }
}
