/**
 * Created by peerapat40595 on 2/17/2016 AD.
 */
$(document).ready(
        function(){
            $("#camera-control > button").mousedown(capture);
            CameraTool.initCameraOn("camera");
        }
);

function capture(){
    CameraTool.captureTo("photo");
    CameraTool.hideCamera("camera");
}