function getCommentValues(){

}

function clearCommentValues(){
  
  for(var i=0; i<commentInputElement.length; i++){
    var input = comment
  }
}

function createComment(){

}
window.addEventListener('DOMContentLoaded', function(){
  var createCommentButton = document.querySelector('createCommentButton');
  if(createCommentButton){
    createCommentButton.addEventListener('click', getCommentValues());
  }
});
