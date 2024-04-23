// Your existing modal script
var modal = document.getElementById("myModal");
var btn = document.getElementById("ask");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// New: AJAX Form Submission
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.outForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop form from submitting normally

    let formData = new FormData(this);

    // Assuming '/ask' is your Flask route handling the form submission
    fetch('/ask', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json()) // convert response to JSON
    .then(data => {
      // Displaying answer
      document.getElementById("answerOutput").innerHTML = `<p>${data.Askmessage}</p>`;
    })
    .catch(error => console.error('Error:', error));
  });
});

document.getElementById('summarize').addEventListener('click', function() {
  // Display loading indicator
  document.getElementById('summaryOutput').textContent = "Generating summary, please wait...";
  document.getElementById('summaryModal').style.display = "block";
  // Your fetch call here
});

document.getElementById('summarize').addEventListener('click', function() {
  fetch('/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //body: summary,
  })
  .then(response => response.json())
  .then(data => {
    // Insert the summary into the modal
    document.getElementById('summaryOutput').textContent = data.summary;

    // Display the modal
    document.getElementById('summaryModal').style.display = "block";
  })
  .catch(error => console.error('Error:', error));
})

// Close the modal logic, similar to your existing modal handling
var span = document.getElementsByClassName("closeSummary")[0];
span.onclick = function() {
    document.getElementById('summaryModal').style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    var modal
= document.getElementById('summaryModal');
if (event.target == modal) {
modal.style.display = "none";
}
}

function searchTopic() {
  var topic = document.getElementById("topicInput").value;
  document.getElementById("topicInput").value = topic;
  document.getElementById("answerOutput").style.display = "none";
  setTimeout(function() {
      document.getElementById("answerOutput").style.display = "block";
  }, 2000); 
}
