let videos = [];
let currentIndex = 0;
let allResponses = [];
const participantId = `user-${Date.now()}`;
const VIDEOS_PER_SESSION = 2; // variable you can change 

// ---------------- SHUFFLE HELPER ----------------
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ---------------- FETCH VIDEOS ----------------
async function initVideos() {
  try {
    const res = await fetch("videos.json")
    const data = await res.json();

    videos = shuffle(data.videos).slice(0, Math.min(VIDEOS_PER_SESSION, data.videos.length));
    renderVideo(currentIndex);
  } catch (err) {
    console.error("Error fetching videos:", err);
  }
}

// ---------------- RENDER VIDEO & QUESTIONS ----------------
async function renderVideo(index) {
  const video = videos[index];
  if (!video) return;

  document.getElementById("videoContainer").innerHTML = `
    <video id="videoPlayer" width="100%" controls muted autoplay>
      <source src="${video.path}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;

  document.getElementById("pageNumber").textContent = `Video ${index + 1}`;

  try {
    const html = await fetch("questions.html").then(res => res.text());
    document.getElementById("formContainer").innerHTML = html;

    // Restore previous answers
    const saved = allResponses[index];
    if (saved) {
      Object.entries(saved).forEach(([name, value]) => {
        const el = document.querySelector(`#formContainer [name="${name}"]`);
        if (!el) return;
        if (el.type === "radio") {
          const radio = document.querySelector(`#formContainer [name="${name}"][value="${value}"]`);
          if (radio) radio.checked = true;
        } else {
          el.value = value;
        }
      });
    }
  } catch (err) {
    console.error("Error loading questions:", err);
  }

  // Show/hide buttons
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  if (index === videos.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.hidden = false;
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.hidden = true;
  }

  document.getElementById("form-column").scrollTop = 0;
}

// ---------------- SAVE & VALIDATE ----------------
function saveResponses() {
  const formElements = document.querySelectorAll("#formContainer input, #formContainer textarea, #formContainer select");
  const responses = {};

  formElements.forEach(el => {
    if ((el.type === "radio" && el.checked) || el.type !== "radio") {
      responses[el.name] = el.value;
    }
  });

  allResponses[currentIndex] = { participantId, videoId: videos[currentIndex].id, ...responses };

  // Auto-save to server on Next
  fetch("/saveResponses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([allResponses[currentIndex]])
  })
    .then(res => res.json())
    .then(data => console.log("Auto-saved response:", data))
    .catch(err => console.error("Error auto-saving:", err));
}

function validateResponses() {
  const formElements = document.querySelectorAll("#formContainer input, #formContainer textarea, #formContainer select");
  let valid = true;
  const radioGroups = {};

  formElements.forEach(el => {
    if (el.type === "radio") {
      if (!radioGroups[el.name]) radioGroups[el.name] = false;
      if (el.checked) radioGroups[el.name] = true;
    } else if (el.hasAttribute("required") && !el.value.trim()) {
      valid = false;
    }
  });

  if (Object.values(radioGroups).some(checked => !checked)) valid = false;

  return valid;
}

// ---------------- BUTTONS ----------------
document.getElementById("nextBtn").addEventListener("click", () => {
  if (!validateResponses()) {
    alert("Please answer all required questions before proceeding.");
    return;
  }
  saveResponses();
  currentIndex++;
  renderVideo(currentIndex);
});

document.getElementById("submitBtn").addEventListener("click", () => {
  if (!validateResponses()) {
    alert("Please answer all required questions before submitting.");
    return;
  }

  saveResponses(); // make sure the last page is saved

  fetch("/saveResponses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(allResponses)  // send all responses
  })
    .then(res => res.json())
    .then(data => {
      console.log("Final responses submitted:", data);

      //  Replace page content with an end page
      document.body.innerHTML = `
        <div style="text-align:center;color:white; margin-top:50px;">
          <h1>✅ Thank you!</h1>
          <p>Your responses have been submitted successfully.</p>
        </div>
      `;
    })
    .catch(err => {
      console.error("Error submitting final responses:", err);
      alert("There was an error submitting your responses. Please try again.");
    });
});


// ---------------- INIT ----------------
initVideos();
