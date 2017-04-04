// Onload check fingerprint
$( document ).ready(function() {
  var joinobj = function(obj) {
    var flat = "";

    $.each(obj, function(index, item) {
      flat += item.key + " = " + item.value + ",";
    });

    return flat;
  };

  var fp = new Fingerprint2();

  fp.get(function(result, components) {
      components_flat = joinobj(components);
      $.ajax({ 
        url: "http://localhost:8081/get_user?hash=" + result + "&details=" + components_flat, 
        type: "GET",
      })
      .done(function(response) {
          console.log(response)

          if (response == "Can not find a proper match.") {
              // Create new user...
              console.log("show form for new user");
              $('#newuser').show();
          }
          else {
              $('#knownusername').text(response);
              $('#knownuser').show();
          }

      })
     .fail(function( xhr, status, errorThrown ) {
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
      });  
  });
  
  
  $("#btn").on("click", function () {
        var d1 = new Date();
        var fp = new Fingerprint2();

        fp.get(function(result, components) {
          var d2 = new Date();
          // var timeString = "Time took to calculate the fingerprint: " + (d2 - d1) + "ms";
          // var details = "<strong>Detailed information: </strong><br />";
          // if(typeof window.console !== "undefined") {
          //   console.log(timeString);
          //   console.log(result);
          //   for (var index in components) {
          //     var obj = components[index];
          //     var value = obj.value;
          //     var line = obj.key + " = " + value.toString().substr(0, 100);
          //     console.log(line);
          //     details += line + "<br />";
          //   }
          // }
          // $("#details").html(details);
          // $("#fp").text(result);
          // $("#time").text(timeString);
          $.ajax({ 
            url: "http://localhost:8081/userdata/",
            type: "POST",
            data: {
              "username" : $('#usernameinput').val(),
              "details" : joinobj(components),
              "user_hash" : result,
            }
          })
          .done(function(response) {
              console.log(response);
          })
         .fail(function( xhr, status, errorThrown ) {
              console.log( "Error: " + errorThrown );
              console.log( "Status: " + status );
              console.dir( xhr );
          });  
        });
      });

});