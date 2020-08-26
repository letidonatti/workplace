const ORDER_ASC_BY_PRICE = "Menor Precio";
const ORDER_DESC_BY_PRICE = "Mayor Precio";
const ORDER_BY_PROD_RELEV = "Recomendados";
var currentproductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

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
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt=" " class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +` - `+ product.currency +` `+ commaSeparateNumber(product.cost) +`<br></h4>
                    </div>
                <div><p>` + product.description + `</p></div>
                </div>
                <div style="font-size: smaller; font-style: italic;" >` + product.soldCount + ` vendidos </div>
            </div>
        </div>
        `
        };  
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        
    }
}
//para darle formato al precio separando miles con .
function commaSeparateNumber(val){ 
    while (/(\d+)(\d{3})/.test(val.toString())){ 
     val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2'); 
    } 
    return val; 
    } 

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
   
       if(productsArray != undefined){
           currentproductsArray = productsArray;
       }
   
    currentproductsArray = sortProducts(currentSortCriteria, currentproductsArray);
    
    //Muestro las categorías ordenadas
    showProductsList(currentproductsArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
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
 }); 