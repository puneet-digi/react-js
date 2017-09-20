<?php
	include('./config.php');
	include('./config-local.php');
    function c($exp){echo '<pre>';print_r($exp);echo '</pre>';}
    error_reporting( E_ALL );
    ini_set('display_errors', 1); 
    $config = array_merge(include('./config.php'), include('./config-local.php'));
    
    $mysqli = new mysqli("localhost", $config['config']['user'], $config['config']['password'], $config['config']['db']);
    if ($mysqli->connect_error) {
        die("Database Connection failed: " . $mysqli->connect_error);
    }
?>
