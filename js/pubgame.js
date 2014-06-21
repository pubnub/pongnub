$(document).ready(function(){
name = '';
var chooseName = function(type) {
    name = $('#name').val() + '.' + type;
    console.log(name);
    $('#name').attr("disabled","disabled");
    $('#submit').attr("disabled","disabled");

    pubInit(name, type);
};

var pubInit = function(name, type) {
    initz = {
        publish_key: 'demo',
        subscribe_key: 'demo'
    };
    initz['uuid'] = name;
    window.pubnub = PUBNUB.init(initz);

    if (type === 'find') {
        pubnub.subscribe({
            channel: 'multipongLobby',
            message: function(m){finding(m)}
        });
        setTimeout(function() {loadlobby();}, 1000);

    }
    else {
        pubnub.subscribe({
            channel: 'multipongLobby',
            message: function(m){hosting(m)}
        })
    }
};

var finding = function(m) {
    console.log('finding has been called');
    window.myType = 'Find';
    if (m['finder'] === name) {
        window.hoster = m['hoster'];
        pubnub.unsubscribe({channel: 'multipongLobby'});
        //pubnub.subscribe({channel: 'multipongGame', message: function(m){playgame(m)}});
        $('#game').show();
        window.gameReady = true;
        window.subscribed = false;
    }
};

var hosting = function(m) {
    console.log('hosting has been called');
    window.myType = 'Host';
    if (m['hoster'] === name) {
        window.finder = m['find'];
        msg = {'finder': window.finder, 'hoster' : name};
        pubnub.publish({channel: 'multipongLobby', message: msg});
        pubnub.unsubscribe({channel: 'multipongLobby'});
        //pubnub.subscribe({channel: 'multipongGame', message: function(m){playgame(m)}});
        $('#game').show();
        window.gameReady = true;
        window.subscribed = false;
    }
};

var loadlobby = function() {
    console.log('lobby should be loading');
    pubnub.here_now({
        channel : 'multipongLobby',
        callback : function(m){displayLobby(m)}
    });
};

var displayLobby = function(m) {
    console.log(m)
    if (m['occupancy'] >= 1) {
        ids = m['uuids']
        $('#lobby').html('Here is a list of players currently hosting a game.<br>');
        for (var i = 0; i < ids.length; i++) {
            id = ids[i].split('.');
            if (id[id.length-1] === 'host') {
                $('#lobby').append(id[0]); // Doesn't work if name includes period.
                $('#lobby').append(' <button class="play" value='+ids[i]+'>Play me</button>')
                $('#lobby').append('<br>');
            }
        }
        $('.play').click(function() {
            //console.log('u want to play a game??');
            chooseHost($(this).attr("value"));
            $('#findorhost').hide();
            $('#lobby').hide();
        });
    }
    else {
        $('#lobby').html('Looks like nobody is hosting a game at the moment.<br> Press find to try again, or press host to host a game.');
    }
}

var chooseHost = function(player) {
    pubnub.publish({
        channel: 'multipongLobby',
        message: {'find' : name, 'hoster' : player}
    });
}

$('#login').click(function() {
    chooseName('find');
});

});