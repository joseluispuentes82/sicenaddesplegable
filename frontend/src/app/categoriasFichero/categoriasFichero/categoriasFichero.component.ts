import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoriaFichero } from '../models/categoriaFichero';
import { CategoriaFicheroImpl } from '../models/categoriaFichero-impl';
import { CategoriaFicheroService } from '../service/categoriaFichero.service';


@Component({
  selector: 'app-categoriasFichero',
  templateUrl: './categoriasFichero.component.html',
  styleUrls: ['./categoriasFichero.component.css']
})
export class CategoriasFicheroComponent implements OnInit {
  /**
   * variable que recoge todas las categorias de fichero 
   */
  categoriasFichero: CategoriaFichero[] = [];
  /**
   * variable que posibilita la comunicacion de datos con el otro componente para mostrar los datos de una categoria
   */
  categoriaFicheroVerDatos: CategoriaFichero;
  /**
   * variable para icono "volver"
   */
  faVolver = faArrowAltCircleLeft;

  /**
   * 
   * @param categoriaFicheroService Para usar los metodos propios de CategoriaFichero
   * @param router Para redirigir
   */
  constructor(private categoriaFicheroService: CategoriaFicheroService, private router: Router) { }

  /**
   * metemos en la variable todas las categorias de fichero
   */
  ngOnInit(): void {
    this.categoriasFichero = JSON.parse(localStorage.categoriasFichero);
  }
  
  /**
   * metodo que asigna los datos de la categoria de fichero para la comunicacion al otro componente
   * @param categoriaFichero Categoria de Fichero a mostrar en el modal
   */
  verDatos(categoriaFichero: CategoriaFichero): void {
    this.categoriaFicheroVerDatos = categoriaFichero;
  }
  
  /**
   * metodo que materializa la eliminacion de una categoria de fichero y vuelve al listado de categorias de fichero
   * - actualiza el localStorage
   * @param categoriaFichero Categoria de fichero a eliminar
   */
  onCategoriaFicheroEliminar(categoriaFichero: CategoriaFichero): void {
    this.categoriaFicheroService.delete(categoriaFichero).subscribe(response => {
      this.categoriaFicheroService.getCategoriasFichero().subscribe((response) => {
        localStorage.categoriasFichero = JSON.stringify(this.categoriaFicheroService.extraerCategoriasFichero(response));
        console.log(`He borrado la Categoría de Fichero ${categoriaFichero.nombre}`);
        this.router.navigate(['/categoriasFichero']);
      });
    });
  }

  /**
   * metodo que materializa la edicion de una categoria de fichero y vuelve al listado de categorias de fichero
   * - actualiza el localStorage
   * @param categoriaFichero Categoria de fichero a editar
   */  
  onCategoriaFicheroEditar(categoriaFichero: CategoriaFicheroImpl): void {
    this.categoriaFicheroService.update(categoriaFichero).subscribe(response => {
      this.categoriaFicheroService.getCategoriasFichero().subscribe((response) => {
        localStorage.categoriasFichero = JSON.stringify(this.categoriaFicheroService.extraerCategoriasFichero(response));
        console.log(`He actualizado la Categoría de Fichero ${categoriaFichero.nombre}`);
        this.router.navigate(['/categoriasFichero']);
      });
    });
  }
}