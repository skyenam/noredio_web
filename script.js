// script.js
function toggleAnswer(element) {
    var answer = element.nextElementSibling; // The next element after the question
    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}