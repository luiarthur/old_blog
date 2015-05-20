var myUserID = null;
var myName = null;
var myPicture = null;
var slug = (window.location.href).replace(/\/|\.|:|\[|\]|\#|\$\-/g,"");
var link = "https://luifireapp.firebaseio.com/comments/"+slug;
var ref = new Firebase(link);
// Store: name, uid, body, picture

//DANGER! REMOVE ALL COMMENTS!
//var temp = new Firebase("https://luifireapp.firebaseio.com");
//temp.auth("SECRET");
//temp.remove();

function onLoginClick(provider) {
  ref.authWithOAuthPopup(provider,function(){});
}
function onLogoutClick() {
  ref.unauth();
}

ref.onAuth(function(authData) {
var login = "<img id='githubLogin' href='#' onclick='onLoginClick(\"github\")'   src='logos/github.png'>"+
            "<img id='googleLogin' href='#' onclick='onLoginClick(\"google\")'   src='logos/google.png'>"+ 
            "<img id='fbLogin'     href='#' onclick='onLoginClick(\"facebook\")' src='logos/fb.png'>";
var logout = "<a href='#' onclick='onLogoutClick()' id='logout'>logout</a>";

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
        ref.push({userid: myUserID, body: $("#newComment").val(), name: myName, picture:myPicture});
        $("#newComment").val("");
      }
    }
    event.preventDefault(); // prevents default actions
  }
}

//Create a query for only the last 4 comments
var numOfComments = 14;
var lastXComments = ref.limit(numOfComments);

//Render Comments
lastXComments.on('child_added', function (snapshot) {
  var comment = snapshot.val();
  var newDiv = $("<div/>").addClass("comment").attr("id",snapshot.name()).appendTo("#oldComments");
  newDiv.html(Mustache.to_html($('#template').html(), comment));
});

//Remove deleted comments
lastXComments.on("child_removed", function(snapshot) {
  $("#" + snapshot.name()).remove();
});

$("#newComment").elastic();
