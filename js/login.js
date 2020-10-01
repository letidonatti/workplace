

var inputUser = document.getElementById("username");
var inputPass = document.getElementById("inputPassword");
//control si el usuario y contraseña son válidos
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
//guarda el usuario y contraseña ingresados
function guardar(){
    var user = inputUser.value;
    var pass = inputPass.value;

    if (user != '' && pass != ''){
        localStorage.setItem("usuario", user);
        localStorage.setItem("contraseña", pass);
        if (pass.length > 6 && pass.length < 10){
            location.href ='cover.html';}
    }
}