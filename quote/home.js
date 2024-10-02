document.addEventListener("DOMContentLoaded", function() {
    // Fetch the daily quote from an API
    fetchDailyQuote();

    // Form submission event handler for saving quotes
    const quoteForm = document.getElementById("quote-form");
    quoteForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the input values
        const quoteInput = document.getElementById("quote-input").value;
        const authorInput = document.getElementById("author-input").value;

        // Create a new list item for the favorite quote
        const quoteListItem = document.createElement("li");
        quoteListItem.textContent = `"${quoteInput}" - ${authorInput}`;

        // Add the new list item to the favorite quotes list
        const quotesList = document.getElementById("quotes-list");
        quotesList.appendChild(quoteListItem);

        // Show confirmation message
        showConfirmationMessage("Quote saved successfully!");

        // Clear the form inputs
        document.getElementById("quote-input").value = "";
        document.getElementById("author-input").value = "";
    });

    // Navigation links event listeners
    const homeLink = document.getElementById("home-link");
    const customizedQuoteLink = document.getElementById("customized-quote-link");

    homeLink.addEventListener("click", function() {
        document.getElementById("daily-quote").style.display = "block";
        document.getElementById("customize-quote").style.display = "block";
        document.getElementById("customized-quote-section").style.display = "none";
    });

    customizedQuoteLink.addEventListener("click", function() {
        document.getElementById("daily-quote").style.display = "none";
        document.getElementById("customize-quote").style.display = "none";
        document.getElementById("customized-quote-section").style.display = "block";
    });

    // Form submission event handler for quiz form
    const quizForm = document.getElementById("quiz-form");
    quizForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the input values from the quiz form
        const importantToday = document.getElementById("important-today").value;
        const plansToday = document.getElementById("plans-today").value;
        const mood = document.getElementById("mood").value;
        const occasions = document.getElementById("occasions").value;

        // Customize the quote based on the quiz input
        const customizedQuote = `Today is important because ${importantToday}. You have plans to ${plansToday}. You are feeling ${mood} and it's a special occasion: ${occasions}.`;

        // Display the customized quote
        const customizedQuoteTextElement = document.getElementById("customized-quote-text");
        customizedQuoteTextElement.textContent = customizedQuote;

        // Clear the quiz form inputs
        quizForm.reset();
    });
});

// Function to fetch the daily quote from an API
function fetchDailyQuote() {
    const quoteTextElement = document.getElementById("quote-text");

    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quoteText = data.content;
            const quoteAuthor = data.author;
            quoteTextElement.textContent = `"${quoteText}" - ${quoteAuthor}`;
        })
        .catch(error => {
            console.error('Error fetching the daily quote:', error);
            quoteTextElement.textContent = "Could not fetch the daily quote. Please try again later.";
        });
}

// Function to show confirmation message
function showConfirmationMessage(message) {
    const confirmationElement = document.createElement("div");
    confirmationElement.textContent = message;
    confirmationElement.style.backgroundColor = "#4CAF50";
    confirmationElement.style.color = "white";
    confirmationElement.style.padding = "10px";
    confirmationElement.style.marginTop = "10px";
    confirmationElement.style.textAlign = "center";
    confirmationElement.style.borderRadius = "4px";

    const mainElement = document.querySelector("main");
    mainElement.insertBefore(confirmationElement, mainElement.firstChild);

    // Remove the confirmation message after 3 seconds
    setTimeout(() => {
        confirmationElement.remove();
    }, 3000);
}
