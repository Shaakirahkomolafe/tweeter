/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function(e) {
    let counter = $(this).val().length;
    // console.log($(this));
    const inputLength = 140 - counter;
    $('.counter').text(inputLength);
    if (inputLength < 0) {
      console.log('hello world');
      $('.counter').css({'color' : 'red'});
    }
    console.log(counter);

  });
});
