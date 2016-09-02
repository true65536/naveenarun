$(document).ready(function() {
$("#myButton").click(function(){$("#Output").html("Your water usage: " + parseInt($("#myForm").val())*2);});
})
