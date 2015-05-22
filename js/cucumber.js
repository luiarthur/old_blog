var myUserID = null;
var myName = null;
var myPicture = null;
var slug = (window.location.href).replace(/\/|\.|:|\[|\]|\#|\$\-/g,"");
var link = "https://luifireapp.firebaseio.com/comments/"+slug;
var ref = new Firebase(link);
//
//var newCommentID = null;
// Store: name, uid, body, picture

//DANGER! REMOVE ALL COMMENTS!
//var temp = new Firebase("https://luifireapp.firebaseio.com");
//temp.auth("SECRET");
//temp.remove();

$(document).ready(function(){ // executes js when document is ready. Allows js to be put in head. Good practice.
});

function onLoginClick(provider) {
  ref.authWithOAuthPopup(provider,function(){});
}
function onLogoutClick(e) {
  e.preventDefault(); //prevents default actions such as going to top of page because: href="#"
  ref.unauth();
}

ref.onAuth(function(authData) {
var login = "<img id='githubLogin' href='#' onclick='onLoginClick(\"github\")'   src='/logos/github.png'>"+
            "<img id='googleLogin' href='#' onclick='onLoginClick(\"google\")'   src='/logos/google.png'>"+ 
            "<img id='fbLogin'     href='#' onclick='onLoginClick(\"facebook\")' src='/logos/fb.png'>";
var logout = "<a href='#' onclick='onLogoutClick(event)' id='logout'>logout</a>";

  if (authData) {
    switch(authData.provider) {
      case "google": 
        myUserID = authData.google.id; 
        myName = authData.google.displayName; 
        myPicture = authData.google.cachedUserProfile.picture;
        break;
      case "facebook":
        myUserID = authData.facebook.id; 
        myName = authData.facebook.displayName; 
        myPicture = authData.facebook.cachedUserProfile.picture.data.url;
        break;
      case "github":
        myUserID = authData.github.id; 
        myName = authData.github.displayName; 
        myPicture = authData.github.cachedUserProfile.avatar_url;
        break;
    }
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
  //$("#x[uid='"+ref.getAuth().uid+"']").attr("class","");
  var myComments = $(".oCom[userid='"+ref.getAuth().uid+"']");
  //console.log(myComments);
});

//Remove deleted comments
lastXComments.on("child_removed", function(snapshot) {
  $("#" + snapshot.key()).remove();
});

//Not too bad now, but needs fixing.
//Try deleting as non user to see why.
function onClickRemove(e) { 
  var commentID = e.parentNode.parentNode.id;
  var rmRef = new Firebase(link+"/"+commentID);
  rmRef.remove();
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
