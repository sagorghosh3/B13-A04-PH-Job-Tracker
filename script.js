let totalCount = document.getElementById('totalCount');
let interviewCount = document.getElementById('InterviewCount');
let rejectedCount = document.getElementById('RejectedCount');
let jobsCount = document.getElementById('jobsCount')
// console.log(jobsCount)
const allBtn = document.getElementById('all-primary-btn');
const interviewBtn = document.getElementById('interview-primary-btn');
const rejectedBtn = document.getElementById('rejected-primary-btn');

const allCardsSections = document.getElementById('all-cards');
const mainContainer = document.querySelector('main');
const filtered = document.getElementById('filter-section');
// console.log(mainContainer);
let interviewList = [];
let rejectedList = [];

// interviewList.push()


function updateCount() {
  totalCount.innerText = allCardsSections.children.length
  jobsCount.innerText = `${allCardsSections.children.length} jobs`;
  interviewCount.innerText = interviewList.length
  rejectedCount.innerText = rejectedList.length
}
updateCount()

function toggleStyle(id) {
  // console.log("click", id);
  allBtn.classList.remove('text-white', 'bg-blue-800')
  interviewBtn.classList.remove('text-white', 'bg-blue-800')
  rejectedBtn.classList.remove('text-white', 'bg-blue-800')


  allBtn.classList.add('text-black', 'bg-white')
  interviewBtn.classList.add('text-black', 'bg-white')
  rejectedBtn.classList.add('text-black', 'bg-white')

  const selected = document.getElementById(id)
  // console.log(selected);
  selected.classList.remove('bg-white', 'text-black')
  selected.classList.add('bg-blue-800', 'text-white')
}

// event delegation
mainContainer.addEventListener('click', function (event) {
  console.log(event.target.classList.contains('interview-btn'))
  if(event.target.classList.contains('interview-btn')){
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector('.companyName').innerText
    const designation = parentNode.querySelector('.designation').innerText
    const description = parentNode.querySelector('.description').innerText
    const status = parentNode.querySelector('.status').innerText
    const notes = parentNode.querySelector('.notes').innerText

    // console.log();

    const cardInfo = {
      companyName,
      designation,
      description,
      status,
      notes,
    }
    // console.log(cardInfo)

    const interviewExist = interviewList.find(item => item.companyName === cardInfo.companyName);
    if (!interviewExist) {
      interviewList.push(cardInfo);
    } renderInterview()
    // console.log(interviewList);
  }

})


function renderInterview() {
  filtered.innerHTML = ""
  for (let interview of interviewList) {
    console.log(interview);

    let div = document.createElement('div');
    div.className = 'card flex justify-between my-4 p-8 bg-white'
    div.innerHTML = `
    <div class="space-y-6">
          <!-- part 1 -->
          <div>
              <p class="companyName text-2xl font-semibold text-blue-950">Mobile First Corp</p>
              <p class="designation opacity-50">React Native Developer</p>
              <br>
              <p class="description  opacity-50">Remote • Full-time • $130,000 - $175,000</p>
          </div>
          <!-- part 2 -->
          <p class="status bg-gray-200 py-1 w-30 text-center rounded-sm">NOT APPLIED</p>
          <p class="notes opacity-50">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
          <div class="flex gap-5">
              <button class="interview-btn border-2 border-green-500 text-green-500 font-semibold px-4 py-2 rounded-md">Interview</button>
              <button class="rejected-btn border-2 border-red-500 text-red-500 font-semibold px-4 py-2 rounded-md">Rejected</button>
          </div>
      </div>
      <!-- part-3 -->
      <div>
          <button><i class="fa-regular fa-trash-can"></i></button>
      </div>
    
    
    `
  }
}