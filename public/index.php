<?php

require '../tree.php';

$state = decode(isset($_GET['blob']) ? $_GET['blob'] : null);
$map = 'dddtdtddtdtdtdttdgggrgrrtrgtrgrtrrgrtgrtgrtrtrtrgtrgrtgtgrtg';
?>
<!DOCTYPE html>
<html>
	<head>
	  <link rel="stylesheet" type="text/css" href="static/tree.min.css">
	</head>
	<body>
		<div id="menu">
			<ul id="state">
				<li class="gold"><?=$state->gold?></li>
			</ul>
			<ul>
				<li><a href="asdf">asdf</a></li>
				<li><a href="?blob=<?=encode($state)?>">reload</a></li>
				<li><a href="?">restart</a></li>
			</ul>
			<div id="info">
				<iframe name="info" src="info/none"></iframe>
			</div>
		</div>
		<div id="content">
			<div id="map">
				<?php for ( $y = 0; $y < $map_height; $y++ ): ?>
					<div class="row">
						<?php for ( $x = 0; $x < $map_width; $x++ ): ?>
							<?php
							$i = $y * $map_width + $x;
							switch(substr($state->map, $i, 1)){
								case 'd': $tile = 'dirt'; break;
								case 'g': $tile = 'grass'; break;
								case 'f': $tile = 'fire'; break;
								case 's': $tile = 'sapling'; break;
								case 't': $tile = 'tree'; break;
								case 'x': $tile = 'stump'; break;
							}
							?>
							<a class="tile row-<?=$y?> col-<?=$x?> <?=$tile?>" target="info" onclick="tree.info_actions(this, arguments[0], <?=$x?>, <?=$y?>);" href="info/<?=$tile?>"></a>
						<?php endfor; ?>
					</div>
				<?php endfor; ?>
			</div>
		</div>
		<script>var blob = <?=encode($state, 'js')?>;</script>
		<script src="static/glue.js"></script>
	</body>
</html>
