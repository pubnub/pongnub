$(document).ready(function(){
    var pubnub = PUBNUB.init({
        publish_key: 'demo',
        subscribe_key: 'demo'
    });

    pubnub.subscribe({
        channel: 'pongnub_lobby',
        callback: function(m) {console.log(m)},
        presence: function(m) {
            pubnub.here_now({
                channel: 'pongnub_lobby',
                state: true,
                callback: function(m) {
                    if (m.occupancy >= 3) {
                        multiPlayer(m);
                    }
                }
            });
        }
    });
});

var multiPlayer = function(m) {
    var left = false;
    var right = false;

    for (var i = 0; i < m.uuids.length; i++) {
        if (m.uuids[i].state.side === "left") {
            left = true;
        }
        else if (m.uuids[i].state.side === "right") {
            right = true;
        }
    };

    if (left && right) {
        window.location.href = 'http://larrywu.com/pongnub';
    }
}
