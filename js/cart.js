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
                                <td class="align-middle align-center"><input type="number" name="cantidad" id="${i}" onchange="changeArtCount(${i})" value="`+ article.count +`" min=0></td>
                                <td class="align-middle align-center" style="white-space:nowrap" id="subtotal${i}">USD `+ commaSeparateNumber(subtotal) +`</td>
                                
                            </tr><br>
                        
                    `            
        }
        document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;  
        document.getElementById("productPrice").innerHTML = commaSeparateNumber(subtotalProd); //subtotales          
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
    article.count = valor;
    totalPrecio = 0;
    subtotalProd = 0;
    subtotal = 0;
    showCartList(articlesArray);
    updateTotalPrice()
    
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
      
     //   sortAndShowCategories(ORDER_ASC_BY_PRICE, productsArray);
     articlesArray = cartObj.articles;
     showCartList(articlesArray);
        
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

});