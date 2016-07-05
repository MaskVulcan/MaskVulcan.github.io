if (!Array.prototype.merge) {
    Array.prototype.merge = function(arr){ 
    	
        for (var i = 0; i < arr.length; i++) {
			var signals=false;
            for (var j = 0; j < this.length; j++) {
                if (arr[i] == this[j]) 
                   signals=true;
            }
			if (!signals) this.push(arr[i]); 
			
        }
        return this;
    }
}
(function(){
	function jQuery (){
		var elements = new Array();
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if (typeof element =='string') {
				element = element.trim();//防止多余空格
				var signal = element.substr(0,1);
				if (signal=='#') {
					element = document.getElementById(element.substr(1));
					elements.push(element);
				}
				else if (signal=='.') {
 					element = document.getElementsByClassName(element.substr(1));
					elements = elements.merge(element);
				}
				else {
					element = document.getElementsByTagName(element);
					elements = elements.merge(element);
				}
			}
			else {
				elements.push(element);
			}
		};
		if (elements.length == 0 || elements[0]==null) { return };
		function attr () {
			if (typeof arguments[0] == 'undefined') {return undefined;};
			if (typeof arguments[1] == 'undefined') {
				if ( arguments[0] in this) {
					return this[arguments[0]];
				}
				else {
					return undefined;
				}
			}
			else {
				if ( arguments[0] in this) {
					this[arguments[0]] = arguments[1];
					return this[arguments[0]];
				}
				else {
					return undefined;
				}
			}
		}
		for (var i = 0; i < elements.length; i++) {
			elements[i].attr=attr;
		};
		elements.attr=attr;
		if (elements.length == 1) {elements = elements[0]};
		return elements;
	}
	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
	};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
	window.jQuery = window.$ = jQuery;

})();