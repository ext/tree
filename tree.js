/* exported tree */
var tree = (function(){
	'use strict';

	var INTERVAL = 15000;
	var size = [12,12];
	var tree_level_mul = 80;
	var blob;
	var next_update = null;

	init();

	return {
		reset: reset,
		update: update,
	};

	function init(){
		blob = localStorage.getItem('blob');

		if ( blob !== null ){
			blob = JSON.parse(blob);
		} else {
			blob = {
				gold: 200,
				map: generate_map(),
			};
			commit();
		}

		setInterval(deferedUpdate, 250);
		next_update = Date.now() + INTERVAL;
		render();
	}

	function deferedUpdate(){
		var now = Date.now();
		var delta = next_update - now;
		if ( delta < 0 ){
			try {
				update();
			} finally {
				next_update += INTERVAL;
			}
		}

		var timer = Math.floor((next_update - now)/1000);
		document.getElementById('timer').innerText = timer;
	}

	function update(){
		console.log('update');
		grow();
		commit();
		render();
	}

	function grow(){
		grow_expand();
		grow_stumps();
		grow_placeholders();
	}

	function grow_placeholders(){
		blob.map = blob.map.replace(/§/g, 'd');
		blob.map = blob.map.replace(/!/g, 'g');
		blob.map = blob.map.replace(/&/g, '0');
		blob.map = blob.map.replace(/#/g, 'G');
		blob.map = blob.map.replace(/%/g, '9');
	}

	function grow_stumps(){
		var w = size[0];
		var h = size[1];
		for ( var y = 0; y < h; y++ ){
			for ( var x = 0; x < w; x++ ){
				var i = y * w + x;
				var t = blob.map.charAt(i);
				switch (t){
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					var v = parseInt(t);
					var q = '123456789x'.charAt(v);
					blob.map = blob.map.substr(0, i) + q + blob.map.substr(i+1);
					break;
				}
			}
		}
	}

	function grow_expand(){
		var w = size[0];
		var h = size[1];
		for ( var y = 0; y < h; y++ ){
			for ( var x = 0; x < w; x++ ){
				var i, t;

				/* look at current, grow stuff */
				i = y * w + x;
				t = blob.map.charAt(i);
				switch (t){
				case 'g':
					if ( Math.random() > 0.9 ){
						blob.map = blob.map.substr(0, i) + '#' + blob.map.substr(i+1);
					}
					break;

				case 'x':
					blob.map = blob.map.substr(0, i) + 'X' + blob.map.substr(i+1);
					break;

				case 'X':
					blob.map = blob.map.substr(0, i) + '0' + blob.map.substr(i+1);
					break;

				case 'q':
					if ( x > 0 ){
						lumbermill(y * w + (x-1));
					}
					if ( x+1 < w ){
						lumbermill(y * w + (x+1));
					}
					if ( y > 0 ){
						lumbermill((y-1) * w + x);
					}
					if ( y+1 < h ){
						lumbermill((y+1) * w + x);
					}
					break;

				case 'G':
				case '9':
					if ( x > 0 ){
						expand(y * w + (x-1), i); /* expand left */
					}
					if ( y > 0 ){
						expand((y-1) * w + x, i); /* expand up */
					}
					break;

				case 'd':
					if ( x > 0 ) {
						expand2(y * w + (x-1), i); /* expand right */
					}
					if ( y > 0 ) {
						expand2((y-1) * w + x, i); /* expand down */
					}
					break;
				}
			}
		}
	}

	function expand(i, j){
		var t = blob.map.charAt(i);
		var q = blob.map.charAt(j);
		var r = q === 'G' ? '!' : '&';
		switch (t){
		case 'd':
			blob.map = blob.map.substr(0, i) + r + blob.map.substr(i+1);
			break;
		}
	}

	function expand2(i, j){
		var t = blob.map.charAt(i);
		switch (t){
		case 'G':
			blob.map = blob.map.substr(0, j) + '!' + blob.map.substr(j+1);
			break;
		case '9':
			blob.map = blob.map.substr(0, j) + '&' + blob.map.substr(j+1);
			break;
		}
	}

	function lumbermill(i){
		var t = blob.map.charAt(i);
		if ( t === '7' ){
			harvest(i, 0, '§');
		}
	}

	function commit(){
		localStorage.setItem('blob', JSON.stringify(blob));
	}

	function reset(){
		localStorage.removeItem('blob');
		blob = undefined;
		init();
	}

	function randint(min, max){
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function generate_map(){
		var n = size[0] * size[1];
		return Array(n).fill(0).map(function(){
			var s = 'dddddddddddddddddddddddddddddddddggggggGG123456789x';
			var r = randint(0, s.length);
			return s.charAt(r);
		}).join('');
	}

	function build(i, tile, cost){
		blob.map = blob.map.substr(0, i) + tile + blob.map.substr(i+1);

		if ( cost ){
			blob.gold -= cost;
		}

		load_info(null);
	}

	function harvest(i, cost, res){
		var t = blob.map.charAt(i);
		var value = parseInt(t) * tree_level_mul;

		build(i, res || 'd', cost);
		blob.gold += value;
	}

	function load_info(src){
		/* clear current info */
		var elem = document.getElementById('info');
		elem.innerHTML = '';

		/* nothing to show */
		if ( src === null ){
			return;
		}

		var type = src.dataset.type;
		var i = parseInt(src.dataset.index);
		var template = document.getElementById('info-' + type);

		/* no template found */
		if ( !template ){
			console.error('No template for', type);
			return;
		}

		var info = document.importNode(template.content, true);
		Array.prototype.forEach.call(info.querySelectorAll('a'), function(elem){
			if ( elem.dataset.cost && elem.dataset.cost > blob.gold ){
				elem.className = 'expensive';
				elem.addEventListener('click', function(e){
					e.preventDefault();
				});
				return;
			}

			switch ( elem.dataset.action ){
			case 'build':
				elem.addEventListener('click', function(e){
					e.preventDefault();
					build(i, elem.dataset.build, elem.dataset.cost);
					render();
					commit();
				});
				break;
			case 'harvest':
				elem.addEventListener('click', function(e){
					e.preventDefault();
					harvest(i, elem.dataset.cost);
					render();
					commit();
				});
				break;
			}
		});

		if ( type === 'tree' ){
			var i = parseInt(src.dataset.index);
			var t = blob.map.charAt(i);
			info.querySelector('.value').innerText = parseInt(t) * tree_level_mul + ' (' + t + ')';
		}

		elem.appendChild(info);
	}

	// function render_debug(){
	// 	document.getElementById('debug').innerText = JSON.stringify(blob, null, 2);
	// }

	function render_map(){
		var map = document.getElementById('map');
		map.innerHTML = '';
		for ( var y = 0; y < size[1]; y++ ){
			var row = document.createElement('div');
			row.className = 'row';
			for ( var x = 0; x < size[0]; x++ ){
				var i = y * size[0] + x;
				var t = blob.map.charAt(i);
				var type = undefined;
				var cls = undefined;
				switch(t){
				case 'd':
					type = 'dirt';
					cls = 'dirt';
					break;
				case 'g':
					type = 'grass';
					cls = 'grass';
					break;
				case 'G':
					type = 'grass';
					cls = 'grasser';
					break;
				case 's':
					type = 'sapling';
					cls = 'sapling';
					break;
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
					type = 'tree';
					cls = 'tree';
					break;
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					type = 'tree';
					cls = 'treeer';
					break;
				case 'f':
					type = 'fire';
					cls = 'fire';
					break;
				case 'x':
				case 'X':
					type = 'stump';
					cls = 'stump';
					break;
				case 'q':
					type = 'lumbermill';
					cls = 'lumbermill';
					break;
				default:
					console.error('missing tile def', t);
					type = 'error';
					cls = 'error';
					break;
				}
				var tile = document.createElement('a');
				tile.href = "#tile";
				tile.className = 'tile ' + cls;
				tile.dataset.type = type;
				tile.dataset.pos = [x,y];
				tile.dataset.index = i;
				tile.addEventListener('click', function(e){
					load_info(this);
					e.preventDefault();
				});
				row.appendChild(tile);
			}
			map.appendChild(row);
		}
	}

	function render_ui(){
		var state = document.getElementById('state');
		state.querySelector('.gold').innerText = blob.gold;
	}

	function render(){
		//render_debug();
		render_map();
		render_ui();
	}

})();
