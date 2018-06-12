function getCommentValues(){
  var commentText = document.getElementById('comment-text-input').value;
  var commentAuthor = document.getElementById('comment-attribution-input').value;
  if(commentText && commentAuthor){
    clearCommentValues();
    createComment(commentAuthor, commentText);
  }else{
    alert('You must specify a comment and author');
  }
}

function clearCommentValues(){
  document.getElementById('comment-text-input').value = '';
  document.getElementById('comment-attribution-input').value = '';
}

function createComment(commentAuthor, commentText){
  /*var commentData = {
    author: commentAuthor,
    commentContent: commentText
  };
  var newComment = Handlebars.templates.blogcommentsContent(commentData);
  var commentContainer = document.querySelector('.blog-comments');
  commentContainer.insertAdjacentHTML('beforeend', newComment);*/
  var request = new XMLHttpRequest();
  var url = "/blog" + "/addComment";
  request.open("POST", url);
  var requestBody = JSON.stringify({
    author: commentAuthor,
    commentContent: commentText
  });
  request.addEventListener('load', function(event){
    if(event.target.status === 200){
      var CommentTemplate = Handlebars.templates.blogcommentsContent;
      var newCommentHTML = CommentTemplate({
        author: commentAuthor,
        commentContent: commentText
      });
      var commentContainer = document.querySelector('.blog-comments');
      commentContainer.insertAdjacentHTML('beforeend', newCommentHTML);
    }
    else{
      alert("Error Storing Comment" + event.target.response);
    }
  });
  console.log(requestBody);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}

window.addEventListener('DOMContentLoaded', function(){
  var createCommentButton = document.querySelector('#create-comment-button');
  if(createCommentButton){
    createCommentButton.addEventListener('click', getCommentValues);
  }
});
