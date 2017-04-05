// Onload check fingerprint
$( document ).ready(function() {
  $.getJSON( "/getusers", function( data ) {

    $.each( data, function( key, val ) {
      $('#userstable tr:last').after('<tr><th scope="row">#</th><td>' + key + '</td><td>' + val + '</td></tr>');
    });

    $('#allusers').slideDown();
});
});