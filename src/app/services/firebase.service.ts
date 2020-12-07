import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Cliente';
  collectionFuncionario = 'Funcionario';
  collectionFornecedor = 'Fornecedor';
  collectionPeca = 'Peca';

  constructor(
    private firestore: AngularFirestore
  ) { }

  //CRUD CLIENTE
  create_cliente(record) {
    console.log(record);
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_cliente() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_cliente(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_cliente(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  //CRUD FUNCIONARIO
  create_funcionario(record) {
    console.log(record);
    return this.firestore.collection(this.collectionFuncionario).add(record);
  }

  read_funcionario() {
    return this.firestore.collection(this.collectionFuncionario).snapshotChanges();
  }

  update_funcionario(recordID, record) {
    this.firestore.doc(this.collectionFuncionario + '/' + recordID).update(record);
  }

  delete_funcionario(record_id) {
    this.firestore.doc(this.collectionFuncionario + '/' + record_id).delete();
  }

    //CRUD FORNECEDOR
    create_fornecedor(record) {
      console.log(record);
      return this.firestore.collection(this.collectionFornecedor).add(record);
    }
  
    read_fornecedor() {
      return this.firestore.collection(this.collectionFornecedor).snapshotChanges();
    }
  
    update_fornecedor(recordID, record) {
      this.firestore.doc(this.collectionFornecedor + '/' + recordID).update(record);
    }
  
    delete_fornecedor(record_id) {
      this.firestore.doc(this.collectionFornecedor + '/' + record_id).delete();
    }
}
