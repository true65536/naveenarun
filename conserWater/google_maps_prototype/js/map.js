var map;
var myLocations;
var myInfoBoxes;
var goodMarkers;
var badMarkers;
var myPaths;
var centerMarker = null;

function closeAllInfoBoxes() {
	myInfoBoxes.map(function(x){x.close();});
}
function closeAllBadMarkers() {
	badMarkers.map(function(x){x.setVisible(false);});
	badMarkers = [];
}

function reset() {
	closeAllInfoBoxes();
	myPaths.map(function(x){x.setMap(null);});
	closeAllBadMarkers();
	goodMarkers.map(function(x){x.setVisible(false);});
	google.maps.event.clearListeners(map,'click');
	if (centerMarker != null) {
		centerMarker.setVisible(false);
	}
	map.addListener('click',function(event) {
                makeInfoBox(event.latLng);
        });
	myLocations = [];
	myInfoBoxes = [];
	goodMarkers = [];
	badMarkers  = [];
	myPaths = [];
}

function undo() {
	closeAllInfoBoxes();
	if (goodMarkers.length > 0) {
		badMarkers.push(goodMarkers.pop());
	}
	closeAllBadMarkers();
	drawLines();
}

function drawLines() {
	myPaths.map(function(x){x.setMap(null);});
	myPaths = [];
	var coords = [];
	goodMarkers.map(function(x){coords.push(x.position);});
	newPath = new google.maps.Polyline({path: coords, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2});
	newPath.setMap(map);
	myPaths.push(newPath);
}

function getCenter() {
	sumLat = 0;
	sumLong = 0;
	goodMarkers.map(function(x){sumLat+=x.position.lat();sumLong+=x.position.lng()});
	avgLat = sumLat/goodMarkers.length
	avgLong = sumLong/goodMarkers.length;
	centerMarker = new google.maps.Marker({map:map,visible:true});
	centerMarker.setPosition({lat: avgLat, lng:avgLong});
}

function getArea() {
	//TODO: Finish getArea()
	area = 0;
	j = goodMarkers.length - 1;
}

function makeMarker(myLatLng) {
	closeAllBadMarkers();
	myMarker = new google.maps.Marker({map:map,draggable:true});
	myMarker.setPosition(myLatLng);
	myMarker.addListener('click',function(event){popupAddBox(this);});
	badMarkers.push(myMarker);
	myLocations.push(myLatLng);
	return myMarker;
}

function popupAddBox(m) {
	closeAllInfoBoxes();
	myBox = new google.maps.InfoWindow({content:'add this <button onclick="confirmMarker()">Click me</button>',map:map,anchor:m});
	myBox.addListener('closeclick',function(event){closeAllBadMarkers();});
	//myBox.open(map,m);
	myInfoBoxes.push(myBox);
}

function confirmMarker() {
	closeAllInfoBoxes();
	m = badMarkers.pop()
	m.setOpacity(0.5);
	goodMarkers.push(m);
	drawLines();
	google.maps.event.clearListeners(m,'click');
	m.addListener('click',function(){closeAllInfoBoxes();});
	if (goodMarkers.length == 1) {
		m.addListener('click',function(event){popupRemoveBox(this);});
	}
	m.addListener('position_changed',function(event){drawLines();})
}

function popupRemoveBox(m) {
	closeAllInfoBoxes();
	closeAllBadMarkers();
	myBox = new google.maps.InfoWindow({content:'Finish path? <button onclick="finishPath()">Finish</button>'});
	myBox.addListener('closeclick',function(event){closeAllBadMarkers();});
	myBox.open(map,m);
	myInfoBoxes.push(myBox);
}

function finishPath() {
	if (goodMarkers.length < 3) { return; }
	google.maps.event.clearListeners(map,'click');
	closeAllInfoBoxes();
	goodMarkers.push(goodMarkers[0]);
	drawLines();
	getCenter();
	goodMarkers.map(function(x){google.maps.event.clearListeners(x,'click');x.setOptions({draggable:false});x.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');});
}

function makeInfoBox(myLatLng) {
	myMarker = makeMarker(myLatLng);
	popupAddBox(myMarker);
	//document.getElementById('myLocations').innerHTML = myLocations;
	document.getElementById('myLocations').innerHTML = badMarkers;
}


function initMap() {
	myLocations = [];
	myInfoBoxes = [];
	goodMarkers = [];
	badMarkers  = [];
	myPaths = [];
	map = new google.maps.Map(document.getElementById('map'),
		{center: {lat: 34.139, lng: -118.125}, zoom: 16});
	map.addListener('mousemove',function(event) {
		document.getElementById('myText').innerHTML = "Current position: " + event.latLng.toString();
	});
	map.addListener('click',function(event) {
		makeInfoBox(event.latLng);
	});

	var input = document.getElementById('pac-input');
	var resetButton = document.getElementById('pac-button-reset');
	var undoButton = document.getElementById('pac-button-undo');
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(resetButton);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(undoButton);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
	  makeInfoBox(place.geometry.location);
        });
}

