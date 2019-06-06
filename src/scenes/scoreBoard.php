<?PHP
$database = "teppan";
$host = "127.0.0.1";
$user = "root";
$password = "";

$conn = new mysqli($host, $user, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql_current_playerScore = "SSELECT * FROM user ORDER BY user_id desc LIMIT 1";
$sql_top4 = "SELECT * FROM user ORDER BY score desc LIMIT 4";
$result = $conn->query($sql_top4);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "user_id: " . $row["user_id"]. " - user_name: " . $row["user_name"]. " - score: " . $row["score"]. "<br>";
    }
} else {
    echo "0 results";
}

// Everything good
die('success');
mysqli_close($con);

?>