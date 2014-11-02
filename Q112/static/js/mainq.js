

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

  var content_area = document.getElementsByClassName('sidepage-body-top')[0];
  content_area.appendChild(q_tab);
}

function insert_title(title) {
  var title_div = document.getElementsByClassName('sidepage-title')[0];
  var title_text = document.createTextNode(title);
  title_div.appendChild(title_text);
}

function populate_main_q(data) {
  insert_title(data.title);
  var q_panel = document.createElement('div');
  q_panel.className = 'main_queue col-md-8 col-md-offset-2 col-sm-12'
  $(".qID").attr("data-qid", data.id.toString());
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8000/1/entries/' + data.id.toString(),
    contentType: 'application/json',
    success: function (data) {
      // $(".qID").attr("data-qid", data.id.toString());
      populate_entries(data, q_panel);
    },
    error: function(a, b, c){
      console.log('There is an error in retrieving the main queue');
    },
    async: true
  });
}

function load_main_q() {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8000/1/currentQ',
    contentType: 'application/json',
    success: function (data) {
      populate_main_q(data);
    },
    error: function(a, b, c){
      console.log('There is an error in retrieving the main queue');
    },
    async: true
  });
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function add_click_handlers() {
  $(".queue-button").click(function() {
    var name = $(".queue-input").val();
    var id = $(".qID").attr("data-qid");
    var csrftoken = getCookie('csrftoken');
    if (name) {
      post_data = {'name': name}
      $.ajax({
        type: 'POST',
        url: "http://127.0.0.1:8000/1/addentry/" + id.toString(),
        data: post_data,
        beforeSend: function (xhr) {
          xhr.withCredentials = true;
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
          console.log("success!");
          location.reload();
        },
        error: function(a , b, c){
          console.log('There was an error adding the entry');
        },
        async: true
      });
    }
  })
}

$(document).ready(function() {
  load_main_q();
  add_click_handlers();
})




