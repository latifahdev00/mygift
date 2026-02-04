/**
 * Core Typewriter Effect
 */
function typeWriter(text, elementId, speed) {
    let i = 0;
    let element = document.getElementById(elementId);
    if (!element) return;

    element.innerHTML = "";
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (elementId === "main-desc") {
            // Show start button after description finished
            document.getElementById('start-btn').style.display = 'block';
        }
    }
    type();
}

/**
 * Initial Load Sequence
 */
window.onload = function () {
    setTimeout(() => {
        typeWriter("To the one who lightens up my world,", "main-title", 70);
    }, 500);

    setTimeout(() => {
        typeWriter("You were always on my mind, so I made this gift for you. Every time you find yourself here, know that you are always in my heart and on my mind <3", "main-desc", 40);
    }, 3500);
};

/**
 * Hero Content Transition
 */
function changeContent() {
    const container = document.getElementById('hero-content');
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = `
            <h1 class="hero-text" id="new-title"></h1>
            <p class="paragraph" id="new-desc"></p>
            <button type="button" class="btn" onclick="showQuestion()">Continue</button>
        `;
        container.style.opacity = '1';
        typeWriter("This is for you,", "new-title", 70);

        setTimeout(() => {
            typeWriter("For the sunshine that makes my world bloom, I hope this little space brings you even a fraction of the warmth you bring into my life.", "new-desc", 40);
        }, 1500);
    }, 500);
}

/**
 * Mood Slider Stage
 */
function showQuestion() {
    const container = document.getElementById('hero-content');
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = `
            <h1 class="hero-text" id="question-title"></h1>
            <div id="slider-container" style="opacity: 0; transition: opacity 0.8s ease;">
                <div class="range-markers">
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
                <input type="range" min="1" max="100" value="50" class="mood-slider" id="moodRange">
                <p class="paragraph" id="mood-status" style="margin-top: 10px;">Slide to tell me...</p>
                <div id="meme-container" style="margin: 20px auto; height: 150px; display: flex; justify-content: center; align-items: center;">
                    <img id="mood-meme" src="" style="max-height: 100%; border-radius: 15px; opacity: 0; transition: opacity 0.3s ease;">
                </div>
                <button type="button" class="btn" style="margin-top: 20px;" onclick="finalQuestion()">Continue</button>
            </div>
        `;
        container.style.opacity = '1';
        typeWriter("How are you really feeling?", "question-title", 50);

        setTimeout(() => {
            document.getElementById('slider-container').style.opacity = '1';
            const slider = document.getElementById('moodRange');
            const status = document.getElementById('mood-status');
            const memeImg = document.getElementById('mood-meme');

            const updateMood = () => {
                let val = slider.value;
                let text, response, imgSrc;

                if (val <= 20) {
                    text = '"Honestly, it’s been a heavy day."';
                    response = "Drop everything and talk to me. I'm not asking, I'm telling you 😾!";
                    imgSrc = "imgs/sad.jpg";
                } else if (val <= 40) {
                    text = '"Just trying to get through the day."';
                    response = "Text me RIGHT NOW. I’m waiting, don’t make me come find you!";
                    imgSrc = "imgs/v_sad.jpg";
                } else if (val <= 60) {
                    text = '"Not great, not bad. I’m just here."';
                    response = "Neutral? No way. Tell me what's actually on your mind RIGHT NOW!";
                    imgSrc = "imgs/okay.jpg";
                } else if (val <= 80) {
                    text = '"I’m feeling light and peaceful."';
                    response = "I love this! Now tell me what happened? I want details!";
                    imgSrc = "imgs/good.jpg";
                } else {
                    text = '"My heart is truly happy right now."';
                    response = "Awww >ω< I love seeing you happy!";
                    imgSrc = "imgs/happy.jpg";
                }

                status.innerHTML = `${text}<br><span style="font-size: 0.80rem; color: #9A86A4; font-weight: bold;">${response}</span>`;
                memeImg.src = imgSrc;
                memeImg.style.opacity = '1';
            };
            slider.oninput = updateMood;
        }, 1200);
    }, 500);
}

