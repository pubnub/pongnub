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
                callback: function(m) {
                    if (m.occupancy >= 3) {
                        multiPlayer(m);
                    }
                    else if (m.occupancy >= 2) {
                        singlePlayer(m);
                    }
                }
            });
        }
    });
});

var singlePlayer = function(m) {
    for (var i = 0; i < m.uuids.length; i++) {
        m.uuids[i]
    };
}

var multiPlayer = function(m) {

}
