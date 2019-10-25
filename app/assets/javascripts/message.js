$(function(){
  function buildHTML(message){
    var message_content = message.content?
                              `${message.content}`:"";
    var message_image = message.image?
                              `<img src="${message.image}">`:"";

    var html = `<div class="message">
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
      $('.form__message').val('');
    })
  })
});