<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Content-Type:application/json;charset=utf-8");

$uwid = $_REQUEST['uwid'];
$upwd = $_REQUEST['upwd'];

include('config.php');
$link = mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

$sql = "set names utf8";
mysqli_query($link,$sql);

//查询工号有无，无则返回工号错误
$sql = "select * from asus_user where uwid='$uwid'";
$result = mysqli_query($link,$sql);
$uwidSearch = mysqli_fetch_assoc($result);
if(!$uwidSearch){
  echo json_encode(['result' => 0, 'message' => '查无此工号！']);
} else {
//查询密码有无，有则让用户直接登录，无则写入数据库返回成功信息
  $upwdSearch = $uwidSearch['upwd'];
  if($upwdSearch){
    echo json_encode(['result' => 0, 'message' => '此工号已注册，请直接登录']);
  } else {
    $sql = "update asus_user set upwd='$upwd' where uwid='$uwid'";
      $result = mysqli_query($link,$sql);
      if($result){
        echo json_encode(['result' => 1, 'message' => '注册成功']);
      }else{
        echo json_encode(['result' => 0, 'message' => '写入数据库失败']);
      }
  }
}
