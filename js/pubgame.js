$(document).ready(function () {
    window.pubnub = PUBNUB.init({
        publish_key: 'pub-c-0ecaf3c4-bc3a-4e03-94e7-e85e196fdc4c',
        subscribe_key: 'sub-c-673a62aa-24c9-11e4-a77a-02ee2ddab7fe'
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

    var presenceHandler = function(m) {}

    var id = getURLParameter("id"); 

    pubnub.subscribe({
        channel: "pongnub" + id,
        callback: pongnub,
        presence: presenceHandler
    });

});
