
//función que actualiza las últimas compras según el listado del carrito

function actualizarUltCompras(){
	
	let htmlContentToAppend = ``;
    if(localStorage.getItem('listaCargada') != null){ 
        listado=localStorage.getItem('listaCarrito');
        listado= JSON.parse(listado);
    
		for(let i = 0; i < listado.length; i++){
			
			let article = listado[i];
			htmlContentToAppend += `
				
					<img src="` + article.src + `" alt=" " class="img-thumbnail">
				
			 `
		}
	}else{
	htmlContentToAppend = 'Aún no ha realizado compras.'
	}
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;  //contenido del carrito
}

//función para mostrar los datos de un usuario que ya está cargado en localstorage
function cargarUsuario(){

	if(localStorage.getItem('UsuCargado') != null){ 
        let perfil = localStorage.getItem('perfilUsu');
        perfil = JSON.parse(perfil);

			document.getElementById("PrimerNom").value = perfil.nombre1;
			document.getElementById("SegundoNom").value = perfil.nombre2;
			document.getElementById("PrimerApe").value = perfil.apellido1;
			document.getElementById("SegundoApe").value = perfil.apellido2;
			document.getElementById("fechaNac").value = perfil.fechaNac;
			document.getElementById("edad").value = perfil.edad;
			document.getElementById("telef").value = perfil.telefono;
			document.getElementById("email").value = perfil.correo;
			document.getElementById("fotoPerfil").src = perfil.img;
			document.getElementById("prevImg").src = perfil.img;
	}
	
}


	
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

	cargarUsuario();
	actualizarUltCompras();
	
	document.addEventListener("submit", function(e){
	
	        
			let perfil = {
				nombre1 : document.getElementById("PrimerNom").value,
				nombre2 : document.getElementById("SegundoNom").value,
				apellido1 : document.getElementById("PrimerApe").value,
				apellido2 : document.getElementById("SegundoApe").value,
				fechaNac : document.getElementById("fechaNac").value,
				edad : document.getElementById("edad").value,
				telefono : document.getElementById("telef").value,
				correo : document.getElementById("email").value,
				img : document.getElementById("urlImg").value,
			}
			localStorage.setItem('perfilUsu', JSON.stringify(perfil)); //este es el objeto que se guarda como string en el localstorage
			localStorage.setItem('UsuCargado', 'cargado'); //esta variable sirve para saber si hay un objeto guardado en la variable anterior, algo así como un interruptor, para no llamar a la otra variable que tiene el objeto cuando está vacío y evitar el error.
	
		});	
		
});

/*<script>
// Función que controla si hay campos inválidos
(function() {
  'use strict';
  window.addEventListener('submit', function() {
	
	var forms = document.getElementsByClassName('needs-validation');
	var pagoModal = document.getElementById('alertError');
	
	var validation = Array.prototype.filter.call(forms, function(form) {
	  form.addEventListener('submit', function(event) {
		if (form.checkValidity() === false){
		  event.preventDefault();
		  event.stopPropagation();
		  Swal.fire({
			icon: 'error',
			title: 'Oops...Parece que algo ha fallado :(',
			text: 'Por favor verifica haber completado todos los campos del formulario.',
		  })
		}
		if (form.checkValidity() === true){
		  event.preventDefault();
		  Swal.fire({
			icon: 'success',
			title: 'Los datos han sido guardados correctamente :)',
			text: '¡Puedes continuar comprando!',
		  })
		}
		form.classList.add('was-validated');
	  }, false);
	});
  }, false);
})();

</script>*/