const PESOS = "UYU";
const COTIZACION = 40;
const CART_JSON = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var totalPrecio = 0;
var subtotalProd = 0;
var envio = 0;
var subtotal = 0; 
var articlesArray = [];

function showCartList(array){
    
    let htmlContentToAppend = ``;
    subtotalProd = 0;
    subtotal = 0;

    if (array.length == 0){
      htmlContentToAppend = `<br><div style="text-align: center">No hay artículos seleccionados </div><br>`
    }else{
    for(let i = 0; i < array.length; i++){
        
        let article = array[i];
        subtotal = subTotalArt(article.currency, article.unitCost, article.count);
        subtotalProd += subtotal; 
        if (i===0){
            htmlContentToAppend += `
            <tr class="thead-light">
            <th>   </th>
            <th>Artículos</th>
            <th>Costo</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>   </th>
            </tr>`
        }
        htmlContentToAppend += `
                        
                            <tr>    
                                <td class="align-middle align-center" scope="row"><img style="height:8em" src="` + article.src + `" alt=" " class="img-thumbnail"></td>
                                <td class="align-middle align-center" style="font-size: larger;">`+ article.name +`</td>
                                <td class="align-middle align-center" style="white-space:nowrap">`+ article.currency +` `+ commaSeparateNumber(article.unitCost) +`</td>
                                <td class="align-middle align-center"><input type="number" name="cantidad" id="${i}" onchange="changeArtCount(${i})" value="`+ article.count +`" min=0 style="width:5ch"></td>
                                <td class="align-middle align-center" style="white-space:nowrap" id="subtotal${i}">USD `+ commaSeparateNumber(subtotal) +`</td>
                                <td class="align-middle align-center" style="font-size: larger;"><button id="boton`+i+`" onclick="eliminarArt(`+i+`)">Eliminar</button></td>
                            </tr><br>
                        
                    `            
        }
      }
        document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;  //contenido del carrito
        document.getElementById("productPrice").innerHTML = commaSeparateNumber(subtotalProd); //subtotales de la tabla final
        actualizarBadgeCarrito(); //actualiza el badge del menú desplegable  
        updateTotalPrice(); //actualizo valores de la tabla de totales        
    }



// función que calcula los subtotales según el precio, la moneda y la cantidad de artículos

function subTotalArt(moneda, precio, cantidad){
    if (moneda===PESOS){
        precio=precio/COTIZACION;
    }
    return precio*cantidad;
}

//separador de miles para el precio
function commaSeparateNumber(val){ 
    while (/(\d+)(\d{3})/.test(val.toString())){ 
     val = val.toString().replace(/(\d+)(\d{3})/, '$1'+' '+'$2'); 
    } 
    return val; 
    } 

// función que actualiza los precios del cuadro de Costos
function updateTotalPrice(){

    totalPrecio = subtotalProd + envio * subtotalProd;
    document.getElementById("productPrice").innerHTML = commaSeparateNumber(subtotalProd); //subtotales
    document.getElementById("sendPrice").innerHTML = commaSeparateNumber((envio * subtotalProd).toFixed(2)); //envío
    document.getElementById("totalAPagar").innerHTML = commaSeparateNumber(totalPrecio); //total
}

//función que actualiza el subtotal cuando se cambia el valor del count de un artículo.
function changeArtCount(i){
    
    let valor = document.getElementById(i).value;
    let article = articlesArray[i];
    article.count = parseInt(valor);
    totalPrecio = 0;
    subtotalProd = 0;
    subtotal = 0;
    showCartList(articlesArray);
    updateTotalPrice();
    localStorage.setItem('listaCarrito', JSON.stringify(articlesArray));
    actualizarBadgeCarrito();
}

