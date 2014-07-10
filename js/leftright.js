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
                    if (m.occupancy >= 999) { // Change 999 to 2
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
                                pubnub.subscribe({
                                    channel: "pongnub_game",
                                    callback: function(m) {console.log(m)},
                                    state: {
                                        side: window.side,
                                        name: name
                                    }
                                });
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

$("#controls").css("font-size", ($(window).height() - 95) + "px");
$("#controls").css("margin-top", "-" + ($(window).height()/6) + "px");
$("#controls").css("height", ($(window).height() + ($(window).height()/6)) + "px");

$(window).resize(function() {
    $("#controls").css("font-size", ($(window).height() - 95) + "px");
    $("#controls").css("margin-top", "-" + ($(window).height()/6) + "px");
    $("#controls").css("height", ($(window).height() + ($(window).height()/6)) + "px");
});


var pubnub = PUBNUB.init({
    publish_key: 'demo',
    subscribe_key: 'demo'
});

pubnub.subscribe({
    channel: "pongnub_game",
    callback: function(m){console.log(m)},
});

var pusher = function(m) {
    pubnub.publish({
        channel: "pongnub_game",
        message: m
    });
}

// document.addEventListener("touchstart", function(e) {pusher("SOMEONE IS TOUCHING ME!");}, false);
document.addEventListener("touchstart", function(e) {pusher("SOMEONE IS TOUCHING ME!!!");}, false);
document.addEventListener("touchend", function(e) {pusher("SOMEONE STOPPED TOUCHING ME...");}, false);
// document.addEventListener("touchleave", function(e) {pusher("TOUCHLEAVE");}, false);
// document.addEventListener("touchcancel", function(e) {pusher("TOUCHCANCEL");}, false);
// document.addEventListener("touchmove", function(e) {pusher("TOUCHMOVE");}, false);