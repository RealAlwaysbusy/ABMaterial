(function ($) { 
    $.fn.ABMMask = function(options) {
        var self = this;
		var settings = $.extend({
			mask: '';			
		},options);
		this.attr('data-abmmask', settings.mask);
		
		this.bind('keydown', function(e) {
			console.log('down');
		});
		
		this.bind('keyup', function(e) {
			console.log('up');
		});
		
        return this;
    }; 
}(jQuery));