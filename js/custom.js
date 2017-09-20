$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	};
	$('body').removeClass('loaded');
});
/* viewport width */
function viewport(){
	var win = window,
		a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		win = document.documentElement || document.body;
	}
	return { width : win[ a+'Width' ] , height : win[ a+'Height' ] }
}
/* viewport width */
$(function(){
	/* placeholder*/
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){
 			$(this).attr('placeholder', placeholder);
 		});
 	});
	/* placeholder*/

	$('.button-nav').click(function(){
		$(this).toggleClass('active'),
		$('.main-nav-list').slideToggle();
		return false;
	});
});

var handler = function(){

	var height_footer = $('footer').height();
	var height_header = $('header').height();
	$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});

	var viewport_wid = viewport().width;
};
$(window).bind('load', handler);
$(window).bind('resize', handler);