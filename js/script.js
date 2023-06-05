// export default function randomizer();
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
    document.getElementById('input-m').value = document.getElementById('input-m').value;
    document.getElementById('input-n').value = document.getElementById('input-n').value;
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
}

function generateArray() {
    document.getElementById('array-m').value = document.getElementById('array-m').value;
    document.getElementById('array-n').value = document.getElementById('array-n').value;
    document.getElementById('array-count').value = document.getElementById('array-count').value;

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

    document.getElementById('array-output').value = output;
}



function stringTurn() {
    let input = document.getElementById('string-input').value;


    document.getElementById('string-output').value = input.split('').reverse().join('');
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

function findObjectByKeyAndValue(array, searchKey, searchValue) {
    let outputArray = new Array();
    array.forEach(element => {
        for (const [key, value] of Object.entries(element)) {
            if (key == searchKey && value == searchValue) {
                let outputObj = new Object();
                Object.assign(outputObj, element)
                // outputObj[searchKey] = searchValue;
                outputArray.push(outputObj);
            }
        }
    });
    return outputArray;
}

function setup() {
    let objects = [
        { name: 'Василий', surname: 'Васильев' },
        { name: 'Иван', surname: 'Иванов' },
        { name: 'Пётр', surname: 'Петров' },
        { name: 'Василий', surname: 'Петров' },
    ]
    searchResult = findObjectByKeyAndValue(objects, 'name', 'Василий');
    console.log('Найдены результаты: \n')
    searchResult.forEach(element => {
        for (const [key, value] of Object.entries(element)) {
            console.log(`${key}: ${value}`);
        }
    });
}



function getOptionsArray() {
    let optionsArray = [
        1,
        'two',
        new Date(),
        { value: 'choose', label: 'выбери' },
        { value: 'your', label: 'своего' },
        { value: 'fighter', label: 'бойца' },
    ]
    let newOptionsArray = [];

    optionsArray.forEach(element => {
        if ((typeof element === 'number')
            || (typeof element === 'string')
            || (element instanceof Date)) {
            newOptionsArray.push({ value: element, label: element })
        }
        else {
            newOptionsArray.push(element)
        }
    });
    return newOptionsArray;

}

// переменная, которая отслеживает, сколько секунд прошло
var nowSeconds = 0;
var intervalVariable;
var startBtn = document.querySelector('.timer-start');
var pauseBtn = document.querySelector('.timer-pause');

function startTimer() {
    let timerMinutes = parseInt(document.querySelector('.timer-minutes').value);
    let timerSeconds = parseInt(document.querySelector('.timer-seconds').value);

    if (nowSeconds == 0 && (timerMinutes != 0 || timerSeconds != 0)) {

        document.querySelector('.minutes').textContent = timerMinutes;
        document.querySelector('.seconds').textContent = timerSeconds;
        nowSeconds = timerMinutes * 60 + timerSeconds;
        renderTimer();
    } else if (nowSeconds = 0 && timerMinutes == 0 && timerSeconds == 0) {
        return;
    }

    startBtn.classList.toggle('hidden');
    pauseBtn.classList.toggle('hidden');
    intervalVariable = setInterval(timerTick, 1000);

}

function pauseTimer() {
    //pause timer
    startBtn.classList.toggle('hidden');
    pauseBtn.classList.toggle('hidden');
    clearInterval(intervalVariable);
}

function stopTimer() {
    //stop timer
    nowSeconds = 0;
    document.querySelector('.minutes').textContent = '00';
    document.querySelector('.seconds').textContent = '00';
    startBtn.classList.toggle('hidden');
    pauseBtn.classList.toggle('hidden');
    clearInterval(intervalVariable);
}

function secondsToTime(seconds) {
    // var h = parseInt(seconds / 3600 % 24);
    var m = parseInt(seconds / 60 % 60);
    var s = parseInt(seconds % 60);
    return { 'minutes': leadZero(parseInt(m)), 'seconds': leadZero(parseInt(s)) };
}

function leadZero(num) {
    var s = "" + num;
    if (s.length < 2) {
        s = "0" + s;
    }
    return s;
}

function renderTimer() {
    var timer_nums = secondsToTime(nowSeconds);
    document.querySelector('.minutes').textContent = timer_nums.minutes;
    document.querySelector('.seconds').textContent = timer_nums.seconds;
}

function timerTick() {
    nowSeconds--;
    renderTimer();
    if (nowSeconds == 0) {
        stopTimer();
    }



}

(function () {
    let form = document.getElementById('select');
    let select = document.createElement('select');
    select.className = 'form-select';
    form.insertAdjacentElement('beforeend', select);
    let defaultOption = document.createElement('option');
    defaultOption.textContent = 'Эти опции были созданы с помощью JS';
    select.insertAdjacentElement('beforeend', defaultOption)
    let optionsArray = getOptionsArray();
    optionsArray.forEach(element => {
        let option = document.createElement('option');
        option.value = element.value;
        option.textContent = element.label;
        select.insertAdjacentElement('beforeend', option)
    });

})();

$('body').on('input', '.input-number', function () {
    this.value = parseInt(this.value.replace(/[^\d.]/g, ''));

});