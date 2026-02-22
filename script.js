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
// console.log(mainContainer);
let interviewList = [];
let rejectedList = [];

// interviewList.push()


function updateCount(){
  totalCount.innerText = allCardsSections.children.length
  jobsCount.innerText = `${allCardsSections.children.length} jobs`;
  interviewCount.innerText = interviewList.length
  rejectedCount.innerText = rejectedList.length
}
updateCount()

function toggleStyle(id){
  // console.log("click", id);
  allBtn.classList.remove('text-white','bg-blue-800')
  interviewBtn.classList.remove('text-white','bg-blue-800')
  rejectedBtn.classList.remove('text-white','bg-blue-800')


  allBtn.classList.add('text-black','bg-white')
  interviewBtn.classList.add('text-black','bg-white')
  rejectedBtn.classList.add('text-black','bg-white')

  const selected = document.getElementById(id)
  // console.log(selected);
  selected.classList.remove('bg-white', 'text-black')
  selected.classList.add('bg-blue-800','text-white')
}