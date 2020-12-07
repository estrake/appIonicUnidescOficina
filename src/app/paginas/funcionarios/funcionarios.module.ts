import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionariosPageRoutingModule } from './funcionarios-routing.module';

import { FuncionariosPage } from './funcionarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FuncionariosPageRoutingModule
  ],
  declarations: [FuncionariosPage]
})
export class FuncionariosPageModule {}
