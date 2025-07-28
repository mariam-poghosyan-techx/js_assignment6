document.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("form")
    const nameInput  = document.getElementById("name")
    const emailIput = document.getElementById("email")
    const note = document.getElementById("note")
    const saveBtn = document.getElementById("saveBtn")

    // Task 1
    const profileData = localStorage.getItem("user");
    if (profileData) {
        const profile = JSON.parse(profileData)
        console.log("Loaded from local storage", profileData)        
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailIput.value.trim();

        const user = {name, email};

        localStorage.setItem("user", JSON.stringify(user));

        alert("Profile saved");
        form.reset();
    });
});


// Task 2
document.addEventListener("DOMContentLoaded", () =>{
    const note = document.getElementById("note")
    const saveBtn = document.getElementById("saveBtn")


    const savedNote = sessionStorage.getItem("temporaryNote");
    if (savedNote) {
        note.value = savedNote;
    }

    // Save note to sessionStorage when button is clicked
    saveBtn.addEventListener("click", () => {
        const noteContent = note.value;
        sessionStorage.setItem("temporaryNote", noteContent);
        note.value = "";
        alert("Note saved in session!");
    });
});

// Task 3
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
    }

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-btn");

    const consent = getCookie("consent");
    if (consent !== "true") {
        banner.style.display = "block";
    }
    acceptBtn.addEventListener("click", () => {
        setCookie("consent", "true", 7);
        banner.style.display = "none";
    });
});

// Task 4
// Utility to delete a cookie by name
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clear-all-btn");

  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();
    deleteCookie("consent");
    console.log("All storage cleared!");
    alert("All storage and cookies cleared!");
  });
});


// Task 5 
document.addEventListener("DOMContentLoaded", () => {
    const getBtn = document.getElementById("getJoke");
    const  showJoke = document.getElementById("showJoke");

    getBtn.addEventListener("click", async() => {
        try {
            const response = await fetch("https://icanhazdadjoke.com/",{
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data= await response.json()
            showJoke.textContent = data.joke

        } catch (error) {
            showJoke.textContent = "failed to fetch joke."
            console.error('Error fetching joke:', error)
        }
    })
});

// Task 6

document.addEventListener("DOMContentLoaded", () => {
  const countdownBtn = document.getElementById("counter");
  const display = document.getElementById("count-display");

  countdownBtn.addEventListener("click", () => {
    let count = 5;

    display.textContent = "";

    for (let i = 0; i <= 5; i++) {
      setTimeout(() => {
        if (count === 0) {
          display.textContent = "Go!";
        } else {
          display.textContent = count;
        }
        count--;
      }, i * 1000);
    }
  });
});

// Task 7
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const output = document.getElementById("tick-output");

  let tickInterval = null;
  let isVisible = true;

  startBtn.addEventListener("click", () => {
    if (tickInterval) return;

    output.textContent = "Tick";

    tickInterval = setInterval(() => {
      isVisible = !isVisible;
      output.style.visibility = isVisible ? "visible" : "hidden";
    }, 1000);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(tickInterval);
    tickInterval = null;
    output.style.visibility = "visible";
    output.textContent = "Ticking stopped";
  });
});


