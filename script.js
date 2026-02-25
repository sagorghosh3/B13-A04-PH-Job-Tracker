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
let currentStatus = 'all'

// interviewList.push()


function updateCount() {
  totalCount.innerText = allCardsSections.children.length
  jobsCount.innerText = `${allCardsSections.children.length} jobs`;
  interviewCount.innerText = interviewList.length
  rejectedCount.innerText = rejectedList.length

  if (currentStatus === 'interview-primary-btn') {
    jobsCount.innerText = `${interviewList.length} jobs`;

  } else if (currentStatus === 'rejected-primary-btn') {
    jobsCount.innerText = `${rejectedList.length} jobs`;

  } 
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
  currentStatus = id
  // console.log(selected);
  selected.classList.remove('bg-white', 'text-black')
  selected.classList.add('bg-blue-800', 'text-white')

  if (id === 'interview-primary-btn') {
    renderInterview();

  } else if (id === 'all-primary-btn') {
    allCardsSections.classList.remove('hidden');
    filtered.classList.add('hidden');

  } else if (id === 'rejected-primary-btn') {
    renderRejected();

  }
  updateCount()
}
// event delegation
mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('interview-btn')) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector('.companyName').innerText
    const designation = parentNode.querySelector('.designation').innerText
    const description = parentNode.querySelector('.description').innerText
    const notes = parentNode.querySelector('.notes').innerText
    const status = parentNode.querySelector('.status');
    status.innerText = 'Interview';
    status.classList.remove('bg-gray-200');
    status.classList.add('font-semibold','border-2', 'bg-green-100', 'text-green-600');
    status.classList.remove('bg-red-100', 'text-red-600');

    const cardInfo = {
      companyName,
      designation,
      description,
      status: 'Interview',
      notes,
    }
    // console.log(cardInfo)

    const companyExist = interviewList.find(item => item.companyName === cardInfo.companyName);

    if (!companyExist) {
      interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(item => item.companyName !== cardInfo.companyName)

    if (currentStatus === 'rejected-primary-btn') {
      renderRejected()
    }
    updateCount()

  } else if (event.target.classList.contains('rejected-btn')) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector('.companyName').innerText
    const designation = parentNode.querySelector('.designation').innerText
    const description = parentNode.querySelector('.description').innerText
    const notes = parentNode.querySelector('.notes').innerText
    const status = parentNode.querySelector('.status');
    console.log(status)
    status.innerText = 'Rejected';
    status.classList.remove('bg-gray-200');
    status.classList.remove('border');
    status.classList.add('font-semibold','border-2','bg-red-100', 'text-red-600');
    console.log(status)

    const cardInfo = {
      companyName,
      designation,
      description,
      status: 'Rejected',
      notes,
    }

    const companyExist = rejectedList.find(item => item.companyName === cardInfo.companyName);

    if (!companyExist) {
      rejectedList.push(cardInfo);
    }
    interviewList = interviewList.filter(item => item.companyName !== cardInfo.companyName)

    if (currentStatus === 'interview-primary-btn') {
      renderInterview()
    }
    updateCount()
  }

  //delete button (challenge part )

  else if (event.target.closest('.fa-trash-can')) {

    const parentNode = event.target.closest('.card', '.all-cards');
    const companyName = parentNode.querySelector('.companyName').innerText;

    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    if (currentStatus === 'interview-primary-btn') {
      renderInterview();
    }
    else if (currentStatus === 'rejected-primary-btn') {
      renderRejected();
    }

    updateCount();
  }

})


function renderInterview() {

  allCardsSections.classList.add('hidden');
  filtered.classList.remove('hidden');


  if (interviewList.length == 0) {
    filtered.innerHTML = `
    <div class="text-center h-[300px] w-10/12 mx-auto bg-amber-50 mt-10">
            <img src ="./jobs.png" alt="" class="mx-auto w-min pt-24">
            <h3 class="text-2xl font-semibold text-blue-950 opacity-70">No jobs available</h3>
            <p class="opacity-60">Check back soon for new job opportunities</p>
      </div>
    `
    return
  }

  filtered.innerHTML = ""
  for (let interview of interviewList) {
    console.log(interview);

    let div = document.createElement('div');
    div.className = 'card flex justify-between my-4 p-8 bg-white'
    div.innerHTML = `
    <div class="space-y-6">
          <!-- part 1 -->
          <div>
              <p class="companyName text-2xl font-semibold text-blue-950">${interview.companyName}</p>
              <p class="designation opacity-50">${interview.designation}</p>
              <br>
              <p class="description  opacity-50">${interview.description}</p>
          </div>
          <!-- part 2 -->
          <p class="status font-semibold border-2 bg-green-100 text-green-600 py-1 w-30 text-center rounded-sm">${interview.status}</p>
          <p class="notes opacity-50">${interview.notes}</p>
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
    filtered.appendChild(div)
  }
}

function renderRejected() {

  allCardsSections.classList.add('hidden');
  filtered.classList.remove('hidden');

  if (rejectedList.length == 0) {
    filtered.innerHTML = `
    <div class="text-center h-[300px] w-10/12 mx-auto bg-amber-50 mt-10">
            <img src ="./jobs.png" alt="" class="mx-auto w-min pt-24">
            <h3 class="text-2xl font-semibold text-blue-950 opacity-70">No jobs available</h3>
            <p class="opacity-60">Check back soon for new job opportunities</p>
      </div>
    `
    return
  }

  filtered.innerHTML = ""
  for (let rejected of rejectedList) {
    let div = document.createElement('div');
    div.className = 'card flex justify-between my-4 p-8 bg-white'
    div.innerHTML = `
    <div class="space-y-6">
          <!-- part 1 -->
          <div>
              <p class="companyName text-2xl font-semibold text-blue-950">${rejected.companyName}</p>
              <p class="designation opacity-50">${rejected.designation}</p>
              <br>
              <p class="description  opacity-50">${rejected.description}</p>
          </div>
          <!-- part 2 -->
          <p class="status font-semibold border-2 bg-red-100 text-red-600 py-1 w-30 text-center rounded-sm">${rejected.status}</p>
          <p class="notes opacity-50">${rejected.notes}</p>
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
    filtered.appendChild(div)
  }
}