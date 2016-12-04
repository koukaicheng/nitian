<?php
	$id = $_GET["id"];
//1.链接数据库
	$mysqli = new mysqli("localhost","root","","angular");
	//2.判断数据库是否链接成功
	if($mysqli->connect_errno){
		die($mysqli->connect_errno);
	};
	//3.设置编码格式
	$mysqli->query("set names utf8");
	//4.编写spl语句
	$sql = "select * from product where id='$id'";
	//5.执行sql语句，并用变量接受返回值
	$result = $mysqli->query($sql);
	//6.查询结果
	if($result->num_rows){
	  //ftch_all
	  $data = $result->fetch_all(MYSQLI_ASSOC);
	  echo json_encode($data);
	};
	//7.关闭数据库
	$mysqli->close();
?>