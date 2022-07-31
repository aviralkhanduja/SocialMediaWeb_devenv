{   
    var buttons=document.getElementsByClassName('comments-box');
    for(let i of buttons){
        i.addEventListener('click',function(){
            let element=i.nextElementSibling;
            console.log('in js/home/js',element); 
            element.classList.add("visible");
        });
    }
    var crosses=document.getElementsByClassName('cross');
    for(let i of crosses){
        i.addEventListener('click',function(){
            let element=i.parentElement;
            console.log('in js/home/js',element); 
            element.classList.remove("visible");
        });
    }
    let createLike=function(){
        $('.likes-box').click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(this).prop('href'),
                success:(data)=>{
                    console.log('data=',data);
                    console.log($(this).children('span'));
                    $(this).children('span').text(data.data.count);
                    if(!data.data.deleted){
                        $(this).css({'color':'blue','background-color':"white"})
                    }
                    else{
                        $(this).css({'color':'white','background-color':"black"});
                    }
                },
                error:(err)=>{
                    console.log(err.message);
                }
            })
        });
    }
    let createPost=function(){
        let newPostForm=$('#post-form');
        newPostForm.submit(function(event){
            event.preventDefault();
            console.log('fine');
            $.ajax({
                type:'post',
                url:'/user/home/post/create',
                //since we need to manually send that in json format->
                data:newPostForm.serialize(),
                success: function(data){
                    let newpost=newPostDom(data.data.post);
                    $('#display-posts').prepend(newpost);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            }); 
        });
    }
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log('In success sec of ajax');
                    $(`#${data.data.post_id}`).remove();
                },
                error:function(err){
                    console.log('In error sec of ajax',err.responseText);
                    //console.log(err.responseText);
                }
            });
        });
    }
    let deleteInit=function(){
        let dels=document.getElementsByClassName('delete-post-button');
        for(let del of dels){
            deletePost(del);
        }
    }
    let newPostDom=function(post){
        return $(`<li id="${post._id}"> 
        <div class="user-of-post">  
            <h5><i class="fas fa-user"></i>${post.user.Name}</h5>
            <a href="/user/home/post/delete/?id=${post._id}" data-related="posts-display" class="delete-post-button"><i class="fas fa-trash"></i></a>
        </div>
        <p class="date">${post.date}</p>
        <p>${post.content}</p>
        <form action="/user/home/comment/create" method="post">
        <div class="comment-input">
        <input type="text" name="content" placeholder=" Add a comment..." required>
        <input type="hidden" name="post" value="${post._id}">
        <button type="submit" data-related="posts-display">Add</button>
    </div>
    <a class="likes-box" data-related="posts-display" href="/user/home/like/create?type=Post&id=${post._id}">Like <i class="fas fa-thumbs-up"></i> <span>${post.likes.length}</span></a>
    <a class="comments-box" data-related="posts-display">View Comments</a>
    <div class="invisible">
        <h4 class="heading-comments">Comments</h4>
        <i class="fas fa-times cross"></i>
        <%for(let comment of post.comments){%>
            <%-include('_comment',{comment:comment});%>
        <%}%>
        <hr>
    </div>
        </form>
    </li>`);
    }
    createPost();
    deleteInit();
    createLike();
}

