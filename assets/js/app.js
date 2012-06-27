// var connection=null;
// $(document).ready(function(){
    
//     // $('#setup-twilio').click(function() {

//         $.getJSON('/api/token', { clientName: $("#name").val() }, function(data) {
//             // $(".debug-message-window").append(data);
//             // console.log(data);
        
//             Twilio.Device.setup(data.token,{"debug":true});

//             $("#call").click(function() {
//                 Twilio.Device.connect();
//             });

//             $("#hangup").click(function() {  
//                 connection.sendDigits("#");
//             });
         
//             Twilio.Device.ready(function (device) {
//                 $('#status').text('Ready to start recording');
//             });
         
//             Twilio.Device.offline(function (device) {
//                 $('#status').text('Offline');
//             });
         
//             Twilio.Device.error(function (error) {
//                 $('#status').text(error);
//             });
         
//             Twilio.Device.connect(function (conn) {
//                 console.log('Connect()');
//                 connection=conn;
//                 $('#status').text("On Air");
//                 $('#status').css('color', 'red');
//                 toggleCallStatus();
//             });
         
//             Twilio.Device.disconnect(function (conn) {
//                 $('#status').html('Recording ended<br/><a href="recordings/show">view recording list</a>');
//                 $('#status').css('color', 'black');
//                 toggleCallStatus();
//             });
//         });
//     // });
// });

// function toggleCallStatus(){
//     $('#call').toggle();
//     $('#hangup').toggle();
// }