<?php
$fullName = $_POST["fullName"];
$phoneNumber = $_POST["phoneNumber"];
$message = $_POST["message"];

$emailFrom = "info@prestigekansas.com";
$EmailTo = "info@prestigekansas.com";
$Subject = "New Message Received";

// prepare email body text
$Body .= "Name: ";
$Body .= $fullName;
$Body .= "\n";

$Body .= "Phone Number: ";
$Body .= $phoneNumber;
$Body .= "\n";

$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$emailFrom);

// redirect to success page
if ($success){
   echo "success";
}else{
    echo "invalid";
}

?>
