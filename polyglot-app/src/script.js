async function getTranslation(data, lang) {
  //const answer = document.querySelector(".answer");
  //answer.setAttribute("style", "")
  //answer.textContent =`...`;
  //answer.style.display = "block";
  const form = document.querySelector(".text-form");
  const answer = document.createElement("p");
  answer.textContent =`...`;
  answer.setAttribute("style", "padding: 5px; background-color: blue; color: white; font-weight: 400; font-size: 20px; flex-wrap: wrap; border-radius: 8px;"); 
  form.appendChild(answer);
  scrolledToBottom();
  try {
    const response = await fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, lang })
    });
  
    
  const result = await response.json();

    if (result.error) throw new Error(result.error);
    form.removeChild(answer)
    domManipulation(result.translation); 
  }
  catch (err) {
    alert("Error: " + err.message);
  }
}

function domManipulation(response) {
  const form = document.querySelector(".text-form");
  const answer = document.createElement("p");
  answer.textContent =`${response}`;
  answer.setAttribute("style", "padding: 5px; background-color: blue; color: white; max-width: 220px; font-weight: 400; font-size: 20px; flex-wrap: wrap; border-radius: 8px;"); 
  form.appendChild(answer);
  scrolledToBottom();
}

function scrolledToBottom() {
  const form = document.querySelector(".text-form");
  var isScrolledToBottom = form.scrollHeight - form.clientHeight <= form.scrollTop + 1;
  if (isScrolledToBottom) {
    form.scrollTop = form.scrollHeight - form.clientHeight;
  }
}

const send = document.querySelector(".send-message")
send.addEventListener("click", submission)

function submission(event) {
  event.preventDefault();
  const text = document.querySelector(".answer-entry").value;
  const form = document.querySelector(".text-form");
  const lang = document.querySelector('input[name="language"]:checked');
  if (lang == null) {
    alert("You must select a language before continuing!")
  }
  else {
    const question = document.createElement("p");
    question.textContent = `${text}`;
    question.setAttribute("style", "padding: 5px; background-color: greenyellow; max-width: 220px; color: black; font-weight: 400; font-size: 20px; flex-wrap: wrap; border-radius: 8px;");
    form.appendChild(question);
    document.querySelector(".answer-entry").value = ''
    getTranslation(text,lang.value);
  }
}