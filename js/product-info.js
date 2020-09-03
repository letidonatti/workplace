var product = {};
var relatedProduct = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail imagenesProd" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Muestro los productos relacionados del array relatedProducts de la info del producto y 
//el Json de Productos
function showRelatedProducts(array){

    
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        var relIndex = array[i];
        var relProd = relatedProduct[relIndex];
    
        htmlContentToAppend += `
        <a href="product-info.html" class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + relProd.imgSrc + `" alt="">
            <h4 class="mb-1">`+ relProd.name +`</h4>
            <p class="mb-1">` + relProd.description + `</p>
            </div>
        </a>
        `
    }
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

//separador de miles para el precio
function commaSeparateNumber(val){ 
    while (/(\d+)(\d{3})/.test(val.toString())){ 
     val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2'); 
    } 
    return val; 
    } 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productPriceHTML = document.getElementById("productPrice");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productPriceHTML.innerHTML = product.currency + " " + commaSeparateNumber(product.cost);

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            
        }
    });
    //cargo el Json de los productos para poder mostrar los relacionados
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") { relatedProduct = resultObj.data; }

        //Muestro los productos relacionados
        showRelatedProducts(product.relatedProducts);
    });
});