$(document).ready(function () {

    window.pubnub = new PubNub({
      publishKey: 'pub-c-0ecaf3c4-bc3a-4e03-94e7-e85e196fdc4c',
      subscribeKey: 'sub-c-673a62aa-24c9-11e4-a77a-02ee2ddab7fe'
    });


    var pongnub = function(m) {
        console.log("inside pongnub: " + JSON.stringify(m));

        if (m.message.side === "left") {
            if (m.message.target === "up") {
                if (m.message.type === "touchstart") {
                    PongGame.leftPaddle.moveUp();
                }else {
                    PongGame.leftPaddle.stopMovingUp();
                }
            }
            else if (m.message.target === "down") {
                if (m.message.type === "touchstart") {
                    PongGame.leftPaddle.moveDown();
                }
                else {
                    PongGame.leftPaddle.stopMovingDown();
                }
            }
        }
        else if (m.message.side === "right") {
            if (m.message.target === "up") {
                if (m.message.type === "touchstart") {
                    PongGame.rightPaddle.moveUp();
                }
                else {
                    PongGame.rightPaddle.stopMovingUp();
                }
            }
            else if (m.message.target === "down") {
                if (m.message.type === "touchstart") {
                    PongGame.rightPaddle.moveDown();
                }
                else {
                    PongGame.rightPaddle.stopMovingDown();
                }
            }
        }
    }


    var id = getURLParameter("id");

    window.pubnub.addListener({
      status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                //publishSampleMessage();
            }
      }
      ,message: pongnub
    });


    window.pubnub.subscribe({
        channels: ["pongnub" + id],
        withPresence: true
    });

});
