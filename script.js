let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];
// Các vị trí để win???

const buttons = document.querySelectorAll('.button-option')
const restartBtn = document.getElementById('restart')
const newGameBtn = document.getElementById('new-game')
const popUp = document.querySelector('.popup')
const message = document.getElementById('message')

let xTurn = true;
let count = 0;

const disableBtn = () => {
    buttons.forEach((element) => (element.disabled = true))
    popUp.classList.remove('hide')
}

const enabledBtn = () => {
    buttons.forEach((element) => {
        element.disabled = false;
        element.innerText = ''
    })
    popUp.classList.add('hide')
}

newGameBtn.addEventListener('click', () => {
    count = 0;
    enabledBtn()
})

restartBtn.addEventListener('click', () => {
    count = 0;
    enabledBtn()
})

const drawFunc = () => {
    disableBtn()
    message.innerHTML = "&#x1F60E; <br> It's a Draw";
}

// Win function
const winFunc = (letter) => {
    disableBtn()
    if (letter == 'X') {
        message.innerHTML = "&#x1F389; <br> X Wins"
    } else {
        message.innerHTML = "&#x1F389; <br> O Wins"
    }
}

// Function check win 
const winCheck = () => {
    for (var i of winningPattern ) {
        let [element1, element2, element3] = [
            // Gắn button có key: i
            buttons[i[0]].innerText,
            buttons[i[1]].innerText,
            buttons[i[2]].innerText,
        ]
        if (element1 != '' && (element2 != '') && (element3 != '')) {
            if (element1 == element2 && element2 == element3) {
                winFunc(element1)
            }
        }
    }
}

// Display X/O click
buttons.forEach(element => {
    element.addEventListener('click', () => {
        if (xTurn) {
            xTurn = false;
            element.disabled = true;
            element.innerText = 'X'
        } else {
            xTurn = true
            element.disabled = true; // để ngăn chặn việc ấn lại làm mất dấu
            element.innerText = 'O'
        }
        // Lần đầu button nhận O, sau đó quay đầu (XTurn) chạy X, lúc này sẽ kiểm tra(WinFunc) xem có bằng nhau không
        count += 1;
        if (count == 9) {
            drawFunc()
        }
        winCheck()
    })
})

window.onload = enabledBtn;

// Ngăn chặn việc ấn lại 
// true/false: dùng khi muốn tái diễn lại hành động đó
// count: tính bước nhảy 

// buttons(NodeList) khi được gán key: i -> buttons sẽ được phân biệt rõ btn nào => buttons[i]
// display -> winCheck -> winFunc