import {Player} from "./Player";
import {settings as s} from "./settings";

(function (){
    const ticTacToe = {
        players: [new Player('js'), new Player('love')],
        scoreElements: Array.from(document.querySelectorAll('.result li')),
        ulAppElement: document.getElementById(s.appUlId),
        pTimeElement: document.querySelector(s.timeSelector),
        tiles: [],
        currentPlayer: 0,
        remainingTime: s.maxTime,
        timerId: null,
        init() {
            this.scoreTextContents = this.scoreElements.map(scoreElement => scoreElement.textContent);
            document.documentElement.classList.add(s.jsEnabledClass);
            for (let i = 0; i < s.maxTiles; i++) {
                this.generateLiItem();
            }
            this.previewPlayer();
            this.displayRemainingTime();
        },
        displayLostForm() {
            document.body.append(document.querySelector(s.lostFormSelector).content);
        },
        displayGameWinner() {
            if ((this.tiles[0].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[1].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[2].className.includes(this.players[this.currentPlayer].name)) ||
                (this.tiles[3].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[4].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[5].className.includes(this.players[this.currentPlayer].name)) ||
                (this.tiles[6].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[7].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[8].className.includes(this.players[this.currentPlayer].name)) ||
                (this.tiles[0].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[3].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[6].className.includes(this.players[this.currentPlayer].name)) ||
                (this.tiles[1].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[4].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[7].className.includes(this.players[this.currentPlayer].name)) ||
                (this.tiles[2].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[5].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[8].className.includes(this.players[this.currentPlayer].name)) ||
                (this.tiles[0].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[4].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[8].className.includes(this.players[this.currentPlayer].name)) ||
                (this.tiles[2].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[4].className.includes(this.players[this.currentPlayer].name) &&
                    this.tiles[6].className.includes(this.players[this.currentPlayer].name))
            ) {
                document.body.append(document.querySelector(s.winnerFormSelector + "--" + this.players[this.currentPlayer].name).content);
                clearInterval(this.timerId);
            } else if (this.players[0].score + this.players[1].score === s.maxTiles) {
                document.body.append(document.querySelector(s.lostFormSelector).content);
                clearInterval(this.timerId);
            }
        },
        updateTimer() {
            this.remainingTime--;
            this.displayRemainingTime();
            if (this.remainingTime === 0) {
                clearInterval(this.timerId); // Pour arrêter le chrono
                this.displayLostForm();
            }
        },
        play(clickedLi) {
            if (this.timerId === null) {
                this.timerId = setInterval(() => {  // On créer le chrono et on le décrémente de 1 toutes les 1 secondes (1000ms)
                    this.updateTimer();
                }, 1000)
            }
            if (clickedLi.classList.length === 1) {
                clickedLi.classList.add(s.tilesBaseClass + "--" + this.players[this.currentPlayer].name);
                this.players[this.currentPlayer].score++;
            }
            this.displayScore();
            this.displayGameWinner();
            if (this.currentPlayer === 0) {
                this.currentPlayer = 1;
            } else {
                this.currentPlayer = 0;
            }this.previewPlayer();
        },
        displayScore() {
            this.scoreElements[this.currentPlayer].textContent = this.scoreTextContents[this.currentPlayer] + " " + this.players[this.currentPlayer].score;
        },
        previewPlayer() {
            this.ulAppElement.className = s.appUlClass + " " + this.players[this.currentPlayer].name;
        },
        displayRemainingTime() {
            this.pTimeElement.textContent = `${this.addZero(Math.trunc(this.remainingTime / 60))}:${this.addZero(Math.trunc(this.remainingTime % 60))}`;
        },
        addZero(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number + "";
        },
        generateLiItem() {
            const liElement = document.createElement('li');
            liElement.className = s.tilesBaseClass;
            liElement.addEventListener('click', evt => {
                this.play(evt.currentTarget);
            })
            this.ulAppElement.appendChild(liElement);
            this.tiles.push(liElement);
        }
    }
    ticTacToe.init();
})();
