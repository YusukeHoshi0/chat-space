$(function() {
  function buildHTML(message){
    if (message.body && message.image) {      
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
                      <img src="${message.image}"></img>
                    </div>
                  </div>`
      return html;
    }
    else if (message.body){
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
                    </div>
                  </div>`
      return html;
    }
    else if (message.image){
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
                      <img src="${message.image}"></img>
                    </div>
                  </div>`
      return html;
    }
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
      $('.input-box__text').val('');
      $('.input-box__image__file').val('');
      $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight });
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
    })
  })
})