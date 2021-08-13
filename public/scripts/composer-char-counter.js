/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function(e) {
    let counter = $(this).val().length;
    const inputLength = 140 - counter;
    console.log(inputLength);
    $(this).parents().find('.counter').text(inputLength);
    if (inputLength < 0) {
      console.log('hello world');
      $('.counter').css({'color' : 'red'});
      return;
    }
    $('.counter').css({'color': 'black'});

  });
  // on click function to hide our error message//
  $('#tweet-text').on('click', function(e) {
    $(".error").hide();
  });
});
