// Helper for getting the `index.html?ID=` part form the URL
var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Airtable API Key, unique per user
var api_key = 'keyaK6MUiRbQVk9Di';

var listView = function(id, photos, name){
  return `
  <div class="col-sm-6">
  <div class="card img-fluid">
    <img class="card-img-top" src="${photos}" alt="Card image" style="width:100%">
    <div class="card-img-overlay">
      <h4 class="card-title">${name}</h4>
      <p class="card-text"><a href="index.html?id=${id}" class="btn btn-primary">${name} Bio</a></p>
      
    </div>
  </div>
  <br>
</div>`;
}

var getDataForList = function(){
  //This is where we get the JSON data from Airtable!
  $.getJSON( `https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201?api_key=keyaK6MUiRbQVk9Di&view=Alpha`, function(data) {
    var items = [];
    items.push(`<div class="row">`);
    $.each(data.records, function(index, val ){
        //console.log(val.fields)
        var id = val.id;
        var name = val.fields['Name']; 
        var photos = val.fields['Photos'][0] ? val.fields['Photos'][0].url : null;
        var html = listView(id, photos, name);

        items.push(html);

    });
    items.push(`</div>`);
    $(".list-view").append(items.join(''));
  });
}

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function(id, Photos, name, Description, address, Price) {
  return `
  <div class="card">
  <div class="card-header">
    About
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>${Description}</p><br>
      <a class="btn btn-primary btn-lg" href="https://jianqi14.github.io/TravelApp/" role="button"><i>Return to Home Page</i></a>
    </blockquote>
  </div>
</div><br>

  <div class="card mb-3">
  <img class="card-img-top" src="${Photos}" alt="Card image cap">
  <div class="card-body">
    <h3 class="card-title"><b>${name}</b></h3>

    <hr class="my-4">
    <p class="card-text"><strong>${name}'s Address:</strong> ${address}</p>
    <p class="card-text"><strong>Price:</strong> ${Price}</p>

    <a class="btn btn-primary btn-lg" href="https://www.google.com/maps/search/${name} ${address}" role="button"> Google Maps </a>
  </div>`;
}

// Get and display the data for one item based on on the ID
var getDataForId = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201/${id}?api_key=keyaK6MUiRbQVk9Di`, function( record ) {
    //console.log(data);
    var html = [];
    html.push(`<div class="row">`);
      var id = record.id;
      var fields = record.fields;
      var name = fields["Name"];

      var Photos = fields["Photos"] ? fields["Photos"][0].url : '';
      var Description = fields["Description"];
      var address = fields["Address"];
      var Price = fields["Prices"];

      var itemHTML = detailView(id, Photos, name, Description, address, Price);
      html.push(itemHTML);
    html.push(`</div>`);
    $(".detail-view").append(html.join(""));
  });
}


// Do we have an ID in the URL?
var id = getParameterByName("id");

// If we have an ID, we should only get the data for one item
// Otherwise, we should display the data for all items
if (id) {
  getDataForId(id);
} else {
  getDataForList();
}
