
function populate_num_entries(num_entries) {
  $(".main-page-numentries").text(num_entries.toString());
  $(".main-page-estimatedtime").text((num_entries * 5).toString() + " min");
}


function populate_entries(data, q_tab) {
  var table = document.createElement('table');
  table.className = 'table table-striped';
  var header = document.createElement('thead');
  var header_row = document.createElement('tr')
  var rank_head = document.createElement('th');
  var rank_text = document.createTextNode('Rank');
  rank_head.appendChild(rank_text);
  header_row.appendChild(rank_head);

  var name_head = document.createElement('th');
  var name_text = document.createTextNode('Name');
  name_head.appendChild(name_text);
  header_row.appendChild(name_head);

  header.appendChild(header_row);
  table.appendChild(header);

  var body = document.createElement('tbody');

  for (var i = 0; i < data.length; i++) {
    var body_row = document.createElement('tr');
    var rank_col = document.createElement('td');
    var rank_text = document.createTextNode((i + 1).toString());
    rank_col.appendChild(rank_text);
    body_row.appendChild(rank_col);

    var name_col = document.createElement('td');
    var name_text = document.createTextNode(data[i].name);
    name_col.appendChild(name_text);
    body_row.appendChild(name_col);
    body.appendChild(body_row);
  }

  table.appendChild(body);
  q_tab.appendChild(table)

  var content_area = document.getElementsByClassName('sidepage-body')[0];
  content_area.appendChild(q_tab);
}

function get_num_entries(data) {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8000/1/entries/' + data.id.toString(),
    contentType: 'application/json',
    success: function (data) {
      populate_num_entries(data.length)
      var q_tab = document.getElementsByClassName("main_page_q")[0];
      populate_entries(data, q_tab);
    },
    error: function(a, b, c){
      console.log('There is an error in retrieving the main queue');
    },
    async: true
  });
}

$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8000/1/currentQ',
    contentType: 'application/json',
    success: function (data) {
      get_num_entries(data);
    },
    error: function(a, b, c){
      console.log('There is an error in retrieving the main queue');
    },
    async: true
  });
})