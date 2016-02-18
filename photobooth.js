/**
 * Created by peerapat40595 on 2/17/2016 AD.
 */
$(document).ready(
    function(){

        CameraTool.initCameraOn("camera");

        //SHOOT BUTTON
        $("#camera-control > button").click(function(){
            if($("#camera-control > button").html() === "Shoot"){
                countDown(3);
            }
            else if($("#camera-control > button").html() === "Retake"){
                CameraTool.clearCanvas("photo");
                CameraTool.initCameraOn("camera");
                $("#camera-control > button").html("Shoot");
                $(".sticker").remove();
            }
        });

        //STICKER LIST
        $("#sticker-list").click(function(event){
            $(".selected").removeClass("selected");
            var target = $(event.target);
            var newSticker = target.clone().appendTo("#overlay");
            newSticker.addClass("sticker").addClass("selected").css({
                width: "150px",
                height: "auto",
                top: "45%",
                left: "325px"
            });
        });

        //SELECT STICKER
        $("#overlay").click(function(event) {
            $(".selected").removeClass("selected");
            var target = $(event.target);
            if(target.hasClass("sticker")) {
                target.addClass("selected");
            }
        });

        //Up Down Left Right Rotate
        $(document).keydown(function(event){
            var code = event.keyCode || event.which;
            var target = $(".selected")
            var width = target.width();
            var height = target.height();
            var left = target.position().left;
            var top = target.position().top
            var shift = event.shiftKey;
            var deg = getRotationDegrees(target);

            //Rotate
            if(shift){
                if(code == 37) { //Rotate Left
                    target.css({
                        transform: "rotate("+(deg-5)+"deg)"
                    });
                }
                else if(code == 39) { //Rotate Right
                    target.css({
                        transform: "rotate("+(deg+5)+"deg)"
                    });
                }
            }
            //Up Down Left Right
            else{
                if(code == 38) {//Up
                    target.css({
                        top: top - 5 + "px"
                    });
                }
                else if(code == 40) { //Down
                    target.css({
                        top: top + 5 + "px"
                    });
                }
                else if(code == 37) { //Left
                    target.css({
                        left: left - 5 + "px"
                    });
                }
                else if(code == 39) { //Right
                    target.css({
                        left: left + 5 + "px"
                    });
                }
                else if(code == 46) { // backspace & delete
                    target.remove();
                }
            }
        });


        //Zoom In OR Out
        $(document).keypress(function(event) {
            var code = event.keyCode || event.which;
            var target = $(".selected");
            var width = target.width();
            var height = target.height();
            var left = target.position().left;
            var top = target.position().top;

            if(code == 43) { // +
                target.css({
                    width: width * ( 105 / 100) + "px",
                    height: "auto",
                    left: left  - width * ( 2.5 / 100) + "px",
                    top: top - width * ( 2.5 / 100) + "px"
                });
            }
            else if(code == 45) { // -
                target.css({
                    width: width * ( 95 / 100) + "px",
                    height: "auto",
                    left: left  + width * ( 2.5 / 100) + "px",
                    top: top + width * ( 2.5 / 100) + "px"
                });
            }
        });
    }
);

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}


