// Add listener for all ajax request so we can localize the changed strings

chrome.webRequest.onCompleted.addListener( function( details ) {
	chrome.tabs.getSelected( null, function( tab ) {
		chrome.tabs.sendRequest( tab.id, {}, function(){} );
	} );
}, {
	urls: [
		"*://app.asana.com/*"
	]
});
