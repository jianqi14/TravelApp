$("#submit-location").on('submit', function(e){
  e.preventDefault();
  var data = {};
  data.fields = {
    'Name': $(this).find('#Name').val(),
    'Address': $(this).find('#Address').val(),
    'Description': $(this).find('#Description').val(),
    'Prices': $(this).find('#Prices').val(),
    'yelpReview': [
      {
        'url': $(this).find('#yelpReview').val(),
      }
    ],

    'Photos': [
      {
        'url': $(this).find('#Photos').val()
      }
    ],

  };
  $.post(`https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201?api_key=keyaK6MUiRbQVk9Di`,
    data, function () {
      // On Success
      $("#submit-location").html(`<h2>Thanks for submitting!</h2>`);
    }
  );
});