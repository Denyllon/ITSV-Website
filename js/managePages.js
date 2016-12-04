$(document).ready(function() {
	
	// Load homePage content
	loadContent('home');
	
	// Bind navbar items actions
	navbarActions();

});

function navbarActions() {

	// Get navbar structure from JSON, and add actions for each navbar element
	$.getJSON('pages/menuIndex.json', function(data) {

		$.each(data, function(category, menuItem){
			if(category === menuItem) {
				bindAction(category, menuItem);
			} else if(category !== menuItem) {
				$.each(menuItem, function(indexNumber, submenuItem){
					bindAction(category, submenuItem);
				});
			} else {
				console.log('Bind Action to navbar menu error!');
			}
		});
	});
	// Add action to "navbar-brand"
	$('.navbar-brand').click( function(event){
		event.preventDefault();
		loadContent('home');
	})

	// Remove class "active" from each element of navbar
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
};

// Load content & add actions to links
	function loadContent(page) {
		$('#content-page').empty().load('../pages/'+page+'.html', function(){
			if((page === 'cloud') || (page === 'optima')) {
				addForwardTo('contact');
			} else if((page === 'home') || ( page === 'offer' )) {
				addForwardTo('outsourcing');
			} else return;
		});
	};

	function addForwardTo(page) {
		$('.forward-to-'+page).click( function(event) {
			event.preventDefault();
			loadContent(page);
		});
	}