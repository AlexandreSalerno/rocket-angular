import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
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
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token==''){
    this.router.navigate(['/sobrenos'])
    this.alertas.showAlertLight('Sua sessão expirou, faça o login novamente!')
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
    this.alertas.showAlertSuccess('Matéria apagada com sucesso! ')
    this.router.navigate(['/tema'])
  })


}



 
}
