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
                }
            });
        }
    });
});

var multiPlayer = function(m) {
    
}
