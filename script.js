// =========================================
// CARD MASTERS
// PART 3A - GAME ENGINE
// =========================================

// ---------- HTML ELEMENTS ----------

const home = document.getElementById("home");
const game = document.getElementById("game");
const winner = document.getElementById("winner");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const pack = document.getElementById("pack");
const gameCard = document.getElementById("gameCard");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");
const choices = document.getElementById("choices");

const cardTitle = document.getElementById("cardTitle");
const cardFact = document.getElementById("cardFact");

const progressBar = document.getElementById("progressBar");

const currentGroupText =
document.getElementById("currentGroup");

const winnerText =
document.getElementById("winnerText");

const score1 =
document.getElementById("score1");

const score2 =
document.getElementById("score2");

const score3 =
document.getElementById("score3");

// ---------- GAME VARIABLES ----------

let scores = [0,0,0];

let currentGroup = 0;

let currentQuestion = 0;

let answered = false;

// ---------- QUESTIONS ----------

const questions = [

{
title:"🎴 Pokémon TCG",
fact:"Pokémon Trading Card Game was first released as a physical card game in 1996. Today, players can also enjoy it on mobile.",
question:"Which company owns the Pokémon franchise?",
choices:[
"Nintendo",
"Sony",
"Microsoft",
"Sega"
],
correct:0
},

{
title:"⚔️ Hearthstone",
fact:"Hearthstone is a digital trading card game released by Blizzard Entertainment in 2014.",
question:"Who developed Hearthstone?",
choices:[
"Riot Games",
"Supercell",
"Blizzard Entertainment",
"EA Sports"
],
correct:2
},

{
title:"🦸 Marvel Snap",
fact:"Marvel Snap features famous Marvel superheroes and villains in fast-paced card battles.",
question:"Marvel Snap is based on which universe?",
choices:[
"DC",
"Marvel",
"Pokémon",
"Star Wars"
],
correct:1
},

{
title:"🟡 UNO! Mobile",
fact:"UNO! Mobile lets players enjoy the classic card game online with friends.",
question:"UNO originally started as a...",
choices:[
"Physical Card Game",
"Video Game",
"Board Game",
"Arcade Game"
],
correct:0
},

{
title:"🐉 Yu-Gi-Oh! Duel Links",
fact:"Yu-Gi-Oh! Duel Links brings the famous anime card game to mobile devices.",
question:"What type of game is Yu-Gi-Oh! Duel Links?",
choices:[
"Puzzle Game",
"Trading Card Game",
"Sports Game",
"Racing Game"
],
correct:1
},

{
title:"🏰 Clash Royale",
fact:"Clash Royale combines collectible cards with real-time strategy.",
question:"Who developed Clash Royale?",
choices:[
"Blizzard Entertainment",
"Supercell",
"Riot Games",
"Mojang"
],
correct:1
},

{
title:"⚔️ Legends of Runeterra",
fact:"Legends of Runeterra is based on the League of Legends universe.",
question:"Legends of Runeterra belongs to which game universe?",
choices:[
"Pokémon",
"League of Legends",
"Minecraft",
"Fortnite"
],
correct:1
},

{
title:"🃏 GWENT",
fact:"GWENT first appeared as a mini-game in The Witcher 3.",
question:"GWENT originally came from which game?",
choices:[
"The Witcher 3",
"Skyrim",
"Elden Ring",
"Dark Souls"
],
correct:0
},

{
title:"🥷 Card Thief",
fact:"Card Thief is a stealth card game where players steal treasure without getting caught.",
question:"What is the main objective in Card Thief?",
choices:[
"Build a city",
"Steal treasure",
"Win a race",
"Score goals"
],
correct:1
},

{
title:"🗡️ Slay the Spire",
fact:"Slay the Spire combines deck-building with roguelike gameplay.",
question:"What genre best describes Slay the Spire?",
choices:[
"Deck-building Roguelike",
"Sports",
"Racing",
"First-Person Shooter"
],
correct:0
}

];

// ---------- START GAME ----------

startBtn.onclick = () => {

    home.classList.add("hidden");

    game.classList.remove("hidden");

    loadQuestion();

};

// ---------- OPEN CARD PACK ----------

pack.onclick = () => {

    pack.classList.add("open");

    setTimeout(()=>{

        pack.style.display="none";

        gameCard.classList.remove("hidden");

        quiz.classList.remove("hidden");

    },500);

};

// ---------- LOAD QUESTION ----------

function loadQuestion(){

    answered = false;

    pack.style.display = "flex";

    gameCard.classList.add("hidden");

    quiz.classList.add("hidden");

    nextBtn.classList.add("hidden");

    const q = questions[currentQuestion];

    if(!q){

        endGame();

        return;

    }

    cardTitle.textContent = q.title;

    cardFact.textContent = q.fact;

    question.textContent = q.question;

    choices.innerHTML = "";

    currentGroupText.textContent =
    "GROUP " + (currentGroup + 1);

    let percent =
    (currentQuestion / questions.length) * 100;

    progressBar.style.width =
    percent + "%";

    createChoices();
}

function createChoices(){

    choices.innerHTML="";

    const q=questions[currentQuestion];

    q.choices.forEach((choice,index)=>{

        const btn=document.createElement("button");

        btn.className="choice";

        btn.textContent=choice;

        btn.onclick=()=>checkAnswer(index);

        choices.appendChild(btn);

    });

}

// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer(selected){

    if(answered){
        return;
    }

    answered = true;

    const q = questions[currentQuestion];

    const buttons = document.querySelectorAll(".choice");

    buttons.forEach(btn=>{
        btn.disabled = true;
    });

    const buttons=document.querySelectorAll(".choice");

if(selected===q.correct){

    scores[currentGroup]++;

    buttons[selected].classList.add("correct");

    setTimeout(()=>{

        alert("✅ Correct! +1 Point");

    },300);

}else{

    scores[currentGroup]--;

    buttons[selected].classList.add("wrong");

    document.body.classList.add("shake");

    setTimeout(()=>{

        document.body.classList.remove("shake");

        alert("❌ Wrong! -1 Point");

    },300);

}

    updateScores();

    nextBtn.classList.remove("hidden");

}

// ===============================
// UPDATE SCOREBOARD
// ===============================

function updateScores(){

    score1.textContent = scores[0];
    score2.textContent = scores[1];
    score3.textContent = scores[2];

}

// ===============================
// NEXT TURN
// ===============================

nextBtn.onclick = () => {

    currentGroup++;

    if(currentGroup > 2){

        currentGroup = 0;

        currentQuestion++;

    }

    loadQuestion();

};

// ===============================
// END GAME
// ===============================

function endGame(){

    game.classList.add("hidden");

    winner.classList.remove("hidden");

    progressBar.style.width = "100%";

    const highest = Math.max(...scores);

    let winners = [];

    for(let i=0;i<scores.length;i++){

        if(scores[i] === highest){

            winners.push("GROUP " + (i+1));

        }

    }

    if(winners.length === 1){

        winnerText.textContent = "🏆 " + winners[0] + " WINS!";

    }else{

        winnerText.textContent = "🤝 IT'S A TIE! " + winners.join(" & ");

    }

}
