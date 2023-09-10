const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

// ^ Loader

function showLoadingSpinner() {
  //^ Hidden Property is available in every html element.

  loader.hidden = false;
  quoteContainer.hidden = true;
}

// ^Hide loader
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// ^ Get a single quote

function getSingleQuote() {
  // ^ Loading whenever the button is clicked
  showLoadingSpinner();
  // ^ Get one random quote from array of objects.
  const singleQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //^ Check if author name is blank and replace it with "unknown"
  authorText.textContent = singleQuote.author ? singleQuote.author : "Unknown";

  //   ^Check quote length to determine styling.

  singleQuote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  //^Set quote and hide the loader
  quoteText.textContent = singleQuote.text;
  removeLoadingSpinner();
}

// ^ Get quotes from APi.

async function getQuotes() {
  // ^Loading for the first time fetching
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getSingleQuote();
  } catch (error) {
    // ^ Its a recursive function the same function is calling that function it might cause an infinite loop so we need to control the no of times it might get called. Also andrei said we can throw errors ourselves we throw keyword.
    getQuotes();
  }
}

//^Tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// ^ Event Listeners

newQuoteBtn.addEventListener("click", getSingleQuote);
twitterBtn.addEventListener("click", tweetQuote);

//^ On Load

getQuotes();
