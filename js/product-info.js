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
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + relProd.imgSrc + `" alt="">
            <h4 class="mb-1">`+ relProd.name +`</h4>
            <p class="mb-1">` + relProd.description + `</p>
            <a href="product-info.html">Ver producto</a>
            </div>
        </div>
        `
    }
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

function showStars(stars){

    let estrellitas  = "";

    for(let i = 0; i < stars; i++){
        estrellitas += `<span style="font-size: 30px; color:orange;">★</span>`
    }
    for(let i = stars; i < 5; i++){
        estrellitas += `<span style="font-size: 30px; color: grey;">★</span>`
    }
    return estrellitas
}

// muestro los comentarios que vienen en el Json
function showComments(array){
    
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        var comment = array[i];
    
        htmlContentToAppend += `
        <table style="width:100%">
  
            <tr>
                <th><b>`+ comment.user +`</b>`+ ` ` + showStars(parseInt(comment.score)) +`</th>
            </tr>
            <tr>
                <td><i>`+ comment.description +`</i></td>
            </tr>
            <tr>
                <td><small>`+ comment.dateTime +`</small></td>
            </tr>
        </table>
        <br><br><br><br>
        `
    }
        document.getElementById("comments").innerHTML = htmlContentToAppend;
}

//separador de miles para el precio
function commaSeparateNumber(val){ 
    while (/(\d+)(\d{3})/.test(val.toString())){ 
     val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2'); 
    } 
    return val; 
    } 

//calcular la fecha actual
function fechaDeHoy(){
    
    var hoy = new Date();
    if ((hoy.getMonth()+1)<10){
        var mes="0"+(hoy.getMonth()+1);
    };
    if (hoy.getDate()<10){
        var dia="0"+hoy.getDate();
    };
    var fecha = hoy.getFullYear() + '-' + mes + '-' + dia;
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;

    return fechaYHora;
}

//función para guardar el comentario en el array
function saveComment(){

    var userComment = {score:"", description:"", user:"", dateTime:""};
    var radios = document.getElementsByName("estrellas");
    var i = 0
    while (i < radios.length) {
        if (radios[i].checked) {
            userComment.score = radios[i].value;};
        i++
    };
    userComment.description = document.getElementById("textComment").value;
    userComment.user = localStorage.getItem("usuario");
    userComment.dateTime = fechaDeHoy();
    // lo agrego al array de comentarios y lo muestro de nuevo para que actualice
    comments.push(userComment);
    showComments(comments);
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
    //cargo el Json de los comentarios para poder mostrarlos
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") { comments = resultObj.data; }

        //Muestro los comentarios
        showComments(comments);
    });
});