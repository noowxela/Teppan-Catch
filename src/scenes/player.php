<?PHP
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST, GET');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$database = "teppan_catch";
$host = "127.0.0.1";
$user = "root";
$password = "";

$name = $_POST['name'];
$contact = $_POST['contact'];
$email = $_POST['email'];
$score = $_POST['score'];

$con = mysqli_connect($host,$user,$password) or ("Cannot connect!" .mysqli_error($con));
if (!$con)
	die('Error could not connect: ' . mysql_error());
	
mysqli_select_db($con,$database) or die ("Error could not load database" . mysqli_error($con));

// run query
$sql = "INSERT INTO `user`(`user_name`, `user_contact`, `user_email`, `score`) VALUES ('".$name."','".$contact."','".$email."','".$score."')";
$ins = $con->query($sql);
if (!$ins)
	die('Error entry already exists ' . mysqli_error($con));

// Everything good
die('success');
mysqli_close($con);

?>