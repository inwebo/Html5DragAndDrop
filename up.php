<?php
//var_dump(file_get_contents('php://input'));
/*
$data = file_get_contents('php://input');
$file = json_decode(getallheaders()['File']);
header("Content-Length: ".$file.size);
file_put_contents(
    'demos/up/demo.png' ,
    file_get_contents('php://input')
);
*/
var_dump($_FILES);
//var_dump($data);
