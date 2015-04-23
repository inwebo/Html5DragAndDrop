<?php
include('./upload/autoload.php');
use LibreMVC\Helpers\Upload;
try {

    $upload = new Upload('File', $_FILES, "./../uploaded/", array('image/png','image/jpeg','image/gif','image/bmp'));
    $upload->send();
}
catch (Exception $e) {
    header('HTTP/1.1 500 Server Error');
    echo $e->getMessage();
}
