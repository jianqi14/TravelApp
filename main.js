//tHIS url is fom airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201?api_key=keyaK6MUiRbQVk9Di';

var cardTemplate = function(photos, name, description){

  return `
  <div class="card img-fluid" style="width:500px">
    <img class="card-img-top" src="${photos}" alt="Card image" style="width:100%">
    <div class="card-img-overlay">
      <h4 class="card-title">${name}</h4>
      <p class="card-text">${description}</p>
      <a href="#" class="btn btn-primary">Click to see more!!</a>
    </div>
  </div>
</div>
    `;
}

//This is where we get the JSON data from Airtable!
$.getJSON( airtable_list_url, function(data) {
    var items = [];
    $.each(data.records, function( key, val ){
        //console.log(val.fields)
        var name = val.fields['Name'];
        var description = val.fields['Description'];
        var photos = val.fields['Photos'][0] ? val.fields['Photos'][0].url : null;
        var html = cardTemplate(photos, name, description);

        items.push(html);

    });
    $(".list-view").append(items.join(''));

});