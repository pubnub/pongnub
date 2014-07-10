$(document).ready(function(){
    var pubnub = PUBNUB.init({
        publish_key: 'demo',
        subscribe_key: 'demo'
    });
    gliderino(pubnub);

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

var gliderino = function (p) {
    var IDLE_TIME = 2000;
    var THROTTLE_TIME = 100;

    function throttle(fn, delay) {
        var interval = 0;
        var last = 0;

        return function () {
            var now = Date.now();
            if (now - last < delay) {
                clearTimeout(interval);
                interval = setTimeout(throttled, delay);
            }
            else {
                last = now;
                fn.apply(this, arguments);
            }
        };
    }

    var globe = {
        "interval" : -1,
        "scale" : 1,
        "gesture" : false,

        "touch" : {
            "x" : 0,
            "y" : 0
        },
        "pos" : {
            "x" : 0,
            "y" : 0
        },
        "delta" : {
            "x" : 0,
            "y" : 0
        },

        "copytouch" : function (touch) {
            return {
                "x" : touch.pageX,
                "y" : touch.pageY
            };
        },

        "touchstart" : function (e) {
            if (globe.interval >= 0) {
                return;
            }

            globe.touch = globe.copytouch(e.touches[0]);
            globe.pos.x = globe.touch.x;
            globe.pos.y = globe.touch.y;
            globe.delta.x = 0;
            globe.delta.y = 0;

            // Continuously pause idle animation
            globe.interval = setInterval(globe.publish, IDLE_TIME);
        },

        "touchend" : function (e) {
            // Allow idle animation to continue
            clearInterval(globe.interval);
            globe.interval = -1;
        },

        "touchmove" : function (e) {
            e.preventDefault();

            if (globe.gesture) {
                return;
            }

            globe.touch = globe.copytouch(e.touches[0]);
            globe.delta.x = globe.pos.x - globe.touch.x;
            globe.delta.y = globe.pos.y - globe.touch.y;

            globe.publish();
        },

        "gesturestart" : function (e) {
            globe.gesture = true;
        },

        "gesturechange" : function (e) {
            globe.gesture = true;
        },

        "gestureend" : function (e) {
            globe.gesture = false;
        },

        "publish" : throttle(function () {
            p.publish({
                "channel"   : "pongnub_game",
                "message"   : {
                    "type"      : "move",
                    "x"         : globe.delta.x,
                    "y"         : globe.delta.y
                }
            });

            globe.pos.x = globe.touch.x;
            globe.pos.y = globe.touch.y;
            globe.delta.x = 0;
            globe.delta.y = 0;
        }, THROTTLE_TIME)
    };


    document.addEventListener("DOMContentLoaded", function () {
        document.addEventListener("touchstart",  globe.touchstart, false);
        document.addEventListener("touchend",    globe.touchend,   false);
        document.addEventListener("touchleave",  globe.touchend,   false);
        document.addEventListener("touchcancel", globe.touchend,   false);
        document.addEventListener("touchmove",   globe.touchmove,  false);

        document.addEventListener("gesturestart",  globe.gesturestart,  false);
        document.addEventListener("gestureend",    globe.gestureend,    false);
        document.addEventListener("gesturechange", globe.gesturechange, false);

    }, false);
}

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
document.addEventListener("touchstart", function(e) {pusher("TOUCHSTART");}, false);
document.addEventListener("touchend", function(e) {pusher("TOUCHEND");}, false);
document.addEventListener("touchleave", function(e) {pusher("TOUCHLEAVE");}, false);
document.addEventListener("touchcancel", function(e) {pusher("TOUCHCANCEL");}, false);
document.addEventListener("touchmove", function(e) {pusher("TOUCHMOVE");}, false);