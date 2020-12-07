import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  ngOnInit() {}

  images = [
    {
      "imagem":"https://www.unidesc.edu.br/wp-content/uploads/2017/02/logo-site1.png"
    },
  ];

}