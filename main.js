//tHIS url is fom airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201?api_key=keyaK6MUiRbQVk9Di';

var cardTemplate = function(photos, name, description){
    return `
    <div class="card-deck">
    <div class="card">
      <img class="card-img-top" src="${photos}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>

    <div class="card">
      <img class="card-img-top" src="${photos}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>

    <div class="card">
      <img class="card-img-top" src="${photos}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
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
        var html = cardTemplate(name, description, photos);

        items.push(html);

    });
    $(".list-view").append(items.join(''));

});