/**
 * "Did you miss me?" Logic
 */
function finalQuestion() {
    const container = document.getElementById('hero-content');
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = `
            <h1 class="hero-text" id="final-title"></h1>
            <div id="final-area" style="opacity: 0; transition: opacity 0.8s ease; margin-top: 20px; text-align: center;">
                <div id="btn-group" >
                    <button type="button" class="btn" onclick="finish('yes')">Yes</button>
                    <button type="button" class="btn" onclick="finish('def')">Definitely yes</button>
                </div>
                <img id="final-meme" src="" style="display: none; width: 160px; border-radius: 15px; margin: 0 auto;">
                <p class="paragraph" id="final-msg" style="margin-top: 15px;"></p>
                <button id="back-btn" type="button" class="btn" style="display:none; margin-top: 15px; font-size: 0.8rem;" onclick="finalQuestion()">Try again 🫵🏼</button>
                <button id="next-btn" type="button" class="btn" style="display:none; margin-top: 15px;" onclick="typingStage()">Next</button>
            </div>
        `;
        container.style.opacity = '1';
        typeWriter("Did you miss me?", "final-title", 50);
        setTimeout(() => { document.getElementById('final-area').style.opacity = '1'; }, 1200);
    }, 500);
}

function finish(choice) {
    const btnGroup = document.getElementById('btn-group');
    const memeImg = document.getElementById('final-meme');
    const msgText = document.getElementById('final-msg');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');

    btnGroup.style.display = 'none';

    if (choice === 'yes') {
        memeImg.src = "/imgs/judge.jpg";
        msgText.innerHTML = "HEHE, i knew it! You better choose definitely next time!";
        backBtn.style.display = 'inline-block';
    } else {
        memeImg.src = "imgs/shy.jpg";
        msgText.innerHTML = "Aww >ω<, I miss you more! <br>";
        nextBtn.style.display = 'inline-block';
    }

    memeImg.style.display = 'block';
}

/**
 * Affirmation Typing Stage
 */
let targetText = "";

function typingStage() {
    const affirmations = [
        "I believe in myself", "I deserve the best", "I trust myself",
        "I can do anything", "I forgive my mistakes", "I can control my mind",
        "I care for myself", "I can get better"
    ];

    targetText = affirmations[Math.floor(Math.random() * affirmations.length)];
    const container = document.getElementById('hero-content');

    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = `
            <div class="type-chl" style="margin-top: 150px; margin-bottom: 5px; text-align: center;">
                <p class="paragraph" id="typethis">Type this to yourself:</p>
                <h2 class="hero-text" style="color: #9A86A4; font-size: 1.4rem; margin-top: 10px; margin-bottom: 15px;">"${targetText}"</h2>
                <input type="text" id="userInput" class="confirm-input" placeholder="Believe it..." oninput="checkTyping(this)" autocomplete="off">
                <p id="error-text" class="error-msg">Type it right or we're staying here forever!</p>
                <div id="success-area" style="margin-top: 15px;">
                    <p id="success-msg" class="success-msg"></p>  
                    <br>
                    <img id="success-meme" src="" style="display: none; width: 150px; border-radius: 15px; margin: 0 auto 10px;">
                </div>                       
            </div>
        `;
        container.style.opacity = '1';
        setTimeout(() => document.getElementById('userInput').focus(), 100);
    }, 400);
}

function checkTyping(el) {
    const val = el.value.trim().toLowerCase();
    const target = targetText.toLowerCase();

    const successMsg = document.getElementById('success-msg');
    const succImg = document.getElementById('success-meme');
    const errorMsg = document.getElementById('error-text');

    if (val === target) {
        successMsg.innerHTML = "Congratulations! You win a virtual hug 🫵🏼✨";
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        succImg.src = "/imgs/hug.jpg";
        succImg.style.display = 'block';
        el.style.borderColor = "#2ecc71";
        el.style.color = "#2ecc71";
        el.disabled = true;
    } else {
        if (val !== target.substring(0, val.length)) {
            errorMsg.style.display = 'block';
            el.style.borderColor = "#e74c3c";
            el.classList.add('shake');
            setTimeout(() => el.classList.remove('shake'), 300);
        } else {
            errorMsg.style.display = 'none';
            el.style.borderColor = "rgba(154, 134, 164, 0.3)";
        }
    }
}

