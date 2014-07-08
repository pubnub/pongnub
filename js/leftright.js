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
                    console.log(m);
                    $("#spinner").hide();
                    if (m.occupancy >= 3) {
                        $("#full").show();
                    }
                    else {
                        $("#setup").show();
                    }
                }
            });
        }
    });
});
