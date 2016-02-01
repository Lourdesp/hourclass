<?php
//these two lines are to make sure you can repeatedly reload the contents
// of the text file.  Can remove if not necessary
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");

$myFile = "studentData.txt";

$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = $_POST["toWrite"];
fwrite($fh, $stringData);
fclose($fh);
?>  