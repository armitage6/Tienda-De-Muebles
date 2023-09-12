document.addEventListener('DOMContentLoaded', function () {

    const email = {
        nombre: '',
        asunto: '',
        email: '',
        tel: '',
        date: '',
        text: '',
        pais: '',


        categorias: '',
    }



    //Selecionar los elementos de la interfaz 
    const inputNombre = document.querySelector('#nombre');
    const inputAsunto = document.querySelector('#asunto');
    const inputEmail = document.querySelector('#email');
    const inputTel = document.querySelector('#tel');
    const inputDate = document.querySelector('#date');
    const inputText = document.querySelector('#text');
    const inputPais = document.querySelector('#pais');
    const inputCliente = document.querySelector('#cliente');
    const inputProveedor = document.querySelector('#proveedor');
    const inputCategoria = document.querySelector('#categorias');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario input[type="submit"]')
    const btnReset = document.querySelector('#formulario input[type="reset"]')
    const spinkit = document.querySelector('#spinkit')



    inputNombre.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputTel.addEventListener('input', validar);
    inputDate.addEventListener('input', validar);
    inputText.addEventListener('input', validar);
    inputPais.addEventListener('input', validar);
    inputCliente.addEventListener('input', validar);
    inputProveedor.addEventListener('input', validar);
    inputCategoria.addEventListener('input', validar);


    formulario.addEventListener('submit', enviarForm)


    btnReset.addEventListener('click', (e) => {
        e.preventDefault()


        resetFormulario()
    })

    function enviarForm(e) {
        e.preventDefault();

        spinkit.classList.remove('hidden')

        setTimeout(() => {
            spinkit.classList.add('hidden');

            resetFormulario()

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('alerta-exito');
            alertaExito.textContent = "Mensaje enviado correctamente"

            formulario.appendChild(alertaExito)
            setTimeout(() => {
                alertaExito.remove()
            }, 3000)

        }, 3000)
    }



    function validar(e) {




        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement.parentElement)
            email[e.target.id] = ''
            comprobarEmail()
            return;
        }

        if (!validarEmail(e.target.value) && e.target.id === 'email') {
            mostrarAlerta(`El email no es valido`, e.target.parentElement.parentElement)
            email[e.target.id] = ''
            comprobarEmail()
            return
        }


        eliminarAlerta(e.target.parentElement.parentElement)

        //Si llega a ejecutarse hasta aca es que paso la validacion
        //Asiganar valores
        email[e.target.id] = e.target.value.trim().toLowerCase()

        //Comprobar el objeto de email
        comprobarEmail();
        console.log(email)
    }


    function mostrarAlerta(mensaje, referencia) {

        //Elkiminar alerta previa
        eliminarAlerta(referencia)

        const error = document.createElement('P');
        const container = document.createElement('DIV')
        error.textContent = mensaje
        error.classList.add('alerta-form')

        container.appendChild(error)
        referencia.appendChild(container)

    }

    function eliminarAlerta(referencia) {
        const alerta = referencia.querySelector('.alerta-form')
        if (alerta) {
            alerta.remove()
        }

    }


    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)

        return resultado
    }


    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity');
        btnSubmit.disabled = false;

    }


    function resetFormulario() {
        email.nombre = ''
        email.asunto = ''
        email.email = ''
        email.tel = ''
        email.date = ''
        email.text = ''
        email.pais = ''
        email.cliente = ''
        email.proveedor = ''
        email.categorias = ''

        formulario.reset();
        comprobarEmail()
    }

})