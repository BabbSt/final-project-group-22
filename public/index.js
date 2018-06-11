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
  var commentData = {
    author: commentAuthor,
    commentContent: commentText
  };
  var newComment = Handlebars.templates.blogcommentsContent(commentData);
  var commentContainer = document.querySelector('.blog-comments');
  commentContainer.insertAdjacentHTML('beforeend', newComment);
}

window.addEventListener('DOMContentLoaded', function(){
  var createCommentButton = document.querySelector('#create-comment-button');
  if(createCommentButton){
    createCommentButton.addEventListener('click', getCommentValues);
  }
});
