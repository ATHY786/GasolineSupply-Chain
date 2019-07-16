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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { GasolineComponent } from './Gasoline/Gasoline.component';

import { RefineryComponent } from './Refinery/Refinery.component';
import { TruckComponent } from './Truck/Truck.component';
import { GasstationComponent } from './Gasstation/Gasstation.component';

import { RefineComponent } from './Refine/Refine.component';
import { LoadComponent } from './Load/Load.component';
import { UnloadComponent } from './Unload/Unload.component';
import { SellComponent } from './Sell/Sell.component';
import { HistorianComponent } from './Historian/Historian.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Gasoline', component: GasolineComponent },
  { path: 'Refinery', component: RefineryComponent },
  { path: 'Truck', component: TruckComponent },
  { path: 'Gasstation', component: GasstationComponent },
  { path: 'Refine', component: RefineComponent },
  { path: 'Load', component: LoadComponent },
  { path: 'Unload', component: UnloadComponent },
  { path: 'Sell', component: SellComponent },
  { path: 'Historian', component: HistorianComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
