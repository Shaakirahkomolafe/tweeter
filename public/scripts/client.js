/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
 
  //tweetData object database
  let tweetData =  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  //function to create new tweets, it contains hardcoded tweets from our database
  const createTweetElement = function(tweetData) {
    const $tweet = $(` 
    <article>
    <header class="header-text">
    <img class="tweet-avatar" src= "${tweetData.user.avatars}">
    <b>${escape(tweetData.user.name)}</b>  
    ${escape(tweetData.user.handle)}
  </header>
  <p class="tweet-body">${escape(tweetData.content.text)} </p> 
    <footer class="footer-hover">
      ${timeago.format(tweetData.created_at)}
      <div class="icons"> 
       <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    `);
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);

  //function to rendertweets
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
      const tweetObject = tweets[i];
      // calls createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweetObject);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweetElement);
    }
  };
  
  //function to load our tweets, it uses the ajax get method to get our tweets
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((tweets) => renderTweets(tweets))
      .catch(function(error) {
        console.log(error);
      });
    alert("Tweet Sent!");
  };

  loadTweets();
 
  // the submit event function to check our submit button , to display errors also when
  $("#compose-tweet").on("submit", function(event) {
    event.preventDefault();
    // when the input area is empty,it displays an error
    if ($('#tweet-text').val() === '') {
      //jquery for displaying error message
      $('.error').text('Please type a tweet');
      //this is to display and hide our error using jquery , html and css for styling//
      if ($('.error').first().is(":hidden")) {
        $(".error").slideDown("slow");
      } else {
        $(".error").hide();
      }
      //also when the tweet limit is exceeded, it displays our error block
    } else if ($('#tweet-text').val().length > 140) {
      //jquery for displaying error message
      $('.error').text('Text Limit exceeded');
      //this is to display and hide our error using jquery , html and css for styling
      if ($('.error').first().is(":hidden")) {
        $(".error").slideDown("slow");
      } else {
        $(".error").hide();
      }
    } else {
      //if all these above didnt happen, then ajax post to post the tweet and load immediately without refreshing
      $.ajax({
        method: "POST",
        url: '/tweets',
        data:$(this).serialize(),
      })
        .then(() => {
          //this is to empty our iput area after submitting and revert the counter back to 140
          $("#tweet-text").val("");
          $('.counter').val(140);
          loadTweets();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  });
});

//function to make sure no maliciouss scripts/ code are run instead of strings
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



