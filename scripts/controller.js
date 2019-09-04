$(document).on("click",'#connectBtn', function () {
  console.log("Connecting to "+$("#broker").val()+" ...");
  $('#status').val("Connecting...").css("color", "black").css("background-color", "#edce05");
  var client = mqtt.connect($("#broker").val());
  client.on("connect", function () {
    $('#status').val("Connected!").css("color", "black").css("background-color", "#04cf55");
    console.log("connected");
    $('#connectBtn').prop("disabled", true);
    client.on("message", function (topic, payload) {
      // console.log([topic, payload].join(": "));
      //adding to table the topic and payload
      $('#table').append('<tr><td id="topicLng">' + topic + '</td><td id="payloadLng">'+ payload + '</td><td id="time">' + moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
      console.log("Received { topic: " + topic + "; payload: " + payload + " }");
    })
  })

  $('#disconnectBtn').on("click", function () {
    client.end();
    $('#connectBtn').prop("disabled", false);
    $('#status').val("Disconnected!").css("color", "black").css("background-color", "#c71906");
    console.log("Disconnected");
  })



  $('#publishBtn').on("click", function () {
    if ($('#topic').val().length == 0) {
      alert("Please enter a topic");
    } else {
      client.publish($('#topic').val(), "Cherv: "+$('#payload').val(), function () {
        console.log("Published { topic: " + $('#topic').val()
          + "; payload: " + $('#payload').val() + " }");
      })
    }
  })

  $(document).on("click", '#subscribeBtn', function () {
    if ($('#subscriber').val().length == 0) {
      alert("Please subscribe a topic");
    } else {
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
