"use strict";
const min = 0;
const max = 15;
let count = 0;
let firstValue = 0;
let secondValue = 0;
let allCards = [];
let cards = document.getElementById("cards");
document.getElementById("replay").addEventListener("click", onReset, false);
document.getElementById("new-game").addEventListener("click", onNewGame, false);
window.addEventListener("DOMContentLoaded", onLoadCards);

let cardsValue = [
    '❤️', '😊', '⭐', '🎉',
    '🔥', '🚀', '💀', '🤢',
    '❤️', '😊', '⭐', '🎉',
    '🔥', '🚀', '💀', '🤢',
];

let cardsVisible = [
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
];

function generateRandomIndex(min, max) {
    let nb = min + (max - min + 1) * Math.random();
    return Math.floor(nb);
}

function onShuffleEmoji() {
    for (let i = 0; i < cardsValue.length; i++) {
        //PROF: ne doit pas partir du début à chaque fois
        let random = generateRandomIndex(min, max);
        let currentvalue = cardsValue[i];
        cardsValue[i] = cardsValue[random];
        cardsValue[random] = currentvalue;
    }
    return cardsValue;
}

function onLoadCards() {
    onShuffleEmoji(cardsValue);
    cards.innerHTML = "";

    for (let i = 0; i < cardsValue.length; i++) {
        if (cardsVisible[i]) {
            cards.innerHTML += `<div id="${i}">${cardsValue[i]}</div>`;
        }
        else {
            cards.innerHTML += `<div id="${i}">✖</div>`;
        }
    }

    allCards = document.querySelectorAll("div");
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener("click", onCardsClick, false);
    }
}

function onCardsClick(event) {
    if (isCardsSame()) {
        for (let i = 0; i < allCards.length; i++) {
            if (event.target.id == i) {
                cardsVisible[i] = true;
                allCards[i].innerHTML = cardsValue[i];
                count++;
                if (count == 1) {
                    firstValue = cardsValue[i];
                }
                else if (count == 2) {
                    secondValue = cardsValue[i];
                }
            }
        }
    }
}

function isCardsSame() {
    let isSame = true;
    if (count == 2) {
        if (firstValue != secondValue) {
            isSame = false;
        }
        else {
            count = 0;
            firstValue = 0;
            secondValue = 0;
        }
    }
    return isSame;
}

function onReset() {
    for (let i = 0; i < allCards.length; i++) {
        if ((!isCardsSame() || count == 1) && (cardsValue[i] == firstValue || cardsValue[i] == secondValue)) {
            allCards[i].innerHTML = "✖";
            cardsVisible[i] = false;
        }
    }
    count = 0;
}

function onNewGame() {
    for (let i = 0; i < cardsValue.length; i++) {
        cardsVisible[i] = false;
    }
    count = 0;
    onLoadCards();
}

