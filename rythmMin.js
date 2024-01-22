class Note {
    constructor(x) {
        this.x = x;
        this.y = 10;
        this.isFalling = false;
    }
    static width = 50;
    static height = 13.5;
    static speed = 1;

    draw(ctx) {
        ctx.fillStyle = 'red';   // 노트를 칠하고
        ctx.fillRect(this.x, this.y, Note.width, Note.height);  // 노트의 영역 그리기
    }

    fall() {
        this.isFalling = true; // 노트를 떨어지는 상태로 변경함
    }

    move() {
        if (this.isFalling) { // 떨어지는 상태일때만 움직임 
            this.y += Note.speed;  // 현재 y값(초기값)에 스피드만큼 더한다..
        }
    }

    isNoteReachedEnd(canvas) {
        return this.y >= canvas.height - Note.height;  // 정해진 값 연산해서 .. this.y랑 비교
                                                    // return 값에 비교연산자가 있으면 false true 리턴함 
    }
}

class NoteType extends Note {
    constructor(key) {
        let superValue = 0;
        switch (key) {
            case 0:
                superValue = 0;
                break;
            case 1:
                superValue = 50;
                break;
            case 2:
                superValue = 100;
                break;
            case 3:
                superValue = 150;
                break;
            case 4:
                superValue = 200;
                break;
            case 5:
                superValue = 250;
                break;
            default:
                // Handle default case or other values here
                break;
        }
        super(superValue);
        this.key = key; // Assign the key value to the NoteType object
    }
}

const timeStamp = [1,3,15];
const time = 100;
const notes = [];
for (i = 0; i < timeStamp.length; i++) {
    notes.push(new NoteType(Math.floor(Math.random() * 6)));
}
let currentNoteIndex = 0;
// let startgame;
let seconds = 0;
let tempidx = 0;

function startgame() {  // 처음게임 시작
    startTime = Date.now();
    setInterval(gameLoop, 10); // 1초마다 gameLoop() 함수 호출
}

function gameLoop() {
    if (time == seconds) {
        document.getElementById('endscr').style.display = 'block';
        document.getElementById('gamescr').style.display = 'none';
        return;
    }
    disPlayTime();

        if (timeStamp[tempidx] === seconds) {
            notes[currentNoteIndex].fall();  // 등록된 노트랑 현재 시간이 같으면 노트 등록됨.. fall값 true 
            tempidx++;
            currentNoteIndex++;
        }


    // for (let i = 0; i < timeStamp.length; i++) {  //경과시간에 해달하는 배열의 값순간에 노트를 만듬
    //     console.log('h' + timeStamp[i])
    //     if (timeStamp[i] === seconds) {
    //         notes[currentNoteIndex].fall();
    //         currentNoteIndex++;
    //     }
    // }

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // 그리기 전에 캔버스 초기화..

    notes.forEach(note => {  //  노트 그리기 반복문.. for(note : index)
        if (note.isFalling) {
            note.move();
            note.draw(ctx);

            if (note.isNoteReachedEnd(canvas)) {  //return 값이 들어가 있음 ..
                // note = null;
                console.log(`Note ${note.key} reached the end!`);
            }
        }
    });
}

function disPlayTime() {  // 현재 시간 구하기
    const currTime = Date.now();
    const playTime = currTime - startTime;
    seconds = playTime
    timeDisplay.innerText = `Play Time: ${seconds / 1000} seconds`;  //경과시간 출력
}


let timeDisplay = document.getElementById('timeDisplay');