let player = {
    name: "",
    skinColor: "#8d5524",
    outfitColor: "#1f6feb",
    background: "", // "Lapo" or "Nepo"
    age: 12,
    termCount: 0, // 0 to 18 terms
    classes: ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"]
};

function goToWheel() {
    const nameVal = document.getElementById("player-name").value.trim();
    if (!nameVal) {
        alert("Please enter your character's name!");
        return;
    }
    player.name = nameVal;
    player.skinColor = document.getElementById("skin-color").value;
    player.outfitColor = document.getElementById("outfit-color").value;

    document.getElementById("custom-screen").classList.add("hidden");
    document.getElementById("wheel-screen").classList.remove("hidden");
}

function spinDestinyWheel() {
    const outcomes = ["🔴 Lapo (Trenches Hustle)", "🟢 Nepo (Soft Life Backing)"];
    const chosen = outcomes[Math.floor(Math.random() * outcomes.length)];
    player.background = chosen;

    const wheelDisplay = document.getElementById("wheel-display");
    wheelDisplay.innerText = `Result: ${chosen}`;
    document.getElementById("enter-school-btn").classList.remove("hidden");
}

function enterSchool() {
    document.getElementById("wheel-screen").classList.add("hidden");
    document.getElementById("school-screen").classList.remove("hidden");
    updateSchoolHUD();
}

function updateSchoolHUD() {
    let currentClass = player.classes[Math.floor(player.termCount / 3)] || "Graduate";
    document.getElementById("hud-name").innerText = `Name: ${player.name}`;
    document.getElementById("hud-age").innerText = `Age: ${player.age}`;
    document.getElementById("hud-class").innerText = `Class: ${currentClass}`;
    document.getElementById("hud-bg").innerText = `Background: ${player.background.includes("Lapo") ? "Lapo" : "Nepo"}`;
}

function advanceTerm() {
    if (player.termCount < 18) {
        player.termCount++;
        player.age = 12 + Math.floor(player.termCount / 3);
        updateSchoolHUD();
        
        const currentClass = player.classes[Math.floor(player.termCount / 3)] || "Graduated";
        alert(`Term completed! You are now in ${currentClass} at age ${player.age}.`);
    } else {
        alert("You have completed secondary school and graduated! Real world awaits.");
    }
}

function changeLocation(loc) {
    const teacherBox = document.getElementById("teacher-box");
    if(loc === 'Classroom') {
        teacherBox.innerText = "👩‍🏫 AI Teacher: Eyes on the chalkboard! No whispering.";
    } else if(loc === 'Hallway') {
        teacherBox.innerText = "🚶‍♂️ Hallway: Prefects are patrolling! Watch your step.";
    } else if(loc === 'TuckShop') {
        teacherBox.innerText = "🛒 Tuck Shop: Buying cold Pepsi and gala during short break!";
    }
}

function sendChatMessage() {
    const input = document.getElementById("chat-input");
    const chatMsgs = document.getElementById("chat-messages");
    if(!input.value.trim()) return;

    chatMsgs.innerHTML += `<p><strong>${player.name}:</strong> ${input.value}</p>`;
    input.value = "";
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
}
