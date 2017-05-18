<?php
	$check = $_GET['check'];
	$ran1 = $_GET['ran1'];
	$ran2 = $_GET['ran2'];
	$ran3 = $_GET['ran3'];
	$ran4 = $_GET['ran4'];
	
	$json = array('check'=>$check,'ran1'=>$ran1,'ran2'=>$ran2,'ran3'=>$ran3,'ran4'=>$ran4);
	
	$json2 = json_encode($json);
	echo $json2;	
?>