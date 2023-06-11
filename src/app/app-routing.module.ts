import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SuccesspageComponent } from './successpage/successpage.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'success', component: SuccesspageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
