$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var nyttkamera = {kameranavn: item.val().trim()};

      $.ajax({
        type: 'POST',
        url: '/cams',
        data: nyttkamera,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
      return false;
  });

  $('li').on('click', function(){
      var kameranavn = $(this).text().trim().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/cams/' + kameranavn,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
