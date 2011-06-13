<?php	

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__FILE__));

$method = $_SERVER['REQUEST_METHOD'];
$url    = trim(@$_SERVER['PATH_INFO'], '/');

require_once (ROOT.DS.'lib'.DS.'bootstrap.php');