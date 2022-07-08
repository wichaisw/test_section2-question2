import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookUpPipe } from './pipes/lookUp';

@NgModule({
  declarations: [
    LookUpPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LookUpPipe
  ]
})
export class SharedModule { }
