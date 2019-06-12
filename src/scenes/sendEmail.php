<?php
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST, GET');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');
$email = $_POST['email'];
$name = $_POST['name'];
$gift = $_POST['gift'];

    use PHPMailer\PHPMailer\PHPMailer;

    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';
    require 'phpmailer/src/Exception.php';

	$mail = new PHPMailer;

        $mail->isSMTP();
        // Debug mode: set 0 to hide the debug message.
		$mail->SMTPDebug = 0;
		//$mail->SMTPDebug = 3;
		$mail->Host = "smtp.hostinger.my";
		$mail->Port = 587;
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = "tls";

		$mail->Username = "noreply@pepperlunchgame.com";
		$mail->Password = 'rtfusnXq4dlP';

		$mail->From = "noreply@pepperlunchgame.com";
        $mail->FromName = "Pepper Lunch Game";
        
        // Insert the recipient email and name
        $receipentEmail = $email;
        $receipentName = $name;

		$mail->addAddress($receipentEmail, $receipentName);

		$mail->isHTML(true);

        $mail->Subject = "Pepper Lunch Simply Irresistible Campaign";
        
		$mail->Body = "
        <p>Hi " .$receipentName. ",</p><br>
        <p>Thanks for participating in Teppan Catch.</p><br>
        <p>Don't forget to use your screenshoot voucher & enjoy at Pepper Lunch Restaurants or Express stores!</p><br>
        <p><b>Teppan Catch</b></p>
        <p><b>13 June - 28 July</b></p>
        <p>Keep playing - Top 3 high scores at campaign end will win $250 Pepper Lunch vouchers</p><br>
        <p><b>Ready, Steady, Unlock!</b></p>
        <p><b>13 June - 28 July</b></p>
        <p>Dine on 8 main dishes for your chance to unlock great prizes on 3 August!</p><br>
        <p>See you at Pepper Lunch!</p><br/>
        <p>Many thanks!</p>
		";

        
        
        // Thank you for participating in Pepper Lunch Simply Irresistible Teppan Catch.
        
        // Don’t forget to use your screenshot voucher at Pepper Lunch Restaurants or Express stores!
        
        // Find your nearest stores here.
        // (http://www.pepperlunch.com.sg/#/our_locations)
        
        // Teppan Catch
        
        // 13 June - 28 July
        
        // Keep playing! Top 3 high scores at the end of the campaign wins $250 Pepper Lunch vouchers!
        
        // Ready, Steady, Unlock!
        
        // 13 June - 28 July
        
        // Dine on 8 main dishes for your chance to unlock great prizes on 3 August!
        
        // Once you have collected all 8 stamps, visit pepperlunch.campaign.sg to RSVP for the Ready, Steady, Unlock event!
        
        // See you at Pepper Lunch!
        
        // Thank you!


		if ($mail->send()) {
			echo "EmailSent";

		} else {
			echo "EmailError: " . $mail->ErrorInfo;
		}
?>