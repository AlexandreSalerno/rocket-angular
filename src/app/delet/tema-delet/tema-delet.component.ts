import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delet',
  templateUrl: './tema-delet.component.html',
  styleUrls: ['./tema-delet.component.css']
})
export class TemaDeletComponent implements OnInit {

  tema: Tema = new Tema
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute



  ) { }

  ngOnInit() {
    if(environment.token==''){
    this.router.navigate(['/sobrenos'])
  }
  this.idTema = this.route.snapshot.params['id']
  this.findByIdTema(this.idTema)
}

findByIdTema(id: number) {
  this.temaService.getById(id).subscribe((resp: Tema) => {
    this.tema = resp
  })
}

deleteTema(){
  this.temaService.deleteTema(this.idTema).subscribe(()=>{
    alert('Matéria apagada com sucesso! ')
    this.router.navigate(['/tema'])
  })


}



 
}
