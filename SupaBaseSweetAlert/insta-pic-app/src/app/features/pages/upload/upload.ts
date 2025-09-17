import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  storageService = inject(Storage);
  authService = inject(Auth);
  userService = inject(UserService);
  router = inject(Router);

  onUploadImage(event: Event) {
    let inputFile = event.target as HTMLInputElement; // Convierte el event.target a un HTMLInputElement castear, para poder acceder a la propiedad files
    if (!inputFile.files || inputFile.files.length <= 0) {
      // Si no hay archivos o si la longitud es menor o igual a 0 entonces return
      return;
    }

    const imageFile = inputFile.files[0]; // Accede al primer archivo de la lista de archivos seleccionados

    const username = this.authService.getUserLogged().username; // Obtiene el nombre de usuario del usuario que ha iniciado sesión

    // Swal.showLoading(); Muestra un indicador de carga mientras se sube la imagen

    this.storageService.uploadFile(imageFile, username).then((response) => {
      if (response && response.data) {
        const url = this.storageService.getImageUrl(response.data.fullPath);
        this.userService.saveImage(username, url); // Guarda la URL de la imagen en el servicio de usuario
        Swal.fire({
          title: "Imagen subida con éxito",
          text: "La imagen se ha subido correctamente",
          icon: "success",
          position: "top-end",
          heightAuto: false,
          timer: 2000,
          showConfirmButton: false,
          padding: "1em",
          customClass: {
            popup: 'custom-swal'
          }
        })
      } else if (response && response.error) {
        Swal.fire({
          title: "Error al subir la imagen",
          text: "Inténtalo de nuevo",
          icon: "error",
          position: "top-end",
          heightAuto: false,
          timer: 2000,
          showConfirmButton: false,
          padding: "1em",
          customClass: {
            popup: 'custom-swal'
          }
        });
      }
    });

    this.router.navigate(['home']);
  }
}
