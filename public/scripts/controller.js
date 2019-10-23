var topics = ["sensor/temperature/tanilon","lalaine/jake"]

client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")

// for(var i ; i<topics.length;++i){
  client.subscribe(topics[0])
  
// }
client.on("connect", function () {
  console.log("Successfully connected");
})
// $('#on').on("click", function () {
//   client.publish("chervz/device/status", "Turned on: " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
  // })

})