//función que actualiza el badge del menu desplegable según la cantidad de artículos que haya de cada elemento del array
function actualizarBadgeCarrito(){

    if(localStorage.getItem('listaCargada') != null){ 
        listado=localStorage.getItem('listaCarrito');
        listado= JSON.parse(listado);
    }
    let cantPorProd = 0;
    for(let i = 0; i < listado.length; i++){
        
        let article = listado[i];
        cantPorProd += article.count;

    }
    document.getElementById("badgeCarrito").innerHTML = cantPorProd;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
//obtengo el json
getJSONData(CART_JSON).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        cartObj = resultObj.data;
      
    
     articlesArray = cartObj.articles;
    
     //guardar listado en el localstorage
     
    localStorage.setItem('listaCarrito', JSON.stringify(articlesArray)); //este es el array que se guarda como string en el localstorage
    localStorage.setItem('listaCargada', 'cargada'); //esta variable sirve para saber si hay un array guardado en la variable anterior, algo así como un interruptor, para no llamar a la otra variable que tiene el array cuando está vacío y evitar el error.
         
     //mostrar carrito
     showCartList(articlesArray);
        
     //muestro mensaje en Forma de Pago. Este mensaje se pisa si selecciona el medio de pago.
    document.getElementById("alertError").innerHTML = "No ha seleccionado medio de pago.";
    }
});

    // calculo de precio de envío
    document.getElementById("premiumradio").addEventListener("click", function() {
        envio = document.getElementById("premiumradio").value;
        updateTotalPrice();
    });

    document.getElementById("expressradio").addEventListener("click", function() {
        envio = document.getElementById("expressradio").value;
        updateTotalPrice();
    });

    document.getElementById("standardradio").addEventListener("click", function() {
        envio = document.getElementById("standardradio").value;
        updateTotalPrice();
    });

    
    // muestro los datos según el tipo de envío seleccionado
    document.getElementById("TjaCred").addEventListener("click", function() {
        let htmlContentToAppend = ``;
        htmlContentToAppend += `
        <br>
        <p class="mb-3">Ingresa los datos de tu tarjeta y <span style="color:red;">selecciona la cantidad de cuotas</span> que más te convenga</p>                
        <div class="row">
        <div class="col-md-8 mb-3">
          <label for="NombreTitular">Nombre del titular</label>
          <input type="text" class="form-control" id="NombreTitular" placeholder="Nombre como figura en la tarjeta" value="" required>
          <div class="invalid-feedback">
            Ingresa el nombre del titular
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <label for="NumTja">Número de la tarjeta</label>
          <input type="number" class="form-control" id="NumTja" placeholder="" value="" min= 10000000000000 max=99999999999999 required>
          <div class="invalid-feedback">
            Ingresa el número de tu tarjeta
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <label for="vtoTja">Vencimiento</label>
          <input type="month" class="form-control" id="vtoTja" placeholder="mm/yy" value="" required>
          <div class="invalid-feedback">
            Ingresa el vencimiento
          </div>
        </div>
        <div class="col-md-2 mb-3">
        <label for="cvvTja">CVV</label>
        <input type="number" class="form-control" id="cvvTja" placeholder="CVV" value="" min= 100 max=999 required>
        <div class="invalid-feedback">
          Ingresa el código de verificación
        </div>
      </div>
        <div class="col-md-4 mb-3">
          <label for="cuotas">Cantidad de cuotas</label>
          <select name="Cant.cuotas" class="form-control" id="cuotas" placeholder="" value="" required>
            <option>1 cuota</option>
            <option>3 cuotas</option>
            <option>6 cuotas</option>
            <option>12 cuotas</option>
            </select>
          <div class="invalid-feedback">
            Ingresa la cantidad de cuotas
          </div>
        </div>
      </div><br>
        `
        document.getElementById("datosTjaCred").innerHTML = htmlContentToAppend;
        document.getElementById("datosTransBanc").innerHTML = "";             
    });

    document.getElementById("TransBanc").addEventListener("click", function() {
        let htmlContentToAppend = ``;
        htmlContentToAppend += `
        <br>
        <p class="mb-3">Ingresa los datos de tu cuenta bancaria para la transferencia</p>                
        <div class="row">
        <div class="col-md-8 mb-3">
          <label for="NombreTitularCuenta">Nombre del titular</label>
          <input type="text" class="form-control" id="NombreTitularCuenta" placeholder="Nombre del titular como figura en la cuenta" value="" required>
          <div class="invalid-feedback">
            Ingresa el nombre del titular de la cuenta
          </div>
        </div>
        <div class="col-md-4 mb-3">
            <label for="PaisCuenta">País de la cuenta</label>
            <input type="text" class="form-control" id="PaisCuenta" placeholder="Ingrese el país" value="" required>
            <div class="invalid-feedback">
            Ingresa el país de la cuenta
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <label for="banco">Banco</label>
            <select name="tuBanco" class="form-control" id="banco" placeholder="Seleccione su banco" value="" required>
                <option defaultSelected style="color:grey;">Selecciona tu banco...</option>
                <option>BBVA</option>
                <option>BROU</option>
                <option>HSBC</option>
                <option>Itaú</option>
                <option>Santander</option>
                <option>Scotiabank</option>
            </select>
        <div class="invalid-feedback">
          Selecciona el nombre del banco
        </div>
      </div>
        <div class="col-md-4 mb-3">
          <label for="NumTja">Número de cuenta</label>
          <input type="number" class="form-control" id="NumTja" placeholder="" value="" min= 10000000000000 max=99999999999999 required>
          <div class="invalid-feedback">
            Ingresa el número de tu tarjeta
          </div>
        </div>
        <div class="col-md-4 mb-3">
        <label for="tipoCuenta">Tipo de cuenta</label>
        <select name="tipoCuenta" class="form-control" id="tipoCuenta" placeholder="Seleccione el tipo de cuenta" value="" required>
            <option defaultSelected style="color:grey;">Selecciona el tipo de cuenta...</option>
            <option>Caja de ahorro ($)</option>
            <option>Caja de ahorro (USD)</option>
            <option>Cuenta corriente ($)</option>
            <option>Cuenta corriente (USD)</option>
        </select>
    <div class="invalid-feedback">
      Selecciona el tipo de cuenta
    </div>
      </div><br>
        `
        document.getElementById("datosTransBanc").innerHTML = htmlContentToAppend; 
        document.getElementById("datosTjaCred").innerHTML = "";
    });
});

function eliminarArt(i){

  articlesArray.splice(i, 1);
  showCartList(articlesArray);
  localStorage.setItem('listaCarrito', JSON.stringify(articlesArray));
  actualizarBadgeCarrito();
}