<?PHP
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST, GET');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$database = "u233241291_game2";
$host = "127.0.0.1";
$user = "u233241291_too";
$password = "Hsilrnmit2Yd";

// $name = $_POST['name'];
// $contact = $_POST['contact'];
// $email = $_POST['email'];
// $score = $_POST['score'];
// $subscribe = $_POST['subscribe'];
// $date = $_POST['date'];
// $time = $_POST['time'];
$encrypted = $_POST['encrypted'];
$decrypt = base64_decode($encrypted);
$playerdata = json_decode($decrypt, true);

$name 		= $playerdata[0];
$contact 	= $playerdata[1];
$email 		= $playerdata[2];
$score 		= $playerdata[3];
$subscribe 	= $playerdata[4];


date_default_timezone_set('Asia/Singapore');
$date = date("m-d-Y");
$time = date("H:i:s");
//echo $date;
// echo $time;

$con = mysqli_connect($host,$user,$password) or ("Cannot connect!" .mysqli_error($con));
if (!$con)
	die('Error could not connect: ' . mysql_error());
	
mysqli_select_db($con,$database) or die ("Error could not load database" . mysqli_error($con));

// run query
$sql = "INSERT INTO `user`(`user_name`, `user_contact`, `user_email`, `score`, `subscribe`, `date`, `time`) VALUES ('".$name."','".$contact."','".$email."','".$score."','" . $subscribe ."','".$date."','".$time."')";
$ins = $con->query($sql);
if (!$ins)
	die('Error entry already exists ' . mysqli_error($con));

// Everything good
die('success');
mysqli_close($con);

?>