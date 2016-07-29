<?php

function encode($state, $context='html'){
	$data = json_encode($state->as_json());
	switch ($context) {
		case 'js':
			return $data;
		case 'html':
		default:
			return htmlspecialchars($data);
	}
}

function decode($blob){
	if ( $blob === null ){
		return State::initial();
	} else {
		return State::from_json(json_decode($blob));
	}
}
