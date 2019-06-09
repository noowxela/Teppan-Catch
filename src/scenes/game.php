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

// $sql_top4 = "SELECT * FROM user";
// $result = $con->query($sql_top4);

// SELECT * FROM user WHERE user_name = "Name" ORDER BY user_id desc LIMIT 1
$sql_currentPlayer = "SELECT * FROM user WHERE user_name = '". $name . "' user_contact = '" . $contact . "' user_email = '" . $email . "' " . "'ORDER BY user_id desc LIMIT 1";
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