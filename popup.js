document.getElementById("checkSpam").addEventListener("click", function () {
    let message = document.getElementById("message").value;
    let resultDiv = document.getElementById("result");

    if (message.trim() === "") {
        resultDiv.innerHTML = "Please enter a message.";
        return;
    }

    // Replace this URL with your deployed Flask API endpoint
    let apiUrl = "https://your-flask-api.onrender.com/predict"; 

    fetch(apiUrl, {
        method: "POST",
        mode: "cors",  // Allow cross-origin requests
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.result === 1) {
            resultDiv.innerHTML = "🚨 SPAM";
            resultDiv.style.color = "red";
        } else {
            resultDiv.innerHTML = "✅ NOT SPAM";
            resultDiv.style.color = "green";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        resultDiv.innerHTML = "❌ Error checking spam. Please try again.";
        resultDiv.style.color = "orange";
    });
});
