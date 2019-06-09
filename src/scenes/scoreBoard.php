<?PHP
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST, GET');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$database = "teppan_catch";
$host = "127.0.0.1";
$user = "root";
$password = "";

$conn = new mysqli($host, $user, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// $sql_current_playerScore = "SSELECT * FROM user ORDER BY user_id desc LIMIT 1";
$sql_top4 = "SELECT * FROM user ORDER BY score desc LIMIT 4";
$result = $conn->query($sql_top4);


if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        die('{"user_id": "' . $row['user_id']. '","user_name": "' . $row['user_name']. '","score": "' . $row['score'] . '"}');
    }
} else {
    die("0 results");
}

mysqli_close($con);

?>