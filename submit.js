$("#submit-location").on('submit', function(e){
  e.preventDefault();
  var data = {};
  data.fields = {
    'Name': $(this).find('#Name').val(),
    'Address': $(this).find('#Address').val(),
    'yelpReviews': $(this).find('#yelpReviews').val(),
    'Description': $(this).find('#Description').val(),
    'Price': $(this).find('#Price').val(),
    'Photos': [
      {
        'url': $(this).find('#Photos').val()
      }
    ],
    'Rating': $(this).find('#Rating').val(),
    'Rating': $(this).find('#Rating').val(),
    'Cost': $(this).find('#Cost').val(),
  };
  $.post(`https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201?api_key=keyaK6MUiRbQVk9Di&view=Alpha`,
    data, function () {
      // On Success
      $("#submit-location").html(`<h2>Thanks for submitting!</h2>`);
    }
  );
});