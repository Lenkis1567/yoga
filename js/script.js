$(document).ready(function() {
    
    let loader =   $('.loader');
    $('#service-form').submit(function(e) {
      var name = $('#name').val();
      var tel = $('#tel').val();
      var url = 'https://testologia.ru/checkout'
    e.preventDefault();
    let formValid = true;
          
      $(".error").remove();
      $(".error-border").removeClass("error-border");
   
      const validationRules = {
        '#name': 'Необходимо ввести имя',
        '#tel': 'Необходимо ввести телефон',
    };
  
        // Clear previous errors
        $(".error").remove();
        $(".error-border").removeClass("error-border");

        // Validate each field based on rules
        for (let field in validationRules) {
            const value = $(field).val().trim();
            if (!value) {
                $(field).after(`<span class="error">${validationRules[field]}</span>`);
                $(field).addClass('error-border');
                formValid = false;
            }
        }
      if (formValid === true) {
        loader.css('display', 'flex');
        body = {name: name, phone: tel};
        $.ajax({
            method: "POST",
            url: url,
            data: body,
            dataType: "json"
          })
          .done(function(message) {
            loader.hide();
            console.log(message);
            if (message.success === 1) {
                $('.form-container').css('position', 'relative') // the container is positioned for centering
                .find('form') // Find and hide the form inside the #order div
                .hide();
  
      // Add a message instead of the form 
      $('.form-container').append('<div class="thanks-message"><p class="thanks-p">Спасибо за Ваш заказ. </p><p>Мы скоро свяжемся с Вами!</p></div>')
            } else {
                console.log(message.success);
                alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
            }
          });
      }
  });
  });