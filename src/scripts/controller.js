$(document).on("click",'#connectBtn', function () {
  console.log("Connecting to "+$("#broker").val()+" ...");
  $('#status').val("Connecting...").css("color", "black").css("background-color", "#edce05");
  var client = mqtt.connect($("#broker").val());
  client.on("connect", function () {
    $('#status').val("Connected!").css("color", "black").css("background-color", "#04cf55");
    console.log("connected");
    Swal.fire({
      type: 'success',
      title: 'Connected Successfully!',
    })
    $('#connectBtn').prop("disabled", true);
    $('#disconnectBtn').prop("disabled", false);
    client.on("message", function (topic, payload) {
      //adding to table the topic and payload
      $('#table').prepend('<tr><td id="topicLng">' + topic + '</td><td id="payloadLng">'+ payload + '</td><td id="time">' + moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
      console.log("Received { topic: " + topic + "; payload: " + payload + " }");
    })
  })

  $('#disconnectBtn').on("click", function () {
    Swal.fire({
      type: 'warning',
      iconColor: 'red',
      title: 'Disconnected!',
    })
    client.end();
    $('#connectBtn').prop("disabled", false);
    $(this).prop("disabled", true);
    $('#status').val("Disconnected!").css("color", "black").css("background-color", "#c71906");
    console.log("Disconnected");
  })



  $('#publishBtn').on("click", function () {
    if ($('#topic').val().length == 0) {
      Swal.fire({
        type: 'error',
        title: 'Please enter a topic!',
      })
    } else {
      client.publish($('#topic').val(), "Cherv: "+$('#payload').val(), function () {
        console.log("Published { topic: " + $('#topic').val()
          + "; payload: " + $('#payload').val() + " }");
      })
    }
  })

  $(document).on("click", '#subscribeBtn', function () {
    if ($('#subscriber').val().length == 0) {
      Swal.fire({
        type: 'error',
        title: 'Please subscribe a topic!',
      })
    } else {
      Swal.fire({
        type: 'success',
        title: 'Subscribed!',
      })
      client.subscribe($('#subscriber').val(), function () {
        console.log("Subscribed")
        $('#subscriber').prop('disabled', true);
      })
      $(this).prop('disabled', true);
    }
  })

  $('#unsubscribeBtn').on("click", function () {
    client.unsubscribe($('#subscriber').val(),function(){
      console.log("Ended");
    });
    
    $('#subscriber').prop('disabled', false);
    $('#subscribeBtn').prop('disabled', false);
  })

})

$('#delete').on("click",function(){
  $('#table').empty();
})