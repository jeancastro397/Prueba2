import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../modelos/Usuario';
import { BehaviorSubject, delay } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionService {
  private readonly URL_LOGIN = 'https://dummyjson.com/auth/login';

  private cargarDatos: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public $cargarDatos = this.cargarDatos.asObservable();

  private usuarioLogeado: BehaviorSubject<Usuario | null> =
    new BehaviorSubject<Usuario | null>(null);
  public $usuarioLogeado = this.cargarDatos.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public iniciarSesion(user: string, password: string) {
    this.cargarDatos.next(true);
    this.http
      .post<Usuario>(
        this.URL_LOGIN,
        JSON.stringify({
          username: user,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(delay(2000))
      .subscribe((res) => {
        this.usuarioLogeado.next(res);
        this.cargarDatos.next(false);
        this.router.navigate(['perfil-usuario']);
      });
  }
}
