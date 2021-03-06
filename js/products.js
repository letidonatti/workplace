const ORDER_ASC_BY_PRICE = "Menor Precio";
const ORDER_DESC_BY_PRICE = "Mayor Precio";
const ORDER_BY_PROD_RELEV = "Recomendados";
var currentproductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
var busqueda = document.getElementById('search');


//ordena por precio y relevancia (más vendidos)
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_RELEV){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

//muestro los productos del Json
function showProductsList(array){
    hideSpinner();
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
    
//filtro de precio 
    if (((minPrice == undefined) || (minPrice != undefined && (product.cost) >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && (product.cost) <= maxPrice))){

        htmlContentToAppend += `
        <div class="col-sm-4">
        <a href="product-info.html" class="card mb-4 shadow-md custom-card">
                
                <img src="` + product.imgSrc + `" alt=" " class="bd-placeholder-img card-img-top">
                <h3 class="m-3">`+ product.name +`</h3>
                <div class="card-body">
                    <h4 class="card-text">`+ product.currency +` `+ commaSeparateNumber(product.cost) +`</h4>
                    <p>` + product.description + `</p>
                    <span style="font-size: smaller; font-style: italic;" >` + product.soldCount + ` vendidos </span>
                </div>
        </a>
        </div>
        `
        }
    if (htmlContentToAppend != ""){
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    } else{
        
        document.getElementById("cat-list-container").innerHTML = `
                                
                                <div class="col-sm-6 p-4 d-lg-none"> 
                                                                                                                                          
                                <br> No se encontraron productos que coincidan con su búsqueda. 
                                <br> Inténtelo nuevamente.<br>
                            
                                </div>
                                
                                <div class="row d-none d-lg-block"> 
                                
                                <br> No se encontraron productos que coincidan con su búsqueda. 
                                <br> Inténtelo nuevamente.<br>
                            
                                </div>`;
    }
    
 }; 
}
//para darle formato al precio separando miles con punto
function commaSeparateNumber(val){ 
    while (/(\d+)(\d{3})/.test(val.toString())){ 
     val = val.toString().replace(/(\d+)(\d{3})/, '$1'+' '+'$2'); 
    } 
    return val; 
    } 

//muestro los productos ordenados
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
   
       if(productsArray != undefined){
           currentproductsArray = productsArray;
       }
   
    currentproductsArray = sortProducts(currentSortCriteria, currentproductsArray);
    
    
    showProductsList(currentproductsArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
//obtengo el json
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
          
         //   sortAndShowCategories(ORDER_ASC_BY_PRICE, productsArray);

           showProductsList(productsArray);
            
        }
    });

//ordena por precio ascendente
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
    });

//ordena por precio descendente
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
    });

//ordena por relevancia descendente
    document.getElementById("sortByPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_RELEV, productsArray);
    });

//limpia los filtros de precio
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList(productsArray);
    });

//ordena por precio según filtro ingresado por el usuario
    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
       
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }
       
        showProductsList(productsArray);
    });

//barra buscadora en tiempo real
    busqueda.addEventListener('keyup', (e)=>{

        var valorBuscado = busqueda.value.toLowerCase(); 
        var filtroProductos = productsArray.filter(product =>{
            return(product.name.toLowerCase().includes(valorBuscado) || product.description.toLowerCase().includes(valorBuscado));
        });
        if (filtroProductos.length != 0){
        showProductsList(filtroProductos);
        }else{
            document.getElementById("cat-list-container").innerHTML = `<div class="col-sm-6 p-4 d-lg-none"> 
                                                                        
                                                                        <br> No se encontraron productos que coincidan con su búsqueda. 
                                                                        <br> Inténtelo nuevamente.<br>
                                                                    
                                                                        </div>
                                                                        <div class="row d-none d-lg-block"> 
                                                                        
                                                                        <br> No se encontraron productos que coincidan con su búsqueda. 
                                                                        <br> Inténtelo nuevamente.<br>
                                                                    
                                                                        </div>
                                                                        `;
        };
    });
}); 
  