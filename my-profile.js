
//función que actualiza las últimas compras según el listado del carrito

function actualizarUltCompras(){
	
	let htmlContentToAppend = ``;
    if(localStorage.getItem('listaCargada') != null){ 
        listado=localStorage.getItem('listaCarrito');
        listado= JSON.parse(listado);
    
		for(let i = 0; i < listado.length; i++){
			
			let article = listado[i];
			htmlContentToAppend += `
				<div class="col">
					<img src="` + article.src + `" alt=" " class="img-thumbnail mh-5">
				</div>
			 `
		}
	}else{
	htmlContentToAppend = 'Aún no ha realizado compras.'
	}
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;  //contenido del carrito
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

	actualizarUltCompras();
});