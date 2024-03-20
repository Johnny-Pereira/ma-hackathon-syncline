document.getElementById("newCommentBtn").addEventListener("click", function() {
    // Open a new window with the message form
    var newCommentWindow = window.open("", "_blank", "width=400,height=300");
    
    // Write HTML content to the new window
    newCommentWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message</title>
        </head>
        <body>
            <h2>Create Comment</h2>
            <form id="messageForm">
                <label for="message">Comment:</label><br>
                <textarea id="message" name="message" rows="6" cols="50"></textarea><br><br>
                <input type="submit" value="Submit">
            </form>
            <script>
                // Add event listener for form submission
                document.getElementById("messageForm").addEventListener("submit", function(event) {
                    // Prevent the default form submission behavior
                    event.preventDefault();
                    // Get the message from the textarea
                    var message = document.getElementById("message").value;
                    // Log the message (you can replace this with your desired functionality)
                    console.log("Message submitted:", message);
                    // Close the window after form submission
                    window.close();
                });
            </script>
        </body>
        </html>
    `);
});
