$(document).ready(function(){
    var pubnub = PUBNUB.init({
        publish_key: 'demo',
        subscribe_key: 'demo'
    });

    pubnub.subscribe({
        channel: 'pongnub_lobby',
        callback: function(m) {console.log(m)},
        connect: function() {
            pubnub.here_now({
                channel: 'pongnub_lobby',
                callback: function(m) {
                    $("#spinner").hide();
                    if (m.occupancy >= 999) { // change 999 to 2 when ready
                        $("#full").show();
                        pubnub.unsubscribe({
                            channel: "pongnub_lobby"
                        });
                    }
                    else {
                        $("#setup").show();
                        $("#login").click(function() {
                            var name = $("#name").val();
                            if (name.length > 0) {
                                $("#setup").hide();
                                $("#title").hide();
                                $("#controls").show();
                                initTouchers(name, pubnub);
                            }
                        });
                        $("#name").keypress(function(e) {
                            if (e.which === 13) {
                                $("#login").click();
                            }
                        });
                    }
                }
            });
        },
    heartbeat: 10
    });
});

$("#controls").css("font-size", ($(window).height()) /3+ "px");
// $("#controls").css("margin-top", "-" + ($(window).height()/) + "px");
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
    var mySide = window.side;

    pubnub.subscribe({
        channel: "pongnub_game",
        callback: function(m){},
        state: {
            side: mySide,
            name: name
        }
    });

    var publishAction = function(action) {
        pubnub.publish({
            channel: "pongnub_game",
            message: action
        });
    }

    var touchHandler = function(eve) {
        var target = eve.target.id;
        var type = eve.type;
        var time = eve.time;

        // console.log(target);

        publishAction({"target": target, "type": type, side: mySide});
    }

    // document.addEventListener("touchstart", function(e) {publishAction("SOMEONE IS TOUCHING ME!!!")}, false);
    // document.addEventListener("touchend", function(e) {publishAction("SOMEONE STOPPED TOUCHING ME...");}, false);
    // document.addEventListener("touchleave", function(e) {publishAction("TOUCHLEAVE");}, false);
    // document.addEventListener("touchcancel", function(e) {publishAction("SOMEONE CANCELED ME?????");}, false);
    // document.addEventListener("touchmove", function(e) {publishAction("TOUCHMOVE");}, false);

    document.addEventListener("touchstart", function(e) {touchHandler(e)}, false);
    document.addEventListener("touchend", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchleave", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchcancel", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchmove", function(e) {touchHandler(e);}, false);

}

