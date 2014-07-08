$(document).ready(function () {
    var name;
    window.pubnub;

    var login = function () {
        name = $("#name").val();
        if (name.length > 0) {
            $('#name').attr("disabled", "disabled");
            $('#login').attr("disabled", "disabled");
            $("#setup").hide();
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
            $("#lobby").hide();

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
        $("#challenge").hide();
        $("#game").fadeIn();
        $("#settings").fadeIn();
        window.num = num;

        pubnub.unsubscribe({
            channel: 'pongnub lobby'
        });

        
        if (num === 1) { // Control Left Side
            window.channel = name + user;
            $("#versus").append(name + " VS " + user);

        }
        else if (num === 2) { // Control Right Side
            window.channel = user + name;
            $("#versus").append(user + " VS " + name);

        }

        pubnub.subscribe({
            channel: channel,
            callback: onMessage
        });

        z = setInterval(function() {
            pubnub.here_now({
                channel: channel,
                callback: function(m) {
                    if (m.occupancy == 2) {
                        pubnub.publish({
                            channel: channel,
                            message: "start"
                        });
                    }
                }
            });
        }, 1000);
    };

    var onMessage = function(m) {
        // console.log(m);
        if (m === "start") {
            window.game_start = true;
            window.PongGame.startDoublePlayer();
            clearInterval(z);
        }
        else if (m === "playagain") {
            PongGame.startDoublePlayer();
            $("#playAgain").html('');
        }
        else if (m === "lobby") {
            // Implement this?
        }
        else {
            if (m.type === 'keydown') {
                if (m.user === 1) {
                    if (m.keyCode === Game.KEY.UP) {
                        PongGame.leftPaddle.moveUp();
                    }
                    else if (m.keyCode === Game.KEY.DOWN) {
                        PongGame.leftPaddle.moveDown();
                    }
                }
                else if (m.user === 2) {
                    if (m.keyCode === Game.KEY.UP) {
                        PongGame.rightPaddle.moveUp();
                    }
                    else if (m.keyCode === Game.KEY.DOWN) {
                        PongGame.rightPaddle.moveDown();
                    }
                }
            }
            else if (m.type === 'keyup') {
                if (m.user === 1) {
                    if (m.keyCode === Game.KEY.UP) {
                        PongGame.leftPaddle.stopMovingUp();
                    }
                    else if (m.keyCode === Game.KEY.DOWN) {
                        PongGame.leftPaddle.stopMovingDown();
                    }
                }
                else if (m.user === 2) {
                    if (m.keyCode === Game.KEY.UP) {
                        PongGame.rightPaddle.stopMovingUp();
                    }
                    else if (m.keyCode === Game.KEY.DOWN) {
                        PongGame.rightPaddle.stopMovingDown();
                    }
                }       
            }
        }
    };
    // Login
    $("#login").click(function() {
        login();
    });
    $("#name").keypress(function(e) {
        if (e.which === 13) {
            login();
        }
    });

    $("#playBot").click(function() {
        window.oldSchoolCool = true;
        window.game_start = true;
        $("#playBot").hide();
        $("#lobby").hide();
        $("#challenge").hide();
        $("#game").fadeIn();
        $("#settings").fadeIn();
        PongGame.startSinglePlayer();
    });
});