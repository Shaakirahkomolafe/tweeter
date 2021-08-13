/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  //tweetData object database//
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

  //function to rendertweets//
  const renderTweets = function(tweets) {
    console.log(tweets);
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
  // the submit event function to check our submit button , to display errors also when
  // when the input area is empty,it displays an error, also when the tweet limit is exceeded//
  $("#compose-tweet").on("submit", function(event) {
    event.preventDefault();
    if ($('#tweet-text').val() === '') {
      $('.error').text('Please type a tweet');

      if ($('.error').first().is(":hidden")) {
        $(".error").slideDown("slow");
      } else {
        $(".error").hide();
      }

    } else if ($('#tweet-text').val().length > 140) {
      // event.preventDefault();
      $('.error').text('Text Limit exceeded');
      if ($('.error').first().is(":hidden")) {
        $(".error").slideDown("slow");
      } else {
        $(".error").hide();
      }
    } else {
      
      //ajax post to post the tweet and load immediately without refreshing//
      $.ajax({
        method: "POST",
        url: '/tweets',
        data:$(this).serialize(),
      })
        .then(() => {
          $("#tweet-text").val("");
          loadTweets();
          console.log('tweets loaded');
        })

        .catch(function(error) {
          console.log(error);
     
        });
    }
    
  });
      
  //calling the function//
  // loadTweets();

  
});

//function to make sure no maliciouss scripts/ code are run instead of strings//
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



