<?php
include('./upload/autoload.php');
use LibreMVC\Helpers\Upload;
try {
    $upload = new Upload('File', $_FILES, "./../uploaded/", $allowedType);
    $upload->send();
}
catch (Exception $e) {
    header('HTTP/1.1 500 Server Error');
    echo $e->getMessage();
}
