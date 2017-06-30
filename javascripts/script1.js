// all scripts uses jquery library

$(document).ready(function(){
  
    var responses;
   // this initialize the facebook sdk and cache it locally
   $.ajaxSetup({ cache: true});
   $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '168329377033776',
      version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    
    
  });

  
  updateStatusCallback = function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');
     FB.api('/me', {fields: 'first_name,name,education,picture.type(large)'}, function(response) {
  console.log(response);
   $.responses = response;
   $.url = response.picture.data.url;
   $.nn = response.name;
    $.ff = response.education[0].school.name;
   $("#loginbutton").hide();
   $("#user").show();
   $("#username").text($.responses.first_name);
   $("#profileimg").attr("src",$.url);
   $("#name").text($.nn);
       $("#prof").attr("src",$.url);
       $("#profession").text($.ff);
  
});
  }
  else {
    FB.login();
  }
}

  $("#loginbutton").click(function(){
  	FB.getLoginStatus(updateStatusCallback);

    

  });

  $("#logoutbutton").click(function(){
    FB.logout();
  });


});
