$(function() {
  function buildHTML(message){
      var html = `<div class="content" data-id=${message.id}>
                    <div class="content__upper-info">
                      <div class="content__upper-info--user-name">
                        ${message.name}
                      </div>
                      <div class="content__upper-info--date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="content--body">
                      <p>${message.body}</p>
                      ${ message.image ? `<img src="${message.image}"></img>` :``}
                    </div>
                  </div>`
    return html;
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $('.submit-btn').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.contents').append(html);
      $('#new_message')[0].reset();
      $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight });
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.content:last').data("id");
    var group_id = $('.header__left-box--group-name').data("groupId");
    var url = `/groups/${group_id}/api/messages`;   
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id, group_id: group_id}  
    })
    .done(function(messages){
      var insertHTML = '';
      if (!$.isEmptyObject(messages)) {    
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.contents').append(insertHTML);
        })
        $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight });
      }
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
  }
  
  $(window).bind("load",function(){
    if ( document.URL.match('/messages') && document.URL.match('/groups/') ) {
      setInterval(reloadMessages, 5000);
    }
  })
})