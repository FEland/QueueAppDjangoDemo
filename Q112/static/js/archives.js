
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

function create_queue_tab(q_data) {
  var id = q_data.id;
  var title = q_data.title;

  var q_tab = document.createElement('div');
  q_tab.className = 'queue_tab col-md-6 col-xs-12 col-sm-12';
  var title_div = document.createElement('div');
  title_div.className = "queue_title"
  var title_text = document.createTextNode(title);
  title_div.appendChild(title_text);
  q_tab.appendChild(title_div);

  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8000/1/entries/' + id.toString(),
    contentType: 'application/json',
    success: function (data) {
      populate_entries(data, q_tab);
    },
    error: function(a , b, c){
      console.log('There is an error in retrieving entries');
    },
    async: true
  });
}

function populate_queus(data) {
  for (var i = 0; i < data.length; i++) {
    create_queue_tab(data[i]);
  }
}

function load_queues() {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8000/1/queues',
    contentType: 'application/json',
    success: function (data) {
      data.sort(function(a,b) {
        return (a.timestamp - b.timestamp);
      })
      data.reverse();
      populate_queus(data);
    },
    error: function(a , b, c){
      console.log('There is an error in retrieving queues');
    },
    async: true
  });
}

$(document).ready(function() {
  load_queues();
})