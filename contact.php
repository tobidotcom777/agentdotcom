<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form inputs and sanitize them
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate inputs
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Recipient email
        $to = 'dotcomhades@gmail.com';
        // Subject
        $subject = 'New Encrypted Message from ' . $name;
        // Message
        $body = "Alias: $name\nEmail: $email\n\nEncrypted Message:\n$message";
        // Headers
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            // Redirect to a thank you page or display a success message
            echo '<script>alert("Your message has been sent successfully."); window.location.href = "index.html";</script>';
        } else {
            // Display an error message
            echo '<script>alert("There was an error sending your message. Please try again."); window.history.back();</script>';
        }
    } else {
        // Missing fields
        echo '<script>alert("Please fill in all fields."); window.history.back();</script>';
    }
} else {
    // Accessed without form submission
    header('Location: index.html');
    exit();
}
?>
