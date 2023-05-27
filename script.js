const main = document.getElementById('main');
function area(x1, y1, x2, y2) {
    sideA = Math.abs(x1 - x2);
    sideB = Math.abs(y1 - y2);
    return sideA * sideB;
};

// console.log(area(2, 3, 10, 5));
// console.log(area(10, 5, 2, 3));
// console.log(area(-5, 8, 10, 5));
// console.log(area(5, 8, 5, 5));
// console.log(area(8, 1, 5, 1));

function comparison(a, b, precision) {


    let aDec = Math.floor((Math.abs(a) % 1) * Math.pow(10, precision));
    let bDec = Math.floor((Math.abs(b) % 1) * Math.pow(10, precision));

    aDec = Number('0.' + String(aDec));
    if (a < 0) {
        aDec *= -1;
    }
    bDec = Number('0.' + String(bDec));
    if (b < 0) {
        bDec *= -1;
    }


    main.innerHTML += '<br><br> Исходные числа: <br> a = ' + a
        + ', b = ' + b
        + ', точность ' + precision;
    main.innerHTML += ' <br> Дробные части: a  ' + aDec + ' b ' + bDec;
    main.innerHTML += ' <br> Дробные части равны? ' + (aDec === bDec);
    main.innerHTML += ' <br> Первая дробная часть больше? ' + (aDec > bDec);

};


// comparison(13.123456789, 2.123, 5);
// comparison(13.890123, 2.891564, 2);
// comparison(13.890123, 2.891564, 3);
// comparison(-13.890123, 2.891564, 2);

function randomizer(m, n) {

    if (m == n) {
        alert('Некорректные входные данные');
        return undefined;
    };
    let range = Math.abs(m - n);
    let numberInRange = Math.round(Math.random() * range);
    let min = Math.min(m, n);
    let output = min + numberInRange;
    return output;
};

function oddRandomizer() {
    document.getElementById('input-m').value = Math.trunc(document.getElementById('input-m').value);
    document.getElementById('input-n').value = Math.trunc(document.getElementById('input-n').value);
    let m = document.getElementById('input-m').value;
    let n = document.getElementById('input-n').value;
    let output = randomizer(m, n);

    if (output == undefined) {
        document.getElementById('output').value = undefined;
        return
    };

    if (output % 2 == 0) {
        output -= 1;
        if (output < min) {
            output += 2;
        };
    };
    console.log(output);
    document.getElementById('output').value = output;
};


function passwordCheck() {
    let elPassword = document.getElementById('password');
    elPassword.value = elPassword.value.trim();
    let password = elPassword.value;
    let errorField = document.getElementsByClassName('error-field')[0];
    if (password.length < 4) {
        elPassword.classList.remove('correct');
        elPassword.classList.add('error');
        errorField.innerHTML = 'Пароль должен содержать от 4х символов'

    } else if (!(password.includes('_') || password.includes('-'))) {
        errorField.innerHTML = 'Пароль должен содержать символ "_" или "-"!';
        elPassword.classList.remove('correct');
        elPassword.classList.add('error');
    }
    else {
        elPassword.classList.remove('error');
        elPassword.classList.add('correct');
        errorField.innerHTML = '';
    };

};

function NormalizeName() {
    let name = document.getElementById('name').value;
    let nameArray = name.toLowerCase().split(' ');
    let newName = '';
    nameArray.forEach(element => {
        firstChar = element.charAt(0);
        firstCharNew = firstChar.toUpperCase();
        let NewElement = element.replace(firstChar, firstCharNew);
        newName = newName + ' ' + NewElement;
    });
    newName = newName.trim();
    document.getElementById('name').value = newName;
    // if (name === newName) {
    //     alert('Имя не менялось');
    // } else {
    //     alert('Имя изменено');
    // }
}

function generateArray() {
    document.getElementById('array-m').value = Math.trunc(document.getElementById('array-m').value);
    document.getElementById('array-n').value = Math.trunc(document.getElementById('array-n').value);
    document.getElementById('array-count').value = Math.trunc(document.getElementById('array-count').value);

    let m = document.getElementById('array-m').value;
    let n = document.getElementById('array-n').value;
    let count = document.getElementById('array-count').value;
    if ((m == n) || (count == 0) || count < 0) {
        alert('Некорректные входные данные');
        return;
    };
    let output = '';
    for (let i = 0; i < count; i++) {
        let randomNumber = randomizer(m, n);
        output += `${parseInt(i) + 1}. ${randomNumber} \n`;
    }

    document.getElementById('array-output').innerHTML = output;
}



function stringTurn() {
    let input = document.getElementById('string-input').value;
    let output = '';
    for (let i = input.length - 1; i > -1; i--) {
        output += input[i];
    };

    document.getElementById('string-output').value = output;
}

var minesSpan = document.getElementsByClassName('mine');
var minesCheckbox = document.getElementsByClassName('checkbox');

function clearMineField(clearMines = true) {
    for (let i = 0; i < minesSpan.length; i++) {
        const SpanEl = minesSpan[i];
        SpanEl.classList.remove('ok', 'damaged', 'destroyed');
        if (clearMines) {
            const CheckboxEl = minesCheckbox[i];
            CheckboxEl.checked = 0;
        }
    }
    document.getElementsByClassName('mission-status')[0].classList.remove('show');
}

function startTank() {
    clearMineField(false);
    setTimeout(moveTank, 5)

}

function moveTank() {
    let tankHP = 2;
    let i = 0;
    for (i; i < minesSpan.length; i++) {
        const SpanEl = minesSpan[i];
        const CheckboxEl = minesCheckbox[i];

        if (CheckboxEl.checked == 1) {
            tankHP--;
        };

        if (tankHP == 2) {
            SpanEl.classList.add('ok')
        }
        else if (tankHP == 1) {
            SpanEl.classList.add('damaged')
        }
        else if (tankHP == 0) {
            SpanEl.classList.add('destroyed');
            break;
        };
    }

    setTimeout(showMissionStatus, 1000 + 1000 * i, tankHP)
}

function showMissionStatus(tankHP) {
    let message = '';
    if (tankHP == 2) {
        message = 'Танк цел'
    } else if (tankHP == 1) {
        message = 'Танк повреждён'
    } else {
        message = 'Танк уничтожен'
    }
    let missionStatus = document.getElementsByClassName('mission-status')[0]
    missionStatus.innerHTML = message;
    missionStatus.classList.add('show');
}