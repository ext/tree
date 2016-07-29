<?php

$path = trim($_SERVER['PATH_INFO'], '/');
switch ( $path ){
	case 'none':
	case 'dirt':
	case 'tree':
		require "../info/{$path}.php";
		break;
	default:
		echo '404';
		break;
}
