var myUserID = null;
var myName = null;
var myPicture = null;
var slug = (window.location.href).replace(/\/|\.|:|\[|\]|\#|\$\-/g,"");
var link = "https://luifireapp.firebaseio.com/comments/"+slug;
var ref = new Firebase(link);

//var newCommentID = null;
// Store: name, uid, body, picture

//DANGER! REMOVE ALL COMMENTS!
//var temp = new Firebase("https://luifireapp.firebaseio.com");
//temp.auth("SECRET");
//temp.remove();

$(document).ready(function(){ // executes js when document is ready. Allows js to be put in head. Good practice.
});

//$(".oCom[userid='"+uid+"']").children(".editCom").show();
function onLoginClick(provider) {
  ref.authWithOAuthPopup(provider,function(){});
}
function onLogoutClick(e) {
  e.preventDefault(); //prevents default actions such as going to top of page because: href="#"
  ref.unauth();
  $(".oCom").children(".editCom").hide();
}

ref.onAuth(function(authData) {
var login = "<img id='githubLogin' href='#' onclick='onLoginClick(\"github\")'   src='/logos/github.png'>"+
            "<img id='googleLogin' href='#' onclick='onLoginClick(\"google\")'   src='/logos/google.png'>"+ 
            "<img id='fbLogin'     href='#' onclick='onLoginClick(\"facebook\")' src='/logos/fb.png'>";
var logout = "<a href='#' onclick='onLogoutClick(event)' id='logout'>logout</a>";

  if (authData) {
    myUserID = authData.uid; 

    switch(authData.provider) {
      case "google": 
        myName = authData.google.displayName; 
        myPicture = authData.google.cachedUserProfile.picture;
        break;
      case "facebook":
        myName = authData.facebook.displayName; 
        myPicture = authData.facebook.cachedUserProfile.picture.data.url;
        break;
      case "github":
        myName = authData.github.displayName; 
        myPicture = authData.github.cachedUserProfile.avatar_url;
        break;
    }
    $(".oCom[userid='"+myUserID+"']").children(".editCom").show();
    $("#logIO").text("").append(logout);
    $("#userPic").attr("src",myPicture);
    $("#newComment").attr("placeholder",myName+"' s comment...");
  } else {
    $("#logIO").text("").append(login);
    myName=null;
    myUserID=null;
    myPicture="http://sigaramae.org/img/team-placeholder-man.jpg";
    $("#userPic").attr("src",myPicture);
    $("#newComment").attr("placeholder","Please login to comment...");
  }
});

function onCommentKeyDown(event) {
  if (event.keyCode == 13) {
    if(myUserID == null) {
      alert("You must log in to leave a comment");
    } else {
      if (event.shiftKey) {
        $("#newComment").val($("#newComment").val()+"\n");
      } else {
          var currTime = new Date();
          currTime = currTime.toString();
          ref.push({userid: myUserID, body: $("#newComment").val(), name: myName, picture:myPicture, time:currTime});
          $("#newComment").val("");
      }
    }
    event.preventDefault(); // prevents default actions
  }
}
$("#newComment").elastic();

//Create a query for only the last 100 comments
var lastXComments = ref.limitToLast(100);

//Render Comments
lastXComments.on('child_added', function (snapshot) {
  var comment = snapshot.val();
  comment.time = jQuery.timeago(new Date(comment.time));
  var newDiv = $("<div/>").addClass("comment").attr("id",snapshot.key()).appendTo("#oldComments");
  newDiv.html(Mustache.to_html($('#template').html(), comment));
  // If the comment owner is logged in, he can view the remove the comment option.
  $(".oCom").children(".editCom").hide();
  $(".oCom[userid='"+myUserID+"']").children(".editCom").show();
});

//Remove deleted comments
lastXComments.on("child_removed", function(snapshot) {
  $("#" + snapshot.key()).remove();
});

//Remove Comment
function onClickRemove(e) { 
  var commentID = e.parentNode.parentNode.id;
  var rmRef = new Firebase(link+"/"+commentID);
  rmRef.remove();
}

//Edit Comment:
function onClickEdit(e) {
  //var commentID = e.parentNode.parentNode.id;
  commentID = e.parentNode.parentNode.id;
  var edRef = new Firebase(link+"/"+commentID);
  var loc = $("#"+commentID)
  var curCom = loc.children("span").children("text");
  alert("coming soon...");
  // Make a change!
  //loc.children("span").replaceWith("<textarea class='commentBox' style='border:1px solid;'></textarea>");
  //ta = loc.children("textarea");
  //ta.focus().val("").val(curCom.text());
  //$(".commentBox").elastic();
  //loc.children("textarea").text(curCom.text());
  //var newCom = loc.children("textarea").text();  
  //edRef.child("body").set(newCom);
}

function onCommentClick(e) {
  e.preventDefault();
  if ($("#togComments").attr("show")=="1") {
    $("#oldComments").hide();
    $("#textWrap").hide();
    $("#togComments").attr("show","0");
  } else {
    $("#oldComments").show();
    $("#textWrap").show();
    $("#togComments").attr("show","1");
  }
}
// Only give remove options to those that have access.
// Show remove options on mouseover.
// http://www.w3schools.com/jquery/jquery_events.asp
