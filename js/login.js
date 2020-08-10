
var errorSpan = document.getElementById("formErrorUser");
var input = document.getElementById("username");

input.addEventListener('invalid', function (e) {
    errorSpan.innerHTML = "El nombre de usuario debe tener entre 1 y 15 caracteres";
});

var errorSpan = document.getElementById("formErrorPass");
var input = document.getElementById("inputPassword");

input.addEventListener('invalid', function (e) {
    errorSpan.innerHTML = "La contraseña debe tener entre 6 y 8 caracteres";
});

    
   
