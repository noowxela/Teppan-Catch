<?PHP
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST, GET');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$database = "u233241291_game2";
$host = "127.0.0.1";
$user = "u233241291_too";
$password = "Hsilrnmit2Yd";

// $key = $_POST['key'];
// if($key != 't'){

// 	die('hack failed');
// }
// echo 23;
// $name = $_POST['name'];
// $contact = $_POST['contact'];
// $email = $_POST['email'];
// $score = $_POST['score'];
// $user_id = "";

// if($score>160){
//     die();
// }
$encrypted = $_POST['encrypted'];
$decrypt = base64_decode($encrypted);
$playerdata = json_decode($decrypt, true);

$name 		= $playerdata[0];
$contact 	= $playerdata[1];
$email 		= $playerdata[2];
$score 		= $playerdata[3];


if($score > 160){
    die();
}

$con = mysqli_connect($host,$user,$password) or ("Cannot connect!" .mysqli_error($con));
if (!$con)
	die('Error could not connect: ' . mysql_error());
	
mysqli_select_db($con,$database) or die ("Error could not load database" . mysqli_error($con));


$sql_currentPlayer = "SELECT * FROM user WHERE user_name = '". $name . "'And user_contact = '" . $contact . "'And user_email = '" . $email . "' " ;
$result = $con->query($sql_currentPlayer);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $user_id = $row['user_id'];
    }
} else {
    echo("0 results");
}

// // run query
$sql = "UPDATE `user` SET `score` = '".$score."' WHERE user_id = '".$user_id."' ";
$ins = $con->query($sql);
if (!$ins)
	die('Error entry already exists ' . mysqli_error($con));

// Everything good
die('success');
mysqli_close($con);

?>