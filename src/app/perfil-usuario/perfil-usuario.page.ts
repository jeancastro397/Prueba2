import { Component, OnInit } from '@angular/core';
import { Usuario } from './../modelos/Usuario';
import { AutorizacionService } from './../servicios/autorizacion.service';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements ViewWillEnter, ViewDidLeave {
  public userLogin: Usuario | null = null;
  private subs: Subscription | null = null;

  constructor(
    private auth: AutorizacionService
  ) { }

  ionViewWillEnter(): void {
    this.subs = this.auth.$usuarioLogeado.subscribe(
      user => {
        this.userLogin;
      }
    );
  }

  ionViewDidLeave():void {
    this.subs?.unsubscribe();
  }

  ngOnInit() {
  }

}
