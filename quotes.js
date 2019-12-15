const quoteElement = document.querySelector('.display-box');
const textDiv = document.querySelector('.quote-text');
const authorDiv = document.querySelector('.quote-author');
const newQuoteBtn = document.querySelector('.get-quote');

function getQuote() {
  fetch('https://quote-garden.herokuapp.com/quotes/random')
    .then(response => response.json())
    .then(data => {
      let { quoteText, quoteAuthor } = data;
      displayQuote(quoteText, quoteAuthor);
    });
}

function setQuote(text, author) {
  textDiv.textContent = text;

  if (author === '') {
    authorDiv.textContent = '- Unknown';
  } else {
    authorDiv.textContent = `- ${author}`;
  }
  quoteElement.classList.add('active');
}

function displayQuote(text, author) {
  if (quoteElement.classList.contains('active')) {
    quoteElement.classList.remove('active');

    quoteElement.addEventListener('transitionend', e => {
      if (e.propertyName !== 'transform') return;
      setQuote(text, author);
    });
  } else {
    setQuote(text, author);
  }
}

//document.addEventListener('DOMContentLoaded', getQuote());
getQuote();

newQuoteBtn.addEventListener('click', getQuote);
