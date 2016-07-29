var tree = (function(){
	'use strict';

	var info_frame = document.querySelector('#info iframe');

	return {
		info_actions: info_actions,
	};

	function info_document(){
		return info_frame.contentWindow.document;
	}

	function info_actions(elem, e, x, y){
		e.preventDefault();

		info_frame.onload = function(){
			var doc = info_document();
			Array.prototype.forEach.call(doc.querySelectorAll('a'), function(elem){
				console.log(elem.href);
				elem.href = '../?blob=' + JSON.stringify(blob);
			});
		}
		info_frame.src = elem.href;
	}

})();
