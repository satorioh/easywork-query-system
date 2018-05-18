<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Content-Type:application/json;charset=utf-8");

require_once 'vendor/autoload.php';
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;

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
//查询密码有无，无则让用户先注册
  $upwdSearch = $uwidSearch['upwd'];
  if(!$upwdSearch){
    echo json_encode(['result' => 0, 'message' => '请注册后再登录']);
  } else {
    $sql = "select * from asus_user where uwid='$uwid' and upwd='$upwd'";
    $result = mysqli_query($link,$sql);
    $list = mysqli_fetch_assoc($result);
    $uename = $list['uename'];

      if($list){
      $signer = new Sha256();
      $token = (new Builder())->setIssuer('ASUS EasyWork')
            ->setAudience('easywork.asus.com.cn')
            ->setIssuedAt(time())
            ->setId($uwid, true)
            ->setExpiration(time() + 3600)
            ->sign($signer, 'bea73dc38cb94b4c910a9e87059909ca')
            ->getToken();
            echo json_encode(['result' => 1, 'message' => 'Token generated successfully', 'uwid' => $uwid, 'uename' => $uename, 'token' => '' . $token]);
              } else {
                echo json_encode(['result' => 0, 'message' => '密码错误！']);
              }
  }
}



