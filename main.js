//tHIS url is fom airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appWNP5SS9OqdZq7D/Table%201?api_key=keyaK6MUiRbQVk9Di';

//This is where we get the JSON data from Airtable!
$.getJSON( airtable_list_url, function(data) {
    var items = [];

    $.each(data.records, function( key, val ){
        console.log(val.fields)
        items.push(`<h4>${val.fields['Name']} </h4>`)
        items.push(`<h4>${val.fields['Photos']}</h4>`)
        items.push(`<h4>${val.fields['Address']}</h4>`)

    });
    $(".list-view").append(items.join(''));
});