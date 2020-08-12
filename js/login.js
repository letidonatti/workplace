


var inputUser = document.getElementById("username");
var inputPass = document.getElementById("inputPassword");
 
inputUser.addEventListener('invalid', function (e) {
    e.preventDefault();
    var errorSpan = document.getElementById("formErrorUser");
    errorSpan.innerHTML = "El nombre de usuario no puede ser vacío";

    inputPass.addEventListener('invalid', function (e) {
        e.preventDefault();
        var errorSpan = document.getElementById("formErrorPass");
        errorSpan.innerHTML = "La contraseña debe tener entre 6 y 10 caracteres";
    });
}); 
inputPass.addEventListener('invalid', function (e) {
    e.preventDefault();
    var errorSpan = document.getElementById("formErrorPass");
    errorSpan.innerHTML = "Ingrese su contraseña";
});

    
   
