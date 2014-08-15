var id = getURLParameter("id");
$(document).ready(function(){
    var pubnub = PUBNUB.init({
        publish_key: 'pub-c-242fbbf1-4cc6-4153-8f20-a671697f15ec',
        subscribe_key: 'sub-c-2361676c-1e85-11e4-bbbf-02ee2ddab7fe'
    });

    $("#controls").show();
    initTouchers("player", pubnub);
});

$("#controls").css("font-size", ($(window).height()) /3+ "px");
$("#controls").css("height", ($(window).height()) + "px");
$("#up").css("height", ($(window).height()/2) + "px");
$("#down").css("height", ($(window).height()/2) + "px");

$(window).resize(function() {
    $("#controls").css("font-size", ($(window).height()) /3+ "px");
    // $("#controls").css("margin-top", "-" + ($(window).height()/) + "px");
    $("#controls").css("height", ($(window).height()) + "px");
    $("#up").css("height", ($(window).height()/2) + "px");
    $("#down").css("height", ($(window).height()/2) + "px");
});

var initTouchers = function(name, pubnub) {
    var mySide = "left";
    document.ontouchstart = function(e){ 
      e.preventDefault(); 
    }

    pubnub.subscribe({
        channel: "pongnub_game",
        callback: function(m){},
        state: {
            side: mySide,
            name: name
        }
    });
    pubnub.subscribe({
        channel: "pongnub" + id,
        callback: function(){}
    });

    var publishAction = function(action) {
        pubnub.publish({
            channel: "pongnub" + id,
            message: action
        });
    }

    var touchHandler = function(eve) {
        var target = eve.target.id;
        var type = eve.type;
        if (type === "mousedown") type = "touchstart";
        if (type === "mouseup") type = "touchend";
        if (type === "mousleave") type = "touchend";
        var time = eve.time;

        // console.log(target);

        publishAction({"target": target, "type": type, side: mySide});
    }

    document.addEventListener("touchstart", function(e) {touchHandler(e)}, false);
    document.addEventListener("touchend", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchleave", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchcancel", function(e) {touchHandler(e);}, false);
    document.addEventListener("mousedown", function(e) {touchHandler(e);}, false);
    document.addEventListener("mouseup", function(e) {touchHandler(e);}, false);
    document.addEventListener("mouseleave", function(e) {touchHandler(e);}, false);   
}
