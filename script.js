let posts = [
  {
    author: "nature97",
    location: "Switzerland",
    description:
      "Embracing the serene beauty of the natural world, one snapshot at a time. 🍃 <b>#NatureLovers #MotherNature</b>",
    image: "images/nature.jpg",
    profilepic: "images/nature2.jpg",
    date: "1h",
    likes: 3742,
    liked: true,
    comments: [
      { commentAuthor: "love_nature2024", commentText: "Beautiful picture!" },
    ],
  },
  {
    author: "delicious_foods",
    location: "",
    description:
      "Savoring the art of the perfect steak, grilled to juicy perfection. 🥩✨ <b>#SteakLover #GrillMaster<b>",
    image: "images/food.jpg",
    profilepic: "images/food2.jpg",
    date: "3h",
    likes: 2344,
    liked: false,
    comments: [
      {
        commentAuthor: "GrillMaster77",
        commentText:
          "That sear is absolute perfection! 🤤 Can almost smell the smokiness through the screen. What's your secret for getting it so right?",
      },
      {
        commentAuthor: "ChefDelights",
        commentText:
          "A masterpiece on a plate! 🥩 Would love to know what seasonings you used to achieve that flavor explosion. Sharing is caring! 😉",
      },
    ],
  },
  {
    author: "fitness.freaks",
    location: "Gym 2099",
    description:
      "Chasing strength, one rep at a time. 💪 <b>#GymLife #NoPainNoGain<b>",
    image: "images/fitness.jpg",
    profilepic: "images/fitness2.jpg",
    date: "1d",
    likes: 5942,
    liked: true,
    comments: [
      {
        commentAuthor: "FitJourney_2024",
        commentText:
          "Crushing it! 💪 Your progress is seriously inspiring. Any tips for someone looking to improve their bench?",
      },
      {
        commentAuthor: "HealthOverHype",
        commentText:
          "That form is impeccable! 🌟 Consistency pays off. How long did it take you to reach this milestone?",
      },
      {
        commentAuthor: "IronAddictsAnonymous",
        commentText:
          "Nothing beats the feeling of a good lift! 🏋️‍♂️ Keep setting those PRs. What's your next goal?",
      },
    ],
  },
  {
    author: "squirrel_photos",
    location: "Black Forest",
    description:
      "Capturing the playful antics of our furry woodland friends. 🐿️✨ <b>#SquirrelLife #NaturePhotography<b>",
    image: "images/squirrel.jpg",
    profilepic: "images/squirrel2.jpg",
    date: "2d",
    likes: 8976,
    liked: false,
    comments: [
      {
        commentAuthor: "TheGreenDiary",
        commentText:
          "This little guy looks like he's plotting something mischievous. 😂 Love your wildlife photography!",
      },
      {
        commentAuthor: "NatureLover101",
        commentText:
          "Such a cute capture! 🐿️💕 Squirrels are the best acrobats of the animal kingdom, don't you think",
      },
    ],
  },
];

load();

function render() {
  let postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";

  for (let i = 0; i < posts.length; i++) {
    postContainer.innerHTML += generatePosts(i);
  }
  save();
}

function generatePosts(i) {
  let post = posts[i];
  return /*html*/ `
        <div class="all-posts">
          ${generatePosterSection(post, i)}
          ${generatePostContentSection(post, i)}
          <div class="seperator-posts"></div>
        </div>
      `;
}

function generatePosterSection(post, i) {
  return /*html*/ `
      <div class="poster">
        <div class="profile-pic">
          <img src="${post["profilepic"]}" alt="${post["profilepic"]}[i]">
        </div>
        <div class="poster-data">
          <div class="poster-left">
          <h4>${post["author"]}</h4>
          <p>${post["location"]}</p>
        </div>
        </div>
        <p>&nbsp;•&nbsp;${post["date"]}</p>
        <img class="dots" src="logos/dots.png" alt="dots">
      </div>
    `;
}

function generatePostInteractionSection(post, i) {
  let likeImage = post.liked ? "logos/liked.png" : "logos/like.png";

  return /*html*/ `
      <div class="interaction">
        <img id="likeImage-${i}" onclick="like(${i})" src="${likeImage}" alt="like">
        <img id="commentImg" onclick="commentFocus(${i})" src="logos/comment.png" alt="comment">
        <img src="logos/share.png" alt="share">
      </div>
    `;
}

function generatePostContentSection(post, i) {
  let commentsHtml = post.comments
    .map((comment) => {
      return /*html*/ `<p><b>${comment.commentAuthor}</b>&nbsp;${comment.commentText}</p>`;
    })
    .join("");

  return /*html*/ `
      <div class="actual-post">
        <img src="${post["image"]}">
        ${generatePostInteractionSection(post, i)}
        <span id="likedCount-${i}">${
    formatNumber(post["likes"]) + "&nbsp;likes"
  }</span>
        <div class="post-text">
        <p><b>${post["author"]}</b>&nbsp;${post["description"]}</p>
        <div class="comments-${i}" style="margin-top:5px">${commentsHtml}</div>
        </div>
        <input id="comment-input-${i}" type="text" placeholder="Add a comment..."><button onclick="addComment(${i})" class ="postBtn" >Post</button>
      </div>
    `;
}

function like(i) {
  let likeImage = document.getElementById(`likeImage-${i}`);
  let likeCount = document.getElementById(`likedCount-${i}`);

  posts[i].liked = !posts[i].liked;
  posts[i].liked ? posts[i].likes++ : posts[i].likes--;

  likeImage.src = posts[i].liked ? "logos/liked.png" : "logos/like.png";
  likeCount.innerHTML = `${formatNumber(posts[i].likes) + "&nbsp;likes"}`;
  save();
}

function formatNumber(number) {
  return number.toLocaleString("en-US");
}

function addComment(i) {
  let commentInput = document.getElementById(`comment-input-${i}`);
  if (commentInput.value !== "") {
    let newComment = {
      commentAuthor: "ozcan_mir97",
      commentText: commentInput.value,
    };
    posts[i].comments.push(newComment);

    let commentsSection = document.querySelector(`.comments-${i}`);
    commentsSection.innerHTML += `<p><b>${newComment.commentAuthor}</b>&nbsp;${newComment.commentText}</p>`;

    commentInput.value = "";
  }
  save();
}

function commentFocus(i) {
  let input = document.getElementById(`comment-input-${i}`);
  if (input) {
    input.focus();
  }
}

function save() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function load() {
  let savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
    render();
  }
}
