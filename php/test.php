<?
$name =["arun","kannan","suresh","hari","kishore","karthi"];
for ($i=0; $i<count($name) ; $i++){
    ?><h1><?print($name[$i])?></h1>
    <?
}

echo "<pre>";
system("./test 10");
echo "</pre>";
?>