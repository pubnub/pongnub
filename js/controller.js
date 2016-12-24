var id = getURLParameter("id");
$(document).ready(function(){
//new 40
    var pubnub = new PubNub({
        publishKey: 'pub-c-0ecaf3c4-bc3a-4e03-94e7-e85e196fdc4c',
        subscribeKey: 'sub-c-673a62aa-24c9-11e4-a77a-02ee2ddab7fe'
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
        channels: ["pongnub_game","pongnub" + id],
        state: {
            side: mySide,
            name: name
        }
    });

    var listener = {
      status: function(status){
        console.log("pongnub" + id);
      },
      message: function(m){
        console.log("message received: " + m);
      },
      presence: function(m){
        console.log("presence received: " + m);
      }

    };

    var publishCallback = function(status,response){
      console.log("status: " + status);

    }

    pubnub.addListener(listener);


    var publishAction = function(action) {
        pubnub.publish({
            channel: "pongnub" + id,
            message: action
        }, publishCallback);
    }

    var touchHandler = function(eve) {
      console.log(eve);
        var target = eve.target.id;
        var type = eve.type;
        if (type === "mousedown") type = "touchstart";
        if (type === "mouseup") type = "touchend";
        if (type === "mouseleave") type = "touchend";
        if (type === "mousleave") type = "touchend";
        var time = eve.time;


        publishAction({"target": target, "type": type, side: mySide});
    }

    document.addEventListener("touchstart", function(e) {touchHandler(e)}, false);
    document.addEventListener("touchend", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchleave", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchcancel", function(e) {touchHandler(e);}, false);
    document.addEventListener("mousedown", function(e) {touchHandler(e);}, false);
    document.addEventListener("mouseup", function(e) {touchHandler(e);}, false);
    document.addEventListener("mouseleave", function(e) {touchHandler(e);}, false);

    $(document).keydown(function(e) {
      if (e.which == "40") touchHandler({target: {id : "down"}, type: "mousedown" });
      if (e.which == "38") touchHandler({target: {id: "up"}, type: "mousedown" });

    });

    $(document).keyup(function(e) {
      if (e.which == "40") touchHandler({target: {id : "down"}, type: "mouseup" });
      if (e.which == "38") touchHandler({target: {id : "up"}, type: "mousup" });
    });
}
