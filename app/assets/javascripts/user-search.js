$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html);
  }

  function appendErrMsgToHTML(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    $('#user-search-result').append(html);
  }

  function appendAddUserHTML(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member'              id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML();
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました。');
    })
  })

  $(document).on("click", ".user-search-add", function(){
    var user_id = $(this).data("userId");
    var user_name = $(this).data("userName");
    appendAddUserHTML(user_id, user_name);
    $(this).parent().hide();
  });

  $(document).on("click", ".user-search-remove", function(){
    $(".user-search-add").parent().show();
    $(this).parent().remove();
  });
})