/**
 * Venting Space & Journaling
 */
function openVentSpace() {
    const mainContainer = document.querySelector('.hero-container');
    mainContainer.innerHTML = `
        <div class="vent-container">
            <h2 class="hero-text" id="vent-title" style="margin-top: 50px;">This space is yours, sweetheart );</h2>
            <p class="paragraph">Write freely, no one’s reading. Everything stays right here on your device, just for you — so there’s no need to filter your thoughts.</p>
            <textarea id="ventInput" class="vent-area" placeholder="What’s been on your mind lately?" style="border-color: #EAD6EE; background: #FFFBFF;"></textarea>
            <div id="btn-group" style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
                <button class="btn" onclick="saveThought(); showArchive()" style="background: #9A86A4; color: #fff;">Save</button>
                <button class="btn" onclick="window.location.reload();">Back</button>
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showArchive() {
    const mainContainer = document.querySelector('.hero-container');
    let archive = JSON.parse(localStorage.getItem('myThoughts')) || [];

    let archiveHTML = `
        <div class="vent-container" style="width: 100%; max-width: 600px; padding: 10px;">
            <h2 class="hero-text" style="margin-top: 50px;">Your Messages</h2>
            <div style="width: 100%; text-align: left; margin-bottom: 20px;">
    `;

    if (archive.length === 0) {
        archiveHTML += `<p class="paragraph">Your space is empty for now. Fill it whenever you feel like it.</p>`;
    } else {
        archive.forEach((item, index) => {
            archiveHTML += `
                <div style="background: #ffffff; padding: 20px; border-radius: 18px; margin-bottom: 15px; border: 1px solid #F3EAF5; position: relative; box-shadow: 0 4px 15px rgba(154, 134, 164, 0.05);">
                    <small style="color: #B1A2B8; display: block; margin-bottom: 8px;">On ${item.date}</small>
                    <p style="margin: 0; color: #527291; line-height: 1.6;">${item.text}</p>
                    <span onclick="deleteSingleThought(${index})" style="position: absolute; top: 15px; right: 15px; cursor: pointer; color: #D1C4D4; font-size: 1.2rem;">&times;</span>
                </div>
            `;
        });
    }

    archiveHTML += `
            </div>
        <div style="display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%; flex-wrap: nowrap;">
            <button class="btn" onclick="clearArchive();" style="background: #e74c3c; color:#fff; margin: 0; min-width: 150px; flex: 1; max-width: 170px;">Clear</button>
            <button class="btn" onclick="window.location.reload();" style="margin: 0; min-width: 150px; flex: 1; max-width: 170px;">Back Home</button>
        </div>
    </div>
    `;

    mainContainer.innerHTML = archiveHTML;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveThought() {
    const text = document.getElementById('ventInput').value;
    if (!text.trim()) return;

    // Format date: 02 February 2026
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = new Date().toLocaleDateString('en-GB', options);

    const newThought = { text: text, date: date };
    let archive = JSON.parse(localStorage.getItem('myThoughts')) || [];
    archive.unshift(newThought);
    localStorage.setItem('myThoughts', JSON.stringify(archive));

    alert("Saved ✨");
    document.getElementById('ventInput').value = "";
}

function clearArchive() {
    if (confirm("Are you sure you want to delete all saved thoughts?")) {
        localStorage.removeItem('myThoughts');
        showArchive();
    }
}

function deleteSingleThought(index) {
    let archive = JSON.parse(localStorage.getItem('myThoughts')) || [];
    if (confirm("Delete this thought?")) {
        archive.splice(index, 1);
        localStorage.setItem('myThoughts', JSON.stringify(archive));
        showArchive();
    }
}