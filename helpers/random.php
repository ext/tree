<?php

function tree_randint($min, $max){
	return mt_rand($min, $max);
}

function tree_randint_array($n, $min, $max){
	return array_map(function() use ($min, $max) {
		return mt_rand($min, $max);
	}, array_fill(0, $n, 0));
}
