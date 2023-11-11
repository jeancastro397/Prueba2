import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizacionService } from './../servicios/autorizacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  public formLogin: FormGroup;

  constructor(formBuilder: FormBuilder, public auth: AutorizacionService) {
    this.formLogin = formBuilder.group({
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  public iniciarSesion() {
    if (!this.formLogin.valid) {
      alert('Formulario incorrecto');
      this.formLogin.controls['user'].setValue('');
      this.formLogin.controls['password'].setValue('');
      this.formLogin.clearValidators();

      return;
    }
    this.auth.iniciarSesion(
      this.formLogin.controls['user'].value,
      this.formLogin.controls['password'].value
    );
  }

  ngOnInit() {}
}
