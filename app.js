let player = {
    name: "",
    skinColor: "#8d5524",
    outfitColor: "#1f6feb",
    background: null,
    age: 12,
    termCount: 0,
    classes: ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"],
    energy: 100,
    hunger: 92,
    money: 2500
};

function proceedToWheel() {
    const nameInput = document.getElementById("input-name").value.trim();
    if (!nameInput) {
        alert("Please enter your character's name!");
        return;
    }
    player.name = nameInput;
    player.skinColor = document.getElementById("input-skin").value;
    player.outfitColor = document.getElementById("input-outfit").value;

    document.getElementById("screen-custom").classList.add("hidden");
    document.getElementById("screen-wheel").classList.remove("hidden");
}

function spinWheel() {
    const outcomes = [
        { type: "Lapo", text: "🔴 Lapo! Trenches background. High grit, pure hustle!" },
        { type: "Nepo", text: "🟢 Nepo! Soft life background. Family connections unlocked!" }
    ];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    player.background = result.type;

    document.getElementById("wheel-box").innerHTML = `<span>${result.text}</span>`;
    document.getElementById("btn-spin").classList.add("hidden");
    document.getElementById("btn-enter-school").classList.remove("hidden");
}

function enterSchoolWorld() {
    document.getElementById("screen-wheel").classList.add("hidden");
    document.getElementById("screen-school").classList.remove("hidden");
    
    // Reveal top hud and bottom dock
    document.getElementById("top-hud").classList.remove("hidden");
    document.getElementById("bottom-dock").classList.remove("hidden");
    updateHUDStats();
}

function updateHUDStats() {
    let currentClass = player.classes[Math.floor(player.termCount / 3)] || "Graduated";
    document.getElementById("hud-location").innerText = `${currentClass} • ${player.background} Life`;
    document.getElementById("stat-energy").innerText = player.energy;
    document.getElementById("stat-hunger").innerText = player.hunger;
    document.getElementById("stat-money").innerText = player.money.toLocaleString();
    document.getElementById("player-age-class").innerText = `${currentClass} • Age ${player.age}`;
}

function switchRoom(roomName) {
    const announcement = document.getElementById("ai-announcement");
    document.getElementById("current-room-title").innerText = `🏫 ${roomName} Zone`;
    
    if (roomName === 'Classroom') {
        announcement.innerText = "👩‍🏫 AI Teacher Mrs. Okafor: 'Quiet down! Open your notes to Mathematics.'";
    } else if (roomName === 'Hallway') {
        announcement.innerText = "🚶‍♂️ Hallway: Senior prefects are on patrol. Watch your uniform tucking!";
    } else if (roomName === 'TuckShop') {
        announcement.innerText = "🛒 Tuck Shop: Buying cold Hollandia yoghurt and Gala during short break!";
    }
}

function advanceSchoolTerm() {
    if (player.termCount < 18) {
        player.termCount++;
        player.age = 12 + Math.floor(player.termCount / 3);
        updateHUDStats();
        
        let currentClass = player.classes[Math.floor(player.termCount / 3)] || "Graduated";
        alert(`Term completed successfully! You are now in ${currentClass} at age ${player.age}.`);
    } else {
        alert("Congratulations! You have completed secondary school and graduated!");
    }
}

function sendChat() {
    const input = document.getElementById("chat-msg-input");
    const feed = document.getElementById("chat-feed");
    if (!input.value.trim()) return;

    feed.innerHTML += `<p><strong>${player.name}:</strong> ${input.value}</p>`;
    input.value = "";
    feed.scrollTop = feed.scrollHeight;
}

function navTab(tabName) {
    // Switch active tab styling on bottom dock
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
    
    if (tabName !== 'home') {
        alert(`Opening ${tabName.toUpperCase()} menu overlay...`);
    }
}
