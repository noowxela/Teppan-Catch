



<?PHP
// Change here
$database = "teppan";
$host = "127.0.0.1";
$user = "root";
$password = "";


$database = $_POST['database'];
$host = $_POST['host'];
$user = $_POST['user'];
$password = $_POST['password'];

$name = $_POST['name'];
$contact = $_POST['contact'];
$email = $_POST['email'];
// $dob = $_POST['dob'];

$con = mysqli_connect($host,$user,$password) or ("Cannot connect!" .mysqli_error($con));
if (!$con)
	die('Error could not connect: ' . mysql_error());
	
mysqli_select_db($con,$database) or die ("Error could not load database" . mysqli_error($con));

// run query
// $sql = "INSERT INTO `form_submission_gamedemo`(`name`, `contact`, `email`, `dob`) VALUES ('".$user."','".$contact."','".$email."','".$dob."')";
// $sql = "INSERT INTO `form_submission_gamedemo`(`name`, `contact`, `email`, `dob`) VALUES ('".$user."','".$contact."','".$email."','".$dob."')";
$ins = $con->query($sql);
if (!$ins)
	die('Error entry already exists ' . mysqli_error($con));

// Everything good
die('success');
mysqli_close($con);


?>