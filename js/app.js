document.addEventListener('DOMContentLoaded', function(){
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }


    //Seleccionar los elementos de la interfaz
    const inputEmaill = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#enviar-mail');
    const btnSubmit = document.querySelector('#enviar');
    const resetBtn = document.querySelector('#enviar-mail button[type="reset"]');
    const spiner = document.querySelector('#spiner');

    // console.log(resetBtn)
    
    //Asignar evento
    inputEmaill.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    resetBtn.addEventListener('click', function(e){
          e.preventDefault()

          //reiniciar el objeto
          resetFormulario()
    })
    function enviarEmail(e){
      e.preventDefault()
      spiner.classList.add('flex')
      spiner.classList.remove('hidden')

      setTimeout(()=>{
        spiner.classList.remove('flex')
      spiner.classList.add('hidden')
        resetFormulario();
     //crear una alerta
     const alertaExito = document.createElement('P');
     alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
     alertaExito.textContent = 'mensaje enviado correctamente';

     formulario.appendChild(alertaExito)

      setTimeout(()=>{
       alertaExito.remove();
      },3000);

      },3000);
      
    }

    function validar (e){
        
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail()
        return;}

        if(e.target.id ===  'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El Email no es valido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail()
            return;
        } 
        
        limpiarAlerta(e.target.parentElement);

        //asignar valores
        email[e.target.id]= e.target.value.trim().toLowerCase();
        
        //comprobar el objeto email
        comprobarEmail();
    }
    
   function mostrarAlerta(mensaje, referencia){
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }

       //Genera alerta html
       const error = document.createElement('P');
       error.textContent = mensaje;
       error.classList.add('bg-red-600', 'text-white', 'm-2', 'text-center')
       
       //Muestra el html
        referencia.appendChild(error);
    }
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }

    }
    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;

    }
    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50', 'cursor-not-allowed');
            return;

        }else{
            btnSubmit.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    function resetFormulario(){
        //reiniciar formulario
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset()
       comprobarEmail()
    }

});