let player = {
    name: "",
    gender: "Male",
    age: 12,
    classIndex: 0, // 0: JSS1, 1: JSS2, 2: JSS3, 3: SSS1, 4: SSS2, 5: SSS3, 6: Graduate
    bank: 5000,
    background: null, // "Lapo" or "Nepo"
    job: null
};

const classes = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

function startJourney() {
    const nameInput = document.getElementById("char-name").value.trim();
    if(!nameInput) {
        alert("Enter your character name first!");
        return;
    }
    player.name = nameInput;
    document.getElementById("display-name").innerText = `Name: ${player.name}`;
    
    document.getElementById("creation-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    updateUI();
}

function updateUI() {
    document.getElementById("display-age").innerText = `Age: ${player.age}`;
    document.getElementById("display-class").innerText = `Class: ${classes[player.classIndex] || "Graduate"}`;
    document.getElementById("display-bank").innerText = `Balance: ₦${player.bank.toLocaleString()}`;
}

function passTerm() {
    if (player.classIndex < classes.length - 1) {
        player.classIndex++;
        player.age += 1; // Advance age as they scale through classes
        updateUI();
        document.getElementById("status-text").innerText = `You successfully promoted to ${classes[player.classIndex]}! Age is now ${player.age}.`;
        
        // Check if reached Age 18 (SSS3 graduate)
        if (player.age >= 18) {
            document.getElementById("status-section")?.remove();
            document.getElementById("wheel-section").classList.remove("hidden");
        }
    } else {
        alert("You have finished secondary school! Spin the wheel.");
    }
}

function spinWheel() {
    const outcomes = ["Lapo", "Nepo"];
    const chosenBackground = outcomes[Math.floor(Math.random() * outcomes.length)];
    player.background = chosenBackground;
    
    let resultDiv = document.getElementById("wheel-result");
    if (chosenBackground === "Lapo") {
        resultDiv.innerHTML = `<p style="color: #ff7b72;">🔴 Wheel Landed on: <strong>Lapo!</strong> Pure grit and hustle begins.</p>`;
    } else {
        resultDiv.innerHTML = `<p style="color: #3fb950;">🟢 Wheel Landed on: <strong>Nepo!</strong> Soft life and family connections unlocked.</p>`;
    }
    
    document.getElementById("wheel-section").querySelector("button").style.display = "none";
    loadJobs(chosenBackground);
}

function loadJobs(bg) {
    const jobSection = document.getElementById("job-section");
    const jobList = document.getElementById("job-list");
    jobSection.classList.remove("hidden");
    
    let jobs = [];
    if(bg === "Lapo") {
        jobs = ["Apprentice Mechanic", "POS Kiosk Operator", "Dispatch Rider", "Tailor Apprentice", "Market Trader", "Yahoo Boy (High Risk)"];
    } else {
        jobs = ["Corporate Executive Trainee", "Tech Startup Founder", "Immediate Japa (Abroad)", "Luxury Content Creator", "Political Appointee", "Real Estate Manager"];
    }
    
    jobList.innerHTML = "<h4>Select a Career path:</h4>" + jobs.map(j => `<button onclick="selectJob('${j}')" style="margin-top:5px; background:#1f6feb;">${j}</button>`).join("");
}

function selectJob(jobName) {
    player.job = jobName;
    alert(`Congratulations! You chose: ${jobName}. Your 9ja_go adult life journey begins now!`);
}

