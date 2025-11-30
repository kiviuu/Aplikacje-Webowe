// config
const cvs = document.getElementById("bird-game");
const ctx = cvs.getContext("2d");
let frames = 0;
const DEGREE = Math.PI / 180;
const pipe_ratio = 100;
const bonus_ratio = 350;
// assets
const spriteBirdUp = new Image();   
spriteBirdUp.src = "up1.png";

const spriteBirdMid = new Image();  
spriteBirdMid.src = "middle1.png";

const spriteBirdDown = new Image(); 
spriteBirdDown.src = "down1.png";

const bgImg = new Image();          
bgImg.src = "background-day.png";

const fgImg = new Image();          
fgImg.src = "base.png";

const pipeNorthImg = new Image();   
pipeNorthImg.src = "pipe-green.png";

const pipeSouthImg = new Image();   
pipeSouthImg.src = "pipe-green.png";

const digitImages = [];
for (let i = 0; i < 10; i++) {
    let img = new Image();
    img.src = i + ".png";
    digitImages.push(img);
}

const score_sound = new Audio("point.wav");
const flap_sound = new Audio("wing.wav");
const hit_sound = new Audio("hit.wav");
const swoosh_sound = new Audio("swoosh.wav");
const die_sound = new Audio("die.wav");

const bg_music = new Audio("bg_sound.mp3");
bg_music.loop = true;
bg_music.volume = 0.5;

// game state
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    falling: 2,
    spinning: 3,
    over: 4
};

// start button
const startBtn = document.getElementById("restart-btn");
startBtn.addEventListener("click", function() {
    resetGame();
    bg_music.play();
});

// control
document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        switch (state.current) {
            case state.getReady:
                state.current = state.game;
                swoosh_sound.play();
                document.getElementById("start-screen").classList.add("hidden");
                break;
            case state.game:
                bird.flap();
                flap_sound.play();
                bg_music.play();
                break;
        }
    }
});

// background
const bg = {
    x: 0, 
    y: 0, 
    w: 320, 
    h: 480,
    draw: function() {
        ctx.drawImage(bgImg, this.x, this.y, this.w, this.h);
    }
};

// base
const fg = {
    x: 0,
    y: cvs.height - 112,
    w: 336,
    h: 112,
    dx: 2, // ???????????????
    draw: function() {
        ctx.drawImage(fgImg, this.x, this.y, this.w, this.h);
        ctx.drawImage(fgImg, this.x + this.w, this.y, this.w, this.h);
    },
    update: function() {
        if (state.current == state.game) {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
    }
};

// bird
const bird = {
    animation: [spriteBirdMid, spriteBirdUp, spriteBirdMid, spriteBirdDown],
    x: 50,
    y: 150,
    w: 34,
    h: 24,
    frame: 0,
    speed: 0,
    gravity: 0.25,
    jump: 4.6,
    rotation: 0,
    radius: 12, // for collision

    // bonus variable
    isGhost: false,
    ghostTimer: 0,
    draw: function() {
        let birdC = this.animation[this.frame];
        ctx.save();
        ctx.translate(this.x, this.y);

        if (state.current == state.getReady) {
            this.rotation = 0;
        } else if (state.current == state.spinning) {
            // to fix ?
            this.rotation += 10 * DEGREE;
        } else {
            // fly up-down bird rotatation
            if (this.speed < this.jump/2) {
                this.rotation = -25 * DEGREE;
            } else {
                this.rotation += 5 * DEGREE;
                this.rotation = Math.min(this.rotation, 90 * DEGREE);
            }
        }
        ctx.rotate(this.rotation);
        if (this.isGhost) {
            ctx.globalAlpha = 0.5;
        }
        ctx.drawImage(birdC, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
    },

    flap: function() {
        this.speed = -this.jump;
    },

    update: function() {
        this.frame += frames % 10 == 0 ? 1 : 0;
        this.frame = this.frame % this.animation.length;
        
        if (state.current == state.getReady) {
            this.y = 150; // base y
            this.rotation = 0 * DEGREE;
        } else {
            // bird falling
            this.speed += this.gravity;
            this.y += this.speed;
            
            // base collision
            if (this.y + this.h/2 >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h - this.h/2;
                if (state.current == state.game || state.current == state.falling) {
                    endGameLogic();
                }
            }
        }

        // ghost logic
        if (this.isGhost) {
            this.ghostTimer--;
            if (this.ghostTimer <= 0) 
                this.isGhost = false;
        }
    }
};

const pipes = {
    position: [],
    w: 52,
    h: 400,
    gap: 100, // pipe spacing
    dx: 2,

    draw: function() {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let topY = p.y;
            let bottomY = p.y + this.h + this.gap;
            ctx.save(); 
            // top pipe
            ctx.translate(p.x + this.w/2, topY + this.h);
            ctx.rotate(180 * DEGREE);
            ctx.drawImage(pipeNorthImg, -this.w/2, 0, this.w, this.h);
            ctx.restore();

            // bottom pipe
            ctx.drawImage(pipeSouthImg, p.x, bottomY, this.w, this.h);
        }
    },

    update: function() {
        if (state.current !== state.game) return;

        // new pipe
        if (frames % pipe_ratio == 0) {
            this.position.push({
                x: cvs.width,
                y: -150 * (Math.random() + 1)
            });
        }

        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let bottomPipeY = p.y + this.h + this.gap;
 
            // pipe collision
            if (!bird.isGhost) {
                if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && 
                   (bird.y - bird.radius < p.y + this.h || bird.y + bird.radius > bottomPipeY)) {
                    hit_sound.play();
                    state.current = state.falling;
                }
            }
            // move pipe
            p.x -= this.dx;
            if (p.x + this.w <= 0) {
                this.position.shift();
                score.value += 1;
                score_sound.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("flappyBest", score.best);
            }
        }
    },

    reset: function() {
        this.position = [];
    }
};

