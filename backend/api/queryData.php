<?php
header("Content-Type:application/json;charset=utf-8");

$startDate = $_REQUEST['startDate'];
$endDate = $_REQUEST['endDate'];
//$cwid = $_REQUEST['cwid'];
//$newDate = date_create($date);
//var_dump($newDate);
//$newDate = date_format($newDate,"Y-m");

include('config.php');
$link = mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

$sql = "set names utf8";
mysqli_query($link,$sql);

$sql = "select * from asus_checkin where cdate between '$startDate' and '$endDate'";
$result = mysqli_query($link,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);

