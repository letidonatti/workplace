function showCategoriesList(array){
    hideSpinner();
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt=" " class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +` - `+ category.currency +` `+ commaSeparateNumber(category.cost) +`<br></h4>
                    </div>
                <div><p>` + category.description + `</p></div>
                </div>
                <div style="font-size: smaller; font-style: italic;" >` + category.soldCount + ` unidades </div>
            </div>
        </div>
        ` 
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        
    }
}
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
    
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            
            showCategoriesList(categoriesArray);
            
        }
    });
    
});