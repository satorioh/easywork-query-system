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
$fetchToken = '';

foreach ($_SERVER as $name => $value){
           if ($name == 'HTTP_AUTHORIZATION'){
               $fetchToken = substr($value, 7);
           }
       }
$token = (new Parser())->parse($fetchToken);
$signer = new Sha256();
$signerCheck = $token->verify($signer, 'bea73dc38cb94b4c910a9e87059909ca');
$expire = $token->getClaim('exp');
$expireCheck = $expire > time();
$uwidCheck = $token->getClaim('jti') == $uwid;
echo json_encode($uwidCheck);
