import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface FornecedorData {
  NomeFornecedor: string;
  Produto: string;
  Valor: number;
}

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.page.html',
  styleUrls: ['./fornecedor.page.scss'],
})
export class FornecedorPage implements OnInit {

  fornecedorList = [];
  fornecedorData: FornecedorData;
  fornecedorForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.fornecedorData = {} as FornecedorData;
  }

  ngOnInit() {

    this.fornecedorForm = this.fb.group({
      NomeFornecedor: ['', [Validators.required]],
      Produto: ['', [Validators.required]],
      Valor: ['', [Validators.required]]
    })

    this.firebaseService.read_fornecedor().subscribe(data => {

      this.fornecedorList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          NomeFornecedor: e.payload.doc.data()['NomeFornecedor'],
          Produto: e.payload.doc.data()['Produto'],
          Valor: e.payload.doc.data()['Valor'],
        };
      })

    });
  }

  GravarDados() {
    this.firebaseService.create_fornecedor(this.fornecedorForm.value)
      .then(resp => {
        //Reset form
        this.fornecedorForm.reset();
      })
      .catch(error => {
        console.log(error);
      });
  }

  DeletarDados(rowID) {
    this.firebaseService.delete_fornecedor(rowID);
  }

  EditarDados(record) {
    record.isEdit = true;
    record.EditNomeFornecedor = record.NomeFornecedor;
    record.EditProduto = record.Produto;
    record.EditValor = record.Valor;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['NomeFornecedor'] = recordRow.EditNomeFornecedor;
    record['Produto'] = recordRow.EditProduto;
    record['Valor'] = recordRow.EditValor;
    this.firebaseService.update_fornecedor(recordRow.id, record);
    recordRow.isEdit = false;
  }

}