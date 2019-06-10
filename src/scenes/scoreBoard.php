<?PHP
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST, GET');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$database = "teppan_catch";
$host = "127.0.0.1";
$user = "root";
$password = "";

$name = $_POST['name'];
// $contact = $_POST['contact'];
// $email = $_POST['email'];
// $topScore = $_get['topScore'];
$user_id = "";

$con = mysqli_connect($host,$user,$password) or ("Cannot connect!" .mysqli_error($con));
if (!$con)
	die('Error could not connect: ' . mysql_error());
	
mysqli_select_db($con,$database) or die ("Error could not load database" . mysqli_error($con));

$rank_top4= array();

$sql_all = "SELECT * FROM user ORDER BY score desc";
$result_all = $con->query($sql_all);
$rowCounter = 1 ;
$top_4Counter = 4 ;

if ($result_all->num_rows > 0) {
    while($row = $result_all->fetch_assoc()) {

        if($row['user_name'] ==  $name){
            // if($top_4Counter >0){
                array_push($rank_top4 ,array($row['user_id'],$row['user_name'],$row['score'],$rowCounter,$row['user_email'],$row['user_contact']));
                $top_4Counter-=1;
            // }
        }else if($top_4Counter  >0 ){
            array_push($rank_top4 ,array($row['user_id'],$row['user_name'],$row['score'],$rowCounter,$row['user_email'],$row['user_contact']));
            $top_4Counter-=1;
        }

        $rowCounter+=1;
    }
} else {
    die("0 results");
}
if(count($rank_top4)==5){
    $rank_top4[3][0] = $rank_top4[4][0] ;
    $rank_top4[3][1] = $rank_top4[4][1] ;
    $rank_top4[3][2] = $rank_top4[4][2] ;
    $rank_top4[3][3] = $rank_top4[4][3] ;
    $rank_top4[3][4] = $rank_top4[4][4] ;
    $rank_top4[3][5] = $rank_top4[4][5] ;

    array_pop($rank_top4);
}

echo ('{"scoreBoard": [');

for ($x = 0; $x < count($rank_top4); $x++) {
        echo ('{'.'"rank":"'.$rank_top4[$x][3]
            .'", "name":"'.$rank_top4[$x][1]
            .'", "point":"'.$rank_top4[$x][2]
            .'", "player_id":"'.$rank_top4[$x][0]
            .'", "email":"'.$rank_top4[$x][4]
            .'", "contact":"'.$rank_top4[$x][5].'"}');
        if($x < count($rank_top4)-1){
            echo ",";
        }
}
echo (']}');


mysqli_close($con);

?>