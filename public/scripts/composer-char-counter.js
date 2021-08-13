/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
$(document).ready(function() {
  // --- our code goes here --
  //this is the on input function to bind our text area using jquery to take accountof its input
  // this helps us make the counter(tweet limit )effective
  $('#tweet-text').on('input', function(e) {
    let counter = $(this).val().length;
    const inputLength = 140 - counter;
    $(this).parents().find('.counter').text(inputLength);
    if (inputLength < 0) {
      //styling to show red when we exceed tweet limit//
      $('.counter').css({'color' : 'red'});
      return;
    }
    //styling to make our counter revert back to black when number is below 140//
    $('.counter').css({'color': 'black'});

  });
  // on click function to hide our error message//
  $('#tweet-text').on('click', function(e) {
    $(".error").hide();
  });
});
