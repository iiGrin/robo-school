<?php
$_POST = json_decode(file_get_contents("php://input", true)); // работа php с данными json
echo var_dump($_POST); // ответ который приходит от сервера