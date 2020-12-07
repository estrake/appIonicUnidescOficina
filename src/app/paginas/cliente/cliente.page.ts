import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface ClienteData {
  NomeCliente: string;
  Idade: number;
  Carro: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  clienteList = [];
  clienteData: ClienteData;
  clienteForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.clienteData = {} as ClienteData;
  }

  ngOnInit() {

    this.clienteForm = this.fb.group({
      NomeCliente: ['', [Validators.required]],
      Idade: ['', [Validators.required]],
      Carro: ['', [Validators.required]]
    })

    this.firebaseService.read_cliente().subscribe(data => {

      this.clienteList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          NomeCliente: e.payload.doc.data()['NomeCliente'],
          Idade: e.payload.doc.data()['Idade'],
          Carro: e.payload.doc.data()['Carro'],
        };
      })

    });
  }

  GravarDados() {
    this.firebaseService.create_cliente(this.clienteForm.value)
      .then(resp => {
        //Reset form
        this.clienteForm.reset();
      })
      .catch(error => {
        console.log(error);
      });
  }

  DeletarDados(rowID) {
    this.firebaseService.delete_cliente(rowID);
  }

  EditarDados(record) {
    record.isEdit = true;
    record.EditNomeCliente = record.NomeCliente;
    record.EditIdade = record.Idade;
    record.EditCarro = record.Carro;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['NomeCliente'] = recordRow.EditNomeCliente;
    record['Idade'] = recordRow.EditIdade;
    record['Carro'] = recordRow.EditCarro;
    this.firebaseService.update_cliente(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
