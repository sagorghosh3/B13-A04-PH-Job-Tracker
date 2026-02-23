// ===== ELEMENTS =====
const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("InterviewCount");
const rejectedCount = document.getElementById("RejectedCount");
const jobsCount = document.getElementById("jobsCount");

const allCardsSection = document.getElementById("all-cards");
const filterSection = document.getElementById("filter-section");

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("Interview-btn");
const rejectedBtn = document.getElementById("Rejected-btn");

let interviewList = [];
let rejectedList = [];
let currentView = "all";

// ===== INITIAL COUNT =====
updateCounts();

// ===== FILTER BUTTON STYLE =====
function toggleStyle(id) {

  [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
    btn.classList.remove("bg-blue-800", "text-white");
    btn.classList.add("bg-white", "text-black");
  });

  const selected = document.getElementById(id);
  selected.classList.add("bg-blue-800", "text-white");

  currentView = id;

  if (id === "all-btn") {
    allCardsSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  }

  if (id === "Interview-btn") {
    renderFiltered(interviewList, "Interview");
  }

  if (id === "Rejected-btn") {
    renderFiltered(rejectedList, "Rejected");
  }
}

// ===== EVENT DELEGATION =====
document.querySelector("main").addEventListener("click", function (e) {

  const card = e.target.closest(".card");
  if (!card) return;

  const company = card.querySelector("p").innerText;
  const role = card.querySelectorAll("p")[1].innerText;
  const time = card.querySelectorAll("p")[2].innerText;
  const description = card.querySelectorAll("p")[4].innerText;

  const jobData = { company, role, time, description };

  // ===== INTERVIEW =====
  if (e.target.classList.contains("interview-btn") || e.target.classList.contains("Interview-btn")) {

    card.querySelector(".status").innerText = "Interview";

    if (!interviewList.find(j => j.company === company)) {
      interviewList.push({ ...jobData, status: "Interview" });
    }

    rejectedList = rejectedList.filter(j => j.company !== company);

    if (currentView === "Rejected-btn") renderFiltered(rejectedList, "Rejected");
  }

  // ===== REJECTED =====
  if (e.target.classList.contains("rejected-btn") || e.target.classList.contains("Rejected-btn")) {

    card.querySelector(".status").innerText = "Rejected";

    if (!rejectedList.find(j => j.company === company)) {
      rejectedList.push({ ...jobData, status: "Rejected" });
    }

    interviewList = interviewList.filter(j => j.company !== company);

    if (currentView === "Interview-btn") renderFiltered(interviewList, "Interview");
  }

  updateCounts();
});

// ===== UPDATE COUNT =====
function updateCounts() {
  totalCount.innerText = allCardsSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  jobsCount.innerText = `${allCardsSection.children.length} jobs`;
}

// ===== RENDER FILTERED =====
function renderFiltered(list, type) {

  allCardsSection.classList.add("hidden");
  filterSection.classList.remove("hidden");

  filterSection.innerHTML = "";

  if (list.length === 0) {
    filterSection.innerHTML = `<p class="text-center text-gray-400 mt-10">No ${type} jobs</p>`;
    return;
  }

  list.forEach(job => {

    const div = document.createElement("div");

    div.className = "card flex justify-between my-4 p-8 bg-white";

    div.innerHTML = `
      <div class="space-y-6">
        <div>
          <p class="text-2xl font-semibold text-blue-950">${job.company}</p>
          <p class="opacity-50">${job.role}</p>
          <br>
          <p class="opacity-50">${job.time}</p>
        </div>

        <p class="status bg-gray-200 py-1 w-30 text-center rounded-sm">${job.status}</p>

        <p class="opacity-50">${job.description}</p>

        <div class="flex gap-5">
          <button class="interview-btn border-2 border-green-500 text-green-500 px-4 py-2 rounded-md">Interview</button>
          <button class="rejected-btn border-2 border-red-500 text-red-500 px-4 py-2 rounded-md">Rejected</button>
        </div>
        
      </div>
    `;

    filterSection.appendChild(div);
  });
}