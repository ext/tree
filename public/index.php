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
		<template id="info-dirt">
			<h4>dirt</h4>
			<ul class="actions">
				<li><a data-cost="80" data-action="build" data-build="s" href="#build">Plant <span class="cost">80</span></a></li>
			</ul>
		</template>

		<template id="info-grass">
			<h4>dirt</h4>
			<ul class="actions">
				<li><a data-cost="20" data-action="build" data-build="d" href="#build">Clear <span class="cost">20</span></a></li>
				<li><a data-cost="100" data-action="build" data-build="s" href="#build">Plant <span class="cost">100</span></a></li>
			</ul>
		</template>

		<template id="info-sapling">
			<h4>dirt</h4>
			<ul class="actions">
				<li><a data-cost="40" data-action="build" data-build="0" href="#build">Water <span class="cost">40</span></a></li>
			</ul>
		</template>

		<template id="info-tree">
			<h4>Tree</h4>
			<p>Value: <span class="value"></span></p>
			<ul class="actions">
				<li><a data-cost="40" data-action="harvest" href="#harvest">Harvest <span class="cost">40</span></a></li>
				<li><a data-cost="1400" data-action="build" data-build="q" href="#build">Lumbermill <span class="cost">1400</span></a></li>
			</ul>
		</template>

		<template id="info-stump">
			<h4>Stumps</h4>
			<ul class="actions">
				<li><a data-cost="60" data-action="build" data-build="d" href="#build">Clear <span class="cost">60</span></a></li>
			</ul>
		</template>

		<template id="info-lumbermill">
			<h4>Lumbermill</h4>
			<ul class="actions">
			</ul>
		</template>

		<div id="menu">
			<ul id="state">
				<li class="gold"><?=$state->gold?></li>
			</ul>
			<ul>
				<li><a href="#step" onclick="arguments[0].preventDefault(); tree.update()">step</a></li>
				<li><a href="#reset" onclick="arguments[0].preventDefault(); tree.reset()">restart</a></li>
			</ul>
			<div id="info"></div>
			<pre id="debug"></pre>
			<div id="timer"></div>
		</div>
		<div id="content">
			<div id="map"></div>
		</div>
		<script>
		var blob = <?=encode($state, 'js')?>;
		var size = [<?=$map_width?>,<?=$map_height?>];
		</script>
		<script src="static/glue.js"></script>
	</body>
</html>
