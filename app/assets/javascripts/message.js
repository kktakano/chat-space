  $(function(){
    function buildHTML(message){
      var message_content = message.content?
                                `${message.content}`:"";
      var message_image = message.image?
                                `<img src="${message.image}">`:"";
  
      var html = `<div class="message" data-message_id="${message.id}">
                    <div class="message__upper-info">
                      <div class="message__upper-info__tolker">
                        ${message.user_name} 
                      </div>
                      <div class="message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      ${message_content}
                      ${message_image}
                    </div>
                  </div>`
      return html;
    }
  
    $('.new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $("form")[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('.form__submit').prop('disabled', false);
      })
      .fail(function() {
        alert('error');
        $('.form__submit').prop('disabled', false);
      });
    })

    var reloadMessages = function() {
      if(location.href.match(/messages/)) {
        last_message_id = $(".message:last").data("message_id");
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages){
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML += buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function(){
          alert("自動更新に失敗しました")
        });
      };
    };
    setInterval(reloadMessages, 5000);
  });
