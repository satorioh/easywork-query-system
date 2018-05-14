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

  $sql = "select * from asus_user where uwid='$uwid' and upwd='$upwd'";
  $result = mysqli_query($link,$sql);
  $list = mysqli_fetch_assoc($result);

  if($list){
  $signer = new Sha256();
  $token = (new Builder())->setIssuer('ASUS EasyWork')
        ->setAudience('easywork.asus.com.cn')
        ->setIssuedAt(time())
        ->setId($uwid, true)
        ->setExpiration(time() + 3600)
        ->sign($signer, 'bea73dc38cb94b4c910a9e87059909ca')
        ->getToken();
        echo json_encode(['result' => 1, 'message' => 'Token generated successfully', 'uwid' => $uwid, 'token' => '' . $token]);
          } else {
            echo json_encode(['result' => 0, 'message' => 'Invalid username and/or password']);
          }

