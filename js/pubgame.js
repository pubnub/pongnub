$(document).ready(function () {
    window pubnub = PUBNUB.init({
        publish_key: 'pub-c-242fbbf1-4cc6-4153-8f20-a671697f15ec',
        subscribe_key: 'sub-c-2361676c-1e85-11e4-bbbf-02ee2ddab7fe'
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
            window.location.href = 'http://larrywu.com/pongnub/botlobby';
        }
    }

    pubnub.subscribe({
        channel: "pongnub_game",
        callback: pongnub,
        presence: presenceHandler
    });

});
