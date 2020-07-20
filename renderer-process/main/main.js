const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const btnMain = document.getElementById('btn-main');
let datePickField = document.getElementById('datepick');

btnMain.addEventListener('click', () => {
    let datepick = datePickField.value.split("-");
    let year = datepick[0];
    let month = datepick[1];
    let date = datepick[2];
    let kks = [];
    for (i = 1; i < 5; i++) {
        kks[i - 1] = document.getElementById(`kks-number-${i}`).value;
    };
    let data = {
        date,
        month,
        year,
        kks
    }
    ipcRenderer.send('main-start', data);
    // Set value back to ''
    for (i = 1; i < 5; i++) {
        document.getElementById(`kks-number-${i}`).value = '';
    };
});

ipcRenderer.on('res-input-kks', (event, result) => {
    if (!result) {
        inputSection.handleInputTrigger('input-kpm');
    } else {
        inputSection.handleInputTrigger('transaction');
    }
})

function _changeFocus(currentIndex, dest) {
    let intIndex = parseInt(currentIndex);
    if (dest === "next") {
        intIndex += 1;
    } else {
        intIndex -= 1;
    }
    const nextElement = document.getElementById(`kks-number-${intIndex}`);
    nextElement.focus();
}


function _onKKSKeyUpEvent(currentIndex, event) {
    const inputKKSNumber = document.getElementById(`kks-number-${currentIndex}`);
    const inputLength = inputKKSNumber.value.length;
    if (inputLength === 4) {
        if (currentIndex < 4) {
            _changeFocus(currentIndex, "next");
        }
    }
    if (inputLength === 0) {
        if (event.keyCode === 8) {
            if (currentIndex > 1) {
                _changeFocus(currentIndex, "before");
            }
        }
    }
}
function watchKKSEvent() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`kks-number-${i}`).addEventListener("keyup", (e) => {
            _onKKSKeyUpEvent(i, e);
        });
        document.getElementById(`kks-number-${i}`).addEventListener("click", e => {
            document.getElementById(`kks-number-${i}`).select();
        })
    }
}

watchKKSEvent();

document.body.addEventListener('click', (event) => {
    if (event.target.dataset.section) {
        for (i = 1; i < 5; i++) {
            document.getElementById(`kks-number-${i}`).value = null;
        };
    }
});