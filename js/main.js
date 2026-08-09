document.addEventListener('DOMContentLoaded', () => {
  const btnSiguiente = document.getElementById('btn-siguiente');
  const btnAtras = document.getElementById('btn-atras');
  const step1 = document.getElementById('form-step-1');
  const step2 = document.getElementById('form-step-2');
  const formLead = document.getElementById('lead-form');
  const extendedForm = document.getElementById('extended-form');
  const btnEnviar = document.getElementById('btn-enviar');

  const GOOGLE_SHEETS_ENDPOINT = "/api/submit";

  if (btnSiguiente && step1 && step2 && formLead) {
    btnSiguiente.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Validación visual nativa de HTML5
      if (formLead.checkValidity()) {
        // Transición visual sin Layout Shift brusco
        step1.style.opacity = '0';
        setTimeout(() => {
          step1.classList.add('hidden');
          step2.classList.remove('hidden');
          step2.style.opacity = '0';
          
          // Trigger reflow
          void step2.offsetWidth;
          
          step2.style.transition = 'opacity 0.3s ease';
          step2.style.opacity = '1';
        }, 200);
      } else {
        // Forza la validación visual nativa en pantalla
        formLead.reportValidity();
      }
    });
  }

  if (btnAtras && step1 && step2) {
    btnAtras.addEventListener('click', (e) => {
      e.preventDefault();
      step2.style.opacity = '0';
      setTimeout(() => {
        step2.classList.add('hidden');
        step1.classList.remove('hidden');
        step1.style.opacity = '0';
        
        void step1.offsetWidth;
        
        step1.style.transition = 'opacity 0.3s ease';
        step1.style.opacity = '1';
      }, 200);
    });
  }

  if (extendedForm) {
    extendedForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Guardamos el texto original del botón y mostramos estado de carga
      const originalText = btnEnviar.innerHTML;
      btnEnviar.innerHTML = 'Enviando...';
      btnEnviar.disabled = true;

      // Obtener la fecha actual en formato local
      const now = new Date();
      const fechaHora = now.toLocaleString('es-ES', { 
        day: 'numeric', 
        month: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric' 
      }).replace(',', '');

      // Recopilamos datos de la Fase 1
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const whatsapp = document.getElementById('whatsapp').value;

      // Recopilamos datos de la Fase 2
      const objetivo = document.getElementById('objetivo').value;
      const tiempo = document.getElementById('tiempo').value;
      const zona = document.getElementById('zona').value;
      const plazo = document.getElementById('plazo').value;
      const inversion = document.getElementById('inversion').value;

      // Estructuramos el payload según las columnas solicitadas
      // A: Fecha y Hora, B: Nombre, C: Correo, D: WhatsApp, E: Objetivo, F: Disponibilidad
      // G: Zona, H: Plazo, I: Inversión, J: Canal UTM, K: Campaña UTM, L: Anuncio UTM
      const payload = {
        fecha_hora: fechaHora,
        nombre: nombre,
        correo: email,
        whatsapp: whatsapp,
        objetivo: objetivo,
        disponibilidad: tiempo,
        zona: zona,
        plazo: plazo,
        inversion: inversion,
        utm_source: "", // Dejar vacío
        utm_campaign: "", // Dejar vacío
        utm_content: "" // Dejar vacío
      };

      try {
        if (!GOOGLE_SHEETS_ENDPOINT) {
          console.log('Payload generado listo para enviar a Google Sheets:', payload);
          alert('¡Gracias por aplicar! (Nota: falta configurar la URL de Google Sheets para guardar los datos)');
          return;
        }

        // Realizamos la solicitud POST
        const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        
        if (data.success) {
          window.location.href = '/gracias.html';
        } else {
          throw new Error(data.error || 'Error al guardar');
        }

      } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al enviar la aplicación. Por favor, inténtalo de nuevo.');
      } finally {
        // Restaurar estado del botón
        btnEnviar.innerHTML = originalText;
        btnEnviar.disabled = false;
      }
    });
  }
});
