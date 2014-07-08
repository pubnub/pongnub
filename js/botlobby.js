$(document).ready(function () {
    var pubnub = PUBNUB.init({
        publish_key: 'demo',
        subscribe_key: 'demo'
    });

    pubnub.subscribe({
        channel: 'bot_lobby',
        message: function(m) {console.log(m)}
        presence: function()
    });


});