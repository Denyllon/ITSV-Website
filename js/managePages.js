$(document).ready(function() {
	
	// Load homePage content
	$('#content-page').load('../pages/home.html');
	
	// Bind navbar items actions
	navbarActions();

});

function navbarActions() {

	function loadContent(page) {
		$('#content-page').empty().load('../pages/'+page+'.html')
	};

	// remove class "active" from each element of navbar
	function removeActiveClass() {
		$('#navbar').find('*').removeClass('active');
	};

	// Bind click() actions to navbar positions
	function bindAction(category, menuItem) {
		$('#'+menuItem+'Page').click( function(event){
			event.preventDefault();
			loadContent(menuItem);
			removeActiveClass();
			$('.'+category+'-button').addClass('active');
		});
	}

	$.getJSON('pages/menuIndex.json', function(data) {

		$.each(data, function(category, menuItem){
			if(category === menuItem) {
				bindAction(category, menuItem);
			} else if(category !== menuItem) {
				$.each(menuItem, function(indexNumber, submenuItem){
					bindAction(category, submenuItem);
				});
			} else {
				console.log('Bind Action to navbar menu error!')
			}
		});
	});

};

//$('.forward-to-contact').click(function(event){
//	event.preventDefault();
//	alert('rrr');
//	$('#content-page').load('../pages/contact.html');
//});