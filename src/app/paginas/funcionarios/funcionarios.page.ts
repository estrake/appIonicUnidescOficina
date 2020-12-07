import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface FuncionarioData {
  NomeFuncionario: string;
  Cargo: string;
  Matricula: string;
}

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.scss'],
})
export class FuncionariosPage implements OnInit {

  funcionarioList = [];
  funcionarioData: FuncionarioData;
  funcionarioForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.funcionarioData = {} as FuncionarioData;
  }

  ngOnInit() {

    this.funcionarioForm = this.fb.group({
      NomeFuncionario: ['', [Validators.required]],
      Cargo: ['', [Validators.required]],
      Matricula: ['', [Validators.required]]
    })

    this.firebaseService.read_funcionario().subscribe(data => {

      this.funcionarioList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          NomeFuncionario: e.payload.doc.data()['NomeFuncionario'],
          Cargo: e.payload.doc.data()['Cargo'],
          Matricula: e.payload.doc.data()['Matricula'],
        };
      })

    });
  }

  GravarDados() {
    this.firebaseService.create_funcionario(this.funcionarioForm.value)
      .then(resp => {
        //Reset form
        this.funcionarioForm.reset();
      })
      .catch(error => {
        console.log(error);
      });
  }

  DeletarDados(rowID) {
    this.firebaseService.delete_funcionario(rowID);
  }

  EditarDados(record) {
    record.isEdit = true;
    record.EditNomeFuncionario = record.NomeFuncionario;
    record.EditCargo = record.Cargo;
    record.EditMatricula = record.Matricula;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['NomeFuncionario'] = recordRow.EditNomeFuncionario;
    record['Cargo'] = recordRow.EditCargo;
    record['Matricula'] = recordRow.EditMatricula;
    this.firebaseService.update_funcionario(recordRow.id, record);
    recordRow.isEdit = false;
  }
}