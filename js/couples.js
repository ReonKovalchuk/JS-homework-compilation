
let flippedCards = 0;
let fieldSize;


function createPairsApp(containerClass = '.pairs-app') {
    let app = document.querySelector(containerClass);
    let startGameForm = createStartGameForm();
    let fieldContainer = document.createElement('div');
    fieldContainer.classList.add('square-container');
    app.append(startGameForm);
    app.append(fieldContainer);
}

function createStartGameForm() {
    let form = document.createElement('form');
    let groupText = document.createElement('span');
    let input = document.createElement('input');
    let btn = document.createElement('button');

    form.classList.add('input-group', 'mb-3');

    groupText.classList.add('input-group-text');
    groupText.textContent = 'Сложность (размер поля)';

    input.classList.add('field-size', 'form-control');
    input.type = 'number';
    input.min = '2';
    input.max = '10';
    input.step = '2';
    input.placeholder = 'Чётное число от 2 до 10';

    btn.classList.add('btn', 'btn-outline-dark');
    btn.textContent = 'Играть!';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        fieldSize = document.querySelector('.field-size').value
        if (fieldSize % 2 != 0
            || fieldSize < 2
            || fieldSize > 10) {
            fieldSize = 4;
            document.querySelector('.field-size').value = 4;
        }
        document.querySelector('body').style.setProperty('--fieldSize', document.querySelector('.field-size').value);
        createFlipCardsField();
    })

    form.append(groupText);
    form.append(input);
    form.append(btn);

    return form;

    // <form class="input-group mb-3">
    //     <span class="input-group-text">Сложность (размер поля)</span>
    //     <input type="number" min="2" max="10" class="field-size form-control" step="2"
    //         placeholder="чётное число от 2 до 10">
    //         <button class="btn btn-outline-dark play-pairs" type="submit">Играть!</button>
    // </form>
}

function createFlipCardsField() {
    let fieldContainer = document.querySelector('.square-container');
    fieldContainer.innerHTML = '';

    // fieldSize = document.querySelector('.field-size').value
    numArray = createNumbersArray();
    for (let i = 0; i < fieldSize * fieldSize; i++) {
        let flipCard = createFlipCard(numArray[i]);
        fieldContainer.append(flipCard.card);

    }
}


function createFlipCard(content) {
    // 
    let card = document.createElement('div');
    let flipCardInner = document.createElement('div');
    let flipCardFront = document.createElement('div');
    let flipCardBack = document.createElement('div');
    // 
    card.classList.add('flip-card', 'animate__animated', 'animate__jackInTheBox');
    flipCardInner.classList.add('flip-card-inner');
    flipCardFront.classList.add('flip-card-front');
    flipCardBack.classList.add('flip-card-back');
    flipCardBack.textContent = content;

    card.addEventListener('click', function () {
        if (this.classList.contains('transform-active')) {
            flippedCards--;
        } else {
            flippedCards++;
            if (flippedCards == 2) {
                //compare this one and another active card
                let thisValue = flipCardBack.textContent;
                let otherCard = document.querySelector('.transform-active');

                if (thisValue == otherCard.lastChild.textContent) {
                    //show, hide , reset and return 
                    card.classList.toggle('transform-active');
                    setTimeout(() => {
                        resetTransform();
                        this.classList.remove('animate__jackInTheBox');
                        this.classList.add('animate__fadeOut');
                        this.classList.add('hidden-card');

                        otherCard.classList.remove('animate__jackInTheBox');
                        otherCard.classList.add('animate__fadeOut');
                        otherCard.classList.add('hidden-card');

                        if (document.querySelectorAll('.hidden-card').length == fieldSize * fieldSize) {
                            //victory

                            setTimeout(() => {
                                fieldContainer = document.querySelector('.square-container');
                                fieldContainer.innerHTML = '';
                                victoryContainer = document.createElement('div');
                                victoryContainer.classList.add('victory-container', 'animate__bounceInDown', 'animate__animated');
                                victoryContainer.textContent = 'Победа!';
                                fieldContainer.append(victoryContainer);
                            }, 400);
                        };
                    }, 400);
                } else {
                    card.classList.toggle('transform-active');
                    setTimeout(() => {
                        resetTransform();
                    }, 400);

                }
            } else {
                card.classList.toggle('transform-active');
            }
        }


    })
    // squareContainer.append(flipCard);
    card.append(flipCardInner);
    flipCardInner.append(flipCardFront);
    flipCardInner.append(flipCardBack);

    return {
        card, flipCardBack
    };
    // <div class="square-container">

    //     <div class=" flip-card">
    //         <div class=" flip-card-inner">
    //             <div class="flip-card-front">

    //             </div>
    //             <div class="flip-card-back">
    //                 <p>1</p>
    //             </div>
    //         </div>
    //     </div>
    // </div>
}

function resetTransform() {
    let flippedCardsArr = document.querySelectorAll('.transform-active');
    flippedCardsArr.forEach(element => {
        element.classList.toggle('transform-active');
        flippedCards = 0;
    })
}

function createNumbersArray() {
    let numArray = [];
    const numberOfElements = (fieldSize * fieldSize) / 2;
    for (let i = 1; i < numberOfElements + 1; i++) {
        numArray.push(i, i);
    }

    return fyShuffle(numArray);
}

function fyShuffle(arr) {
    let i = arr.length;
    while (--i > 0) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    return arr;
}


// function victory() {
//     fieldContainer = document.querySelector('.square-container');
//     fieldContainer.innerHTML = '';
//     victoryContainer = document.createElement('div');
//     victoryContainer.classList.add('victory-container', 'animate__bounceInDown', 'animate__animated');
//     victoryContainer.textContent = 'Победа!';
//     fieldContainer.append(victoryContainer);
// }


document.addEventListener('DOMContentLoaded', function () {

    createPairsApp();

});

