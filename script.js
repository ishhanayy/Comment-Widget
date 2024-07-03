let commentContainer = document.getElementById("comment-container");

function createInputBox(){
    let div = document.createElement("div");
    div.setAttribute("class", "nested");
    div.innerHTML+=`
            <input type="text" placeholder="add text here" class="reply-input">
            <button class="submit">submit</button> `;
    return div;
}

function createNextComment(text){
    let div = document.createElement("div");
    div.setAttribute("class", "all-comments")
    div.innerHTML+=`<div class="card">
                    <span class="text">
                        ${text}
                    </span>
                    <span class="reply">
                        add reply
                    </span>
                    <span class="delete">delete</span>
                    <span class="like :" id="like" onclick="liking(this)">like :</span>
                    <span id="like-count" class="like-count">0</span>
                    <span class="edit" onclick="editing(this)">edit</span>
                </div>`;
    
    return div;
}

function deleteComment(ele){
  let cardDelete = ele.closest('.all-comments');
  if(ele)
    {
      cardDelete.remove();
    }
}

function liking(ele){
  let box = ele.closest(".all-comments");
  let likeCountElement = box.querySelector(".like-count");
  let currentLikes = parseInt(likeCountElement.textContent);
  likeCountElement.textContent=currentLikes+1;
  //console.log("Like count:", currentLikes + 1);
}

function editing(ele){
  console.log("edit is clicked");
  let commentBox = ele.closest(".card");
  let comment = commentBox.querySelector(".text");
  let fetchComment = comment.textContent;
  comment.innerHTML = `<input type="text" placeholder="${fetchComment}" class="edit-text" style="text-align: start;"></input>
  <button onClick="saveComment(this)">save</button>`
}
//innerHTML is used to set or change the content of that element
function saveComment(ele){
  let commentBox = ele.closest(".card");
  let comment = commentBox.querySelector(".text");
  let newComment = comment.querySelector(".edit-text").value;
  comment.innerHTML = newComment;
}

commentContainer.addEventListener("click", function (e) {
  let replyClicked = e.target.classList.contains("reply");
  let submitClicked = e.target.classList.contains("submit");
  let deleteClicked = e.target.classList.contains("delete");
  let closestCard = e.target.closest(".all-comments");

  if (replyClicked) {
    //the box for reply will be popped
    closestCard.appendChild(createInputBox());
  }

  if (submitClicked) {
    //the comment card will be added
    let nested = e.target.closest(".nested");
    if(nested.children[0].value){
      closestCard.appendChild(createNextComment(nested.children[0].value));
      nested.remove();
    }
  }

  if(deleteClicked)
    {
      console.log("delete is clicked");
      deleteComment(e.target);
    }
});
