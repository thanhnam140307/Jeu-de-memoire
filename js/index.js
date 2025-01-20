"use strict";

let errorName = document.getElementById("error-name");
document.getElementById("my-form").addEventListener("submit", onFormSubmitted, false);

function onFormSubmitted(event) {
    let isValid = true;
    let notSpaceCharacter = 0;
    let name = document.getElementById("txt-name").value;
    clearErrors();

    for (let i = 0; i < name.length; i++) {
        if (name[i] != " "){
            notSpaceCharacter++;
        }
    }

    if (!validateRequiredField(name) || notSpaceCharacter == 0) {
        errorName.innerHTML += `<p id="error-name" class="error"> Veuillez saisir votre nom</p>`;
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
}

function validateRequiredField(field) {
    let isValid = true;

    if (field == "") {
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    errorName.textContent = "";
}
