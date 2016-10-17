currMarker=badMarkers.pop();currMarker.setOpacity(0.5);goodMarkers.push(currMarker);myInfoBoxes.pop().close();currMarker.addListener("click",
function(event){popupCloseBox(this);});
