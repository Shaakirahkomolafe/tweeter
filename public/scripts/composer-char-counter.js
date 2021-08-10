/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function(e) {
    const counter = e.target.value.length;
    // $(this).val().length;
    const inputLength = 140 - counter;
    $('.counter').text(inputLength);
    if (inputLength < 0) {
      console.log('hello world');
      $('.counter').css({'color' : 'red'});
    }

  });
});
