import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  constructor() { }

  generarAlerta(mensaje:String, tipo:String){
   let color = (tipo == 'ok'? 'linear-gradient(to right, #00b09b, #96c93d)':'linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))');
   let icono = (tipo == 'ok'?'✅':'❌')
    Toastify({
      text: icono+" "+mensaje,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: color,
      close: true
    }).showToast();  
  }

  mostrarConfirmacion(mensaje:String): Promise<boolean> {
    return new Promise((resolve) => {
      const toast = Toastify({
        text: `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>${mensaje}</div>
            <div style="display: flex; justify-content: center; gap: 12px;">
              <button id="btn-si" style="padding: 4px 8px; background-color: #00dddd; color: white; border: none;">Sí</button>
              <button id="btn-no" style="padding: 4px 8px; background-color: #000; color: white; border: none;">No</button>
            </div>
          </div>
        `,
        duration: -1,
        gravity: "top",
        position: "center",
        escapeMarkup: false,
        backgroundColor: 'linear-gradient(to right,rgb(109, 93, 65),rgb(201, 168, 61))',
        close: false
      });
  
      toast.showToast();
  
      setTimeout(() => {
        document.getElementById("btn-si")?.addEventListener("click", () => {
          toast.hideToast();
          resolve(true);
        });
  
        document.getElementById("btn-no")?.addEventListener("click", () => {
          toast.hideToast();
          resolve(false);
        });
      }, 100);
    });
  }
  

}
