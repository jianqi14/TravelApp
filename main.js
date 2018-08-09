var listView = function(photos, name, description, id){

  return `
  <div class="card img-fluid" style="width:500px">
    <img class="card-img-top" src="${photos}" alt="Card image" style="width:100%">
    <div class="card-img-overlay">
      <h4 class="card-title">${name}</h4>
      <p class="card-text">${description}</p>
      <a href="index.html?id=${id}" class="btn btn-primary">${name} Bio</a>
    </div>
  </div>
  <br>
</div>
    `;
}

var getDataForList = function(){
  //This is where we get the JSON data from Airtable!
  $.getJSON( `https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201?api_key=keyaK6MUiRbQVk9Di`, function(data) {
    var items = [];
    $.each(data.records, function( index, val ){
        //console.log(val.fields)
        var name = val.fields['Name'];
        var description = val.fields['Description'];
        var photos = val.fields['Photos'][0] ? val.fields['Photos'][0].url : null;
        var html = listView(photos, name, description);

        items.push(html);

    });
    $(".list-view").append(items.join(''));
  });
}

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function(id, Photos, name, Description, address, YelpReview) {
  return `<div class="col-sm-12">
  <div class="card mb-4 box-shadow">
    <img class="card-img-top" src="${Photos}">
    <div class="card-body">
      <h2>${name}</h2>
      <p class="card-text">${Description}</p>
      <p class="card-text">${address}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">${YelpReview}</small>
        
      </div>
      
    </div>
  </div>
</div>`;
}

// Get and display the data for one item based on on the ID
var getDataForId = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201/${id}?api_key=${api_key}`, function( record ) {
    //console.log(data);
    var html = [];
    html.push(`<div class="row">`);
      console.log(val)
      var id = record.id;
      var fields = record.fields;
      var name = fields["Name"];

      var Photos = fields["Photos"] ? fields["Photos"][0].url : '';
      var Description = fields["description"];
      var address = fields["Address"];
      var YelpReview = fields["yelpReviews"];

      var itemHTML = detailView(id, Photos, name, Description, address, YelpReview);
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
