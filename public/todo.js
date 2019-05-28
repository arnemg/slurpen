$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var nyttKamera = {kamera: item.val()};

      $.ajax({
        type: 'POST',
        url: '/cams',
        data: nyttKamera,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
