import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-postagens-delet',
  templateUrl: './postagens-delet.component.html',
  styleUrls: ['./postagens-delet.component.css']
})
export class PostagensDeletComponent implements OnInit { 
  
  
  constructor( ) { }

  ngOnInit(): void {
    
  }

  deletePostagem(){}
}
