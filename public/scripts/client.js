/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article>
    <header class="header-text">
    <b>${escape(tweetData.user.name)}</b>  
    ${escape(tweetData.user.handle)}
  </header>
  <p>${escape(tweetData.content.text)} </p> 
    <footer class="footer-hover">
      ${timeago.format(tweetData.created_at)}
      <div class="icons"> 
       <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>

    </footer>
    </article>`);
    return $tweet;
  };

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

  const renderTweets = function(tweets) {
  // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
      const tweetObject = tweets[i];
      const $tweetElement = createTweetElement(tweetObject);
      $('#tweets-container').append($tweetElement);
    
    }
    // calls createTweetElement for each tweet

  // takes return value and appends it to the tweets container
  // eslint-disable-next-line semi
  }

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
  // timeago.format(1473245023718);          //=> "4 years ago"

  const $tweet = createTweetElement(tweetData);

  console.log($tweet); // to see what it looks like
  


  $("#compose-tweet").on("submit", function(event) {
    if ($('#tweet-text').val() === '') {
      event.preventDefault();
      return alert('please type a tweet');
    } else if ($('#tweet-text').val().length > 140) {
      event.preventDefault();
      return alert('limit exceeded');
    }
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: '/tweets',
      data:$('this'),
      success: function() {
        console.log('success');
      },
      dataType: $('this').serialize()
        .then(loadTweet(data))
    });

    $.post('/tweets', $(this).serialize(), function() {
      console.log('success');
      loadTweet();
    });
  });

  const loadTweet = function() {
    $.get("/tweets", function(data) {
      console.log(data);
      renderTweets(data);
      alert("Tweet Sent!");
    });
  };

  loadTweet();

  
  
});
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};