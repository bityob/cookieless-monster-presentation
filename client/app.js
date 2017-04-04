// Onload check fingerprint
$( document ).ready(function() {
  var fp = new Fingerprint2();

  fp.get(function(result, components) {
      $.ajax({ 
        url: "http://localhost:9000/get_user?hash=" + result + "&details=test", 
        type: "GET",
        dataType : "json",
      })
        .done(function(response) {
            console.log(response)

            if (response == "אין מספיק התאמה") {
                // Create new user...
                $.ajax({ 
                    url: "http://localhost:9000/get_user?hash=" + result + "&details=test", 
                    type: "GET",
                    dataType : "json",
                })
                .done(function(response) {
                    console.log(response)
                });
        })
       .fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
      });  
            }
            console.log(response)
        })
       .fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
      });  
  });
  
  
  // $("#btn").on("click", function () {
  //   var d1 = new Date();
  //   var fp = new Fingerprint2();

  //   fp.get(function(result, components) {
  //     var d2 = new Date();
  //     var timeString = "Time took to calculate the fingerprint: " + (d2 - d1) + "ms";
  //     var details = "<strong>Detailed information: </strong><br />";
  //     // if(typeof window.console !== "undefined") {
  //     //   console.log(timeString);
  //     //   console.log(result);
  //     //   for (var index in components) {
  //     //     var obj = components[index];
  //     //     var value = obj.value;
  //     //     var line = obj.key + " = " + value.toString().substr(0, 100);
  //     //     console.log(line);
  //     //     details += line + "<br />";
  //     //   }
  //     // }
  //     $("#details").html(details);
  //     $("#fp").text(result);
  //     $("#time").text(timeString);
  //   });
  // });

});