document.getElementById("newMessageBtn").addEventListener("click", function() {
    // Open a new window with the message form
    var newMessageWindow = window.open("", "_blank", "width=400,height=300");
    
    // Write HTML content to the new window
    newMessageWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message</title>
        </head>
        <body>
            <h2>Create New Message</h2>
            <form id="messageForm">
                <label for="name">Send To:</label>
                <input type="text" id="name" name="name"><br><br>
                <label for="question">Question:</label>
                <input type="text" id="question" name="question"><br><br>
                <label for="date">Date:</label>
                <input type="date" id="date" name="date"><br><br>
                <input type="submit" value="Submit">
            </form>
            <script>
                // Add event listener for form submission
                document.getElementById("messageForm").addEventListener("submit", function(event) {
                    // Prevent the default form submission behavior
                    event.preventDefault();
                    // Close the window after form submission
                    window.close();
                });
            </script>
        </body>
        </html>
    `);
});



