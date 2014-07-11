$(document).ready(function () {
    window.pubnub = PUBNUB.init({
        publish_key: 'demo',
        subscribe_key: 'demo'
    });

    var pongnub = function(m) {
        if (m.side === "left") {
            if (m.target === "up") {
                if (m.type === "touchstart") {
                    PongGame.leftPaddle.moveUp();
                }
                else {
                    PongGame.leftPaddle.stopMovingUp();
                }
            }
            else if (m.target === "down") {
                if (m.type === "touchstart") {
                    PongGame.leftPaddle.moveDown();
                }
                else {
                    PongGame.leftPaddle.stopMovingDown();
                }
            }
        }
        else if (m.side === "right") {
            if (m.target === "up") {
                if (m.type === "touchstart") {
                    PongGame.rightPaddle.moveUp();
                }
                else {
                    PongGame.rightPaddle.stopMovingUp();
                }
            }
            else if (m.target === "down") {
                if (m.type === "touchstart") {
                    PongGame.rightPaddle.moveDown();
                }
                else {
                    PongGame.rightPaddle.stopMovingDown();
                }
            }
        }
    }

    var presenceHandler = function(m) {
        if (m.occupancy < 3) { // Someone RQ

        }
    }

    pubnub.subscribe({
        channel: "pongnub_game",
        callback: pongnub,
        presence: presenceHandler
    });

});