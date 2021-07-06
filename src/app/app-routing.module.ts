import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { TemaDeletComponent } from './delet/tema-delet/tema-delet.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobrenosComponent } from './sobrenos/sobrenos.component';
import { TemaComponent } from './tema/tema.component';

 

const routes: Routes = [
  {path:'',redirectTo:'sobrenos', pathMatch:'full'},

  {path:'entrar',component: EntrarComponent},

  {path:'cadastrar',component: CadastrarComponent},

  {path:'inicio',component: InicioComponent},

  {path:'sobrenos',component: SobrenosComponent},

  {path:'tema', component: TemaComponent},

  {path:'tema-edit/:id', component: TemaEditComponent},

  {path:'tema-delet/:id', component: TemaDeletComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