// 5 points bonus
const bonuses = {
    items: [], // {x, y, type: 'ghost' | 'fast'}
    
    draw: function() {
        for(let item of this.items) {
            ctx.fillStyle = item.type === 'ghost' ? 'rgba(255, 255, 255, 1.0)' : 'rgba(255, 215, 0, 1.0)';
            ctx.beginPath();
            ctx.arc(item.x, item.y, 10, 0, Math.PI*2);
            ctx.fill();
        }
    },
    
    update: function() {
        if (state.current !== state.game) return;

        // spawn
        if (frames % bonus_ratio == 0) {
            this.items.push({
                x: cvs.width,
                y: Math.random() * (cvs.height - fg.h - 50) + 50,
                //fix me
                type: Math.random() > 0.5 ? 'ghost' : 'fast'
            });
        }
        
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            item.x -= 2;

            // obtain bonus - collision
            let dx = bird.x - item.x;
            let dy = bird.y - item.y;
            let distance = Math.sqrt(dx*dx + dy*dy); // 2d vector norm
            
            if (distance < bird.radius + 10) {
                swoosh_sound.play();
                if (item.type === 'ghost') {
                    bird.isGhost = true;
                    bird.ghostTimer = 300;
                } else if (item.type === 'fast') {
                    score.value += 5;
                    // fix me - teleport into pipe
                    bird.isGhost = true;
                    bird.ghostTimer = 120;
                    pipes.position.forEach(p => p.x -= 100);
                }
                this.items.splice(i, 1);
                continue;
            }
            if (item.x < 0) this.items.shift();
        }
    },
    
    reset: function() {
        this.items = [];
    }
};

// current counter
const score = {
    best: localStorage.getItem("flappyBest") || 0,
    value: 0,
    
    draw: function() {
        if (state.current == state.game || state.current == state.falling) {
            let scoreStr = this.value.toString();
            const dW = 24; 
            const dH = 36;
            const gap = 2; // digit spacing
            
            let totalWidth = (dW + gap) * scoreStr.length;
            let startX = cvs.width - totalWidth - 20; 
            let y = 20;

            for (let i = 0; i < scoreStr.length; i++) {
                let digit = parseInt(scoreStr[i]);
                ctx.drawImage(digitImages[digit], startX, y, dW, dH);
                startX += dW + gap;
            }
        }
    },
    reset: function() {
        this.value = 0;
    }
};
function endGameLogic() {
    if (state.current == state.over || state.current == state.spinning) return;

    die_sound.play();
    bg_music.pause();

    // new record?
    let previousBest = parseInt(localStorage.getItem("flappyBest")) || 0;
    console.log("1prev " + previousBest + " curr "+score.value);
    if (score.value > previousBest) {
        // new record to fix
        // no i czemu nie działasz??????
        console.log("prev " + previousBest + " curr "+score.value);
        saveHighScore(score.value);
        state.current = state.spinning;
        document.getElementById("congrats-screen").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("congrats-screen").classList.add("hidden");
            showGameOverScreen();
        }, 3000);
    } else {
        saveHighScore(score.value);
        showGameOverScreen();
    }
    
}

function showGameOverScreen() {
    state.current = state.over;
    document.getElementById("game-over-screen").classList.remove("hidden");
    document.getElementById("current-score").innerText = score.value;
    document.getElementById("best-score").innerText = score.best;
    
    updateHighScoreList();
}

function saveHighScore(newScore) {
    let highScores = JSON.parse(localStorage.getItem('flappyHighScores')) || [];
    highScores.push(newScore);
    highScores.sort((a, b) => b - a); // wtf?
    highScores = highScores.slice(0, 5);
    localStorage.setItem('flappyHighScores', JSON.stringify(highScores));
}

function updateHighScoreList() {
    let list = document.getElementById("high-score-list");
    list.innerHTML = "";
    let highScores = JSON.parse(localStorage.getItem('flappyHighScores')) || [];
    
    highScores.forEach((s, index) => {
        let li = document.createElement("li");
        li.innerText = `${index + 1}. ${s} pkt`;
        list.appendChild(li);
    });
}

function resetGame() {

    // base values
    bird.speed = 0;
    bird.rotation = 0;
    bird.isGhost = false;
    pipes.reset();
    bonuses.reset();
    score.reset();
    frames = 0;
    state.current = state.getReady;
    
    document.getElementById("game-over-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}

// main loop
function loop() {
    bg.draw();
    pipes.draw();
    bonuses.draw();
    fg.draw();
    bird.draw();
    score.draw();
    
    // onUpdate
    bird.update();
    fg.update();
    pipes.update();
    bonuses.update();
    
    frames++;
    requestAnimationFrame(loop);
}

loop();