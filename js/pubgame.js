$(document).ready(function () {
    var name;
    var pubnub;

    var login = function () {
        name = $("#name").val();
        if (name.length > 0) {
            $('#name').attr("disabled", "disabled");
            $('#login').attr("disabled", "disabled");
            $("#setup").fadeOut();
            pubInit();
        }
    };

    var pubInit = function() {
        $("#lobby").fadeIn();

        pubnub = PUBNUB.init({
            publish_key: 'demo',
            subscribe_key: 'demo',
            uuid: name
        });

        var users = [];

        var onPresence = function(m) {
            if (m.action === "join") {
                users.push(m.uuid);
            }
            else if (m.action === "timeout" || m.action === "leave") {
                users = _.without(users, m.uuid);
            }
            users.sort();
            userUpdate();
        };

        var userUpdate = function() {
            $("#users").html('');
            for (var i = 0; i < users.length; i++) {
                if (users[i] === name) {
                    $("#users").prepend('<li class="list-group-item list-group-item-danger">' + users[i] + '</li>');
                }
                else {
                    $("#users").append('<li class="list-group-item challenge" id="' + users[i] + '">' + users[i] + '</li>');
                    $("#" + users[i]).click(function() {
                        challenge($(this).attr('id'));
                    });
                }
            };
        };


        var challenger;
        var challenges = [];

        var challenge = function(user) {
            $("#lobby").fadeOut();

            if (challenges.indexOf(user) > -1) {
                $("#challenge").append('<h3>Accepting ' + user +"'s challenge <i class='fa fa-spinner fa-spin'></i></h3>")
                $("#challenge").fadeIn();
                pubnub.publish({
                    channel: 'pongnub lobby',
                    message: {
                        sender: name,
                        recipient: user
                    }
                });

                gameInit(user, 2);
            }
            else {
                $("#challenge").append('<h3>Challenging ' + user +' <i class="fa fa-spinner fa-spin"></i></h3>')
                $("#challenge").fadeIn();
                pubnub.publish({
                    channel: 'pongnub lobby',
                    message: {
                        sender: name,
                        recipient: user
                    }
                });
                challenger = user;
            }
        };

        var onMessage = function(m) {
            console.log(m);
            if (m.recipient === name) {
                if (challenger === m.sender) {
                    gameInit(m.sender, 1);
                }
                else {
                    challenges.push(m.sender);
                    $("#" + m.sender).append('<span class="badge">!!!</span>');
                }
            }
        };

        pubnub.subscribe({
            channel: 'pongnub lobby',
            callback: onMessage,
            presence: onPresence
        });
    };

    var gameInit = function(user, num) {
        $("#challenge").fadeOut();
        $("#game").fadeIn();
        window.num = num;
        window.game_start = true;

        pubnub.unsubscribe({
            channel: 'pongnub lobby'
        });
        
        if (num === 1) { // Control Left Side
            pubnub.subscribe

        }
        else if (num === 2) { // Control Right Side

        }
    }




    // Login
    $("#login").click(function() {
        login();
    });
    $("#name").keypress(function(e) {
        if (e.which === 13) {
            login();
        }
    });
});