import OpenAi from 'openai'

async function getTranslation(data, lang) {
  const select = document.querySelector(".select");
  select.innerHTML = "Loading...";

  try {
    const response = await fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, lang })
    });

    const result = await response.json();

    if (result.error) throw new Error(result.error);
  
    select.innerHTML = "";
    
    domManipulation(result.translation); 
  }
  catch (err) {
    alert("Error: " + err.message);
    select.innerHTML = "";
  }
}

function domManipulation(response) {
    const translated = document.createElement('textarea');
    const restart = document.createElement('button');
    const button = document.querySelector(".translate-btn");
    restart.setAttribute("style", 'padding: 8px; color: black; background-color: #2e5894; font-size: medium; font-weight: 400; border-radius: 8px; width: 150px; margin: 20px 0;');
    restart.innerText = "start over"
    restart.classList.add("restart")
    const body = document.querySelector(".translate-form") 
    translated.setAttribute('style', 'width: 200px; height: 100px;')
    translated.innerText = `${response}`
    translated.classList.add("translated");
    button.style.display = "none";
    body.append(translated);
    body.append(restart)
    restart.addEventListener("click", startOver)
}

function startOver() {
    const translated = document.querySelector('.translated');
    document.querySelector("#translation-text").value = '';
    document.querySelector('input[name="language"]:checked').checked = false;
    const restart = document.querySelector('.restart');
    const langChoice = document.querySelector('.lang-choice');
    langChoice.style.display = "block";
    restart.style.display = "none";
    const button = document.querySelector(".translate-btn");
    button.style.display = "block";
    translated.style.display = "none";

}

const translate = document.querySelector(".translate-btn")
translate.addEventListener("click", submission)

function submission(event) {
  event.preventDefault();
  const text = document.querySelector("#translation-text").value
  const lang = document.querySelector('input[name="language"]:checked').value;
  const langChoice = document.querySelector('.lang-choice');
  langChoice.setAttribute("style", "display: none;")
  getTranslation(text,lang);
}