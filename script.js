function answerChoice(event) {
    event.currentTarget.classList.add('clicked');
    const checkbox = event.currentTarget.querySelector('.checkbox');
    checkbox.src="images/checked.png";
    let overlay= event.currentTarget.querySelector('.overlay');
    if(!overlay.classList.contains('hidden'))
    {
      overlay.classList.add('hidden');
    }
    
    for(const div of elementList) {
    if(div.dataset.questionId === event.currentTarget.dataset.questionId && div !== event.currentTarget)
    {
    let overlay=div.querySelector('.overlay');
    overlay.classList.remove('hidden');
    if(div.classList.contains('clicked'))
      {
      div.classList.remove('clicked');
      const img=div.querySelector('.checkbox');
      img.src="images/unchecked.png";
      }  
    } 
  }
answers[event.currentTarget.dataset.questionId]= event.currentTarget.dataset.choiceId;
if(Object.keys(answers).length==3) {
  for(let div of elementList) {
    div.removeEventListener('click',answerChoice);
  }
  getChoiceId();
  }
}

function getChoiceId() {
  let index;
  if(answers["one"] === answers["two"] || answers["one"] === answers["three"]){
    index = answers["one"]
    showResult(RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
}
else if(answers["two"] === answers["three"]) {
    index = answers["two"]
    showResult(RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
}
else {
    index = answers["one"]
    showResult(RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
     }
}

function showResult (title, description) {
  let titl = result.querySelector('#title')
  let descrip = result.querySelector('#quote')
  let button = result.querySelector('.button')
  titl.textContent = title
  descrip.textContent = description
  button.addEventListener('click', reset)
  result.classList.remove('hidden')
}

function reset(event) {
  for(const div of elementList) {
    div.addEventListener('click', answerChoice)
    let overlay= div.querySelector('.overlay'); 
    if(div.classList.contains('clicked')){
      div.classList.remove('clicked')
      div.querySelector('.checkbox').src = './images/unchecked.png'
      }

  else if(!overlay.classList.contains('hidden')){ 
      overlay.classList.add('hidden')
      }
  }
  answers = {}
  event.currentTarget.removeEventListener('click', reset)
  result.classList.add('hidden')
}

const elementList = document.querySelectorAll('.choice-grid .choice');
const result = document.querySelector('#result')
let answers= {}

 for(const div of elementList)
 {
     div.addEventListener('click', answerChoice);
 }

