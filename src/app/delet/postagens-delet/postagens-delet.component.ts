import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostagensService } from 'src/app/service/postagens.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagens-delet',
  templateUrl: './postagens-delet.component.html',
  styleUrls: ['./postagens-delet.component.css']
})

export class PostagensDeletComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagensService: PostagensService
   
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
    
  }

  findByIdPostagem(id: number){
    this.postagensService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }
  
  apagar(){
    this.postagensService.deletePostagem(this.idPost).subscribe(()=>{
      alert('Postagem apagada com sucesso!')
      this.router.navigate(['/postagens'])
    })
    
  }
  
}
