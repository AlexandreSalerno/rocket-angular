import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobrenosComponent } from './sobrenos/sobrenos.component';
 

const routes: Routes = [
  {path:'',redirectTo:'entrar', pathMatch:'full'},

  {path:'inicio',component: InicioComponent},

  {path:'entrar',component: EntrarComponent},

  {path:'sobrenos',component: SobrenosComponent}

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
