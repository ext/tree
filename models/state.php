<?php

class State {
	public $gold;
	public $map;

	private static $mapping = [
		'gold' => 'g',
		'map' => 'm',
	];

	public static function initial(){
		global $map_width, $map_height;
		$state = new State();
		$state->gold = 100;
		$state->map = implode(array_map(function($i){
			return substr("ddddgt", $i, 1);
		}, tree_randint_array($map_width * $map_height, 0, 5)));
		return $state;
	}

	public static function from_json($json){
		$state = new State();
		foreach ( static::$mapping as $long => $short ){
			$state->$long = $json->$short;
		}
		return $state;
	}

	public function as_json(){
		$data = [];
		foreach ( static::$mapping as $long => $short ){
			$data[$short] = $this->$long;
		}
		return $data;
	}
}
