$(function() {
  function buildHTML(message){
      var html = `<div class="content">
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
})