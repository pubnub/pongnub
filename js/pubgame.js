$(document).ready(function () {

    window.pubnub = new PubNub({
      publishKey: 'pub-c-0ecaf3c4-bc3a-4e03-94e7-e85e196fdc4c',
      subscribeKey: 'sub-c-673a62aa-24c9-11e4-a77a-02ee2ddab7fe'
    })




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

    window.pubnub.addListener({
      status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
      }
      ,message: pongnub
      ,presence: presenceHandler
    });


    window.pubnub.subscribe({
        channels: ["pongnub" + id],
        withPresence: true
    });

});
