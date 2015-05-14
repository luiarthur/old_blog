(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require
if(!u&&a)return a(o,!0)
if(i)return i(o,!0)
throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}}
t[o][0].call(f.exports,function(e){var n=t[o][1][e]
return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require
for(var o=0
o<r.length
o++)s(r[o])
return s})({1:[function(require,module,exports){"use strict"
var Commented=require("./lib")
function defaultSlug(){return window.location.host+window.location.pathname}document.addEventListener("DOMContentLoaded",function(){var node=document.getElementById("commented-main")
if(!node){console.error("#commented-main node not found")
return}var options={firebase:node.getAttribute("data-firebase"),type:"firebase",auth:node.getAttribute("data-auth").split(" "),slug:node.getAttribute("data-slug")||defaultSlug(),inline:node.getAttribute("data-inline"),main:node}
if(!options.firebase){console.error("Invalid configuration! data-firebase must be specified")
return}Commented(options)})},{"./lib":11}],2:[function(require,module,exports){var Login=require("./login.jsx"),CreateComment=require("./create-comment.jsx"),NoJank=require("./no-jank.js")
var AddComment=React.createClass({displayName:"AddComment",slide:{duration:3},propTypes:{user:React.PropTypes.object,autoAdd:React.PropTypes.bool,noCancel:React.PropTypes.bool},getInitialState:function(){return{adding:false}},onShow:function(){this.setState({adding:true})},onHide:function(){this.setState({adding:false})},render:function(){if(!this.state.adding&&!this.props.autoAdd){return React.DOM.div({className:"add-comment",onClick:this.onShow},"Add a comment")}if(!this.props.user){return Login({db:this.props.db,auth:this.props.auth,onCancel:!this.props.noCancel&&this.onHide})}return CreateComment({onHide:!this.props.noCancel&&this.onHide,target:this.props.target,db:this.props.db,user:this.props.user})}})
module.exports=AddComment},{"./create-comment.jsx":7,"./login.jsx":13,"./no-jank.js":16}],3:[function(require,module,exports){var AutoTextarea=React.createClass({displayName:"AutoTextarea",componentDidMount:function(){var node=this.getDOMNode()
node.style.height="auto"
node.style.height=node.scrollHeight+"px"
node.style.scrollTop=node.scrollHeight
node.focus()
node.selectionStart=node.selectionEnd=node.value.length},render:function(){var style,node
if(this.isMounted()){node=this.getDOMNode()
node.style.height="auto"
node.style.height=node.scrollHeight+"px"
style={height:node.scrollHeight+"px",scrollTop:node.scrollHeight}}return this.transferPropsTo(React.DOM.textarea({style:style,className:"auto-textarea"}))}})
module.exports=AutoTextarea},{}],4:[function(require,module,exports){"use strict"
module.exports=cleanSlug
function cleanSlug(slug){return slug.replace(/[^a-zA-Z0-9]/gm,"-")}},{}],5:[function(require,module,exports){var format=require("./format"),AutoTextarea=require("./auto-textarea.jsx"),ReplyLogin=require("./reply-login.jsx"),cx=React.addons.classSet,SlideDown=require("./slide-down.js"),PT=React.PropTypes
var CommentDisplay=React.createClass({displayName:"CommentDisplay",mixins:[SlideDown],getSlide:function(){return{duration:.3,closeHeight:this.props.creating&&!this.props.isReply?30:0}},propTypes:{editing:React.PropTypes.bool.isRequired,canEdit:React.PropTypes.bool,data:React.PropTypes.object.isRequired,creating:React.PropTypes.bool,isReply:React.PropTypes.bool,onEdit:React.PropTypes.func,doneEditing:React.PropTypes.func,onRemove:React.PropTypes.oneOfType([PT.bool,PT.func]),onLogout:React.PropTypes.func,onReply:PT.oneOfType([PT.bool,PT.func]),onHeart:React.PropTypes.func,onUnHeart:React.PropTypes.func,onFlag:React.PropTypes.func},getInitialState:function(){return{text:this.props.data.text}},onLogout:function(){this.slideAway(this.props.onLogout)},onRemove:function(){this.slideAway(this.props.onRemove)},cancelEdit:function(){this.setState({text:this.props.data.text})
if(this.props.creating){this.slideAway(this.props.cancelEdit)}else{this.props.cancelEdit()}},doneEditing:function(){if(!this.state.text)return
if(this.props.creating){this.slideAway(this.props.doneEditing.bind(null,this.state.text))}else{this.props.doneEditing(this.state.text)}},onChange:function(e){this.setState({text:e.target.value})},getVotes:function(){var votes={heart:false,heartCount:0,flagged:this.props.data.flags&&this.props.data.flags[this.props.userid],flagCount:0}
if(this.props.data.votes&&this.props.data.votes[this.props.userid]){votes.heart=true}for(var id in this.props.data.votes){votes.heartCount+=1}for(var id in this.props.data.flags){if(this.props.data.flags[id]){votes.flagCount+=1}}return votes},voteButtons:function(votes){if(!this.props.canVote)return
return React.DOM.div({className:"commented_buttons"},React.DOM.span({onClick:this.props.onFlag.bind(null,!votes.flagged),className:cx({"button commented_flag":true,"commented_flag--active":votes.flagged})},React.DOM.i({className:"fa fa-flag"})),React.DOM.span({onClick:votes.heart?this.props.onUnHeart:this.props.onHeart,className:cx({"button commented_heart":true,"commented_heart--shown shown":!!votes.heartCount,"commented_heart--active active":votes.heart})},React.DOM.span({className:"count"},votes.heartCount),React.DOM.i({className:"fa fa-heart"})),!this.props.isReply&&React.DOM.span({onClick:this.props.onReply,className:"commented_reply"},"reply"))},editButtons:function(){return React.DOM.div({className:"commented_buttons"},React.DOM.span({onClick:this.doneEditing,className:"commented_done-edit button"},this.props.creating?"post":"save"),this.props.cancelEdit&&React.DOM.span({onClick:this.cancelEdit,className:"commented_remove button"},"cancel"))},replyLogin:function(){if(this.props.isReply)return false
return React.DOM.div({className:"commented_buttons"},ReplyLogin({db:this.props.db,auth:this.props.db.options.auth,onCancel:this.props.cancelReply,onReply:this.props.onReply}))},buttons:function(votes){if(!this.props.userid){return this.replyLogin()}if(!this.props.canEdit){return this.voteButtons(votes)}if(this.props.editing){return this.editButtons()}return React.DOM.div({className:"commented_buttons"},React.DOM.span({onClick:this.props.onEdit,className:"commented_edit button"},React.DOM.i({className:"fa fa-pencil"})),React.DOM.span({onClick:this.onRemove,className:"commented_remove button"},React.DOM.i({className:"fa fa-times"})),!this.props.isReply&&React.DOM.span({onClick:this.props.onReply,className:"commented_reply"},"reply"))},body:function(){if(!this.props.editing){return format(this.props.data.text,"text")}return AutoTextarea({placeholder:"Type your comment here",onChange:this.onChange,value:this.state.text})},render:function(){var comment=this.props.data,cls="commented_comment"
if(this.props.editing){cls+=" commented_comment--editing"}if(this.props.canEdit){cls+=" commented_comment--mine"}if(this.props.isReply){cls+=" commented_comment--reply"}if(this.props.hasReplies){cls+=" commented_comment--has-replies"}var votes=this.getVotes()
if(votes.flagCount>2&&this.props.userid!==this.props.data.userid){return React.DOM.div({className:cls+" commented_comment--flagged"},React.DOM.span({className:"commented_pic fa-stack fa-lg"},React.DOM.i({className:"fa fa-circle fa-stack-2x"}),React.DOM.i({className:"fa fa-flag fa-stack-1x fa-inverse"})),React.DOM.span({className:"display-name"},"flagged comment hidden"))}return React.DOM.div({className:cls},React.DOM.img({className:"commented_pic",src:comment.picture}),React.DOM.div({className:"right"},this.buttons(votes),React.DOM.strong({className:"display-name"},comment.displayName),comment.created&&React.DOM.span({className:"display-time"},moment(comment.created).fromNow()),this.props.parentDeleted&&React.DOM.span({className:"parent-deleted"},"in reply to a deleted comment"),this.props.creating&&React.DOM.button({className:"commented_logout",onClick:this.onLogout},"logout"),this.body()))}})
module.exports=CommentDisplay},{"./auto-textarea.jsx":3,"./format":10,"./reply-login.jsx":17,"./slide-down.js":19}],6:[function(require,module,exports){var CommentDisplay=require("./comment-display.jsx")
var Comment=React.createClass({displayName:"Comment",propTypes:{data:React.PropTypes.object.isRequired,canEdit:React.PropTypes.bool,userid:React.PropTypes.string,db:React.PropTypes.object},getInitialState:function(){return{editing:false,replying:false}},onRemove:function(){this.props.db.removeComment(this.props.data._id)},onEdit:function(e){if(e){e.preventDefault()
e.stopPropagation()}this.setState({editing:true})},onReply:function(){if(this.props.isReply)return
this.setState({editing:false,replying:true})},onUnHeart:function(){this.props.db.unHeart(this.props.data._id,this.props.userid)},onHeart:function(){this.props.db.heart(this.props.data._id,this.props.userid)},onFlag:function(flag){this.props.db.flag(this.props.data._id,this.props.userid,flag)},cancelEdit:function(){this.setState({editing:false})},doneEditing:function(text){if(!this.state.editing)return
if(!text)return
this.props.db.editComment(this.props.data._id,text)
this.setState({editing:false})},doneReplying:function(text){if(!this.state.replying)return
if(!text)return
this.props.db.addComment(text,"reply:"+this.props.data._id,"")
this.setState({replying:false})},cancelReply:function(){this.setState({replying:false})},renderReplies:function(){var replies=this.props.replies
if(!replies.length&&!this.state.replying){return false}var user=this.props.user
return React.DOM.div({className:"commented_replies"},replies.map(function(comment){return Comment({key:comment._id,isReply:true,replies:[],canEdit:user&&user.uid==comment.userid,canVote:!!user,userid:user&&user.uid,data:comment,user:user,db:this.props.db})}.bind(this)),this.state.replying&&user&&CommentDisplay({editing:true,canEdit:true,canVote:false,data:{picture:this.props.user.picture,displayName:this.props.user.displayName,text:""},onLogout:this.onLogout,userid:this.props.userid,isReply:true,creating:true,cancelEdit:this.cancelReply,doneEditing:this.doneReplying,onRemove:this.cancelReply}))},onLogout:function(){this.setState({replying:false,editing:false})
this.props.db.logout()},render:function(){return React.DOM.div({className:"commented_one"},CommentDisplay({editing:this.state.editing,canEdit:this.props.canEdit,canVote:this.props.canVote,data:this.props.data,db:this.props.db,isReply:this.props.isReply,hasReplies:this.props.userid&&this.state.replying||this.props.replies&&this.props.replies.length,userid:this.props.userid,parentDeleted:this.props.parentDeleted,onEdit:this.onEdit,onFlag:this.onFlag,onReply:!this.props.isReply&&this.onReply,cancelReply:this.cancelReply,onLogout:this.onLogout,onRemove:this.onRemove,onHeart:this.onHeart,onUnHeart:this.onUnHeart,doneEditing:this.doneEditing,cancelEdit:this.cancelEdit}),this.renderReplies())}})
module.exports=Comment},{"./comment-display.jsx":5}],7:[function(require,module,exports){var CommentDisplay=require("./comment-display.jsx")
var PT=React.PropTypes
var CreateComment=React.createClass({displayName:"CreateComment",propTypes:{onHide:React.PropTypes.oneOfType([PT.bool,PT.func]),target:React.PropTypes.string.isRequired,db:React.PropTypes.object.isRequired,user:React.PropTypes.object.isRequired},getInitialState:function(){return{text:""}},_onSubmit:function(text){if(!text)return
this.props.db.addComment(text,this.props.target,false)
this.props.onHide&&this.props.onHide()},render:function(){return CommentDisplay({canEdit:true,editing:true,creating:true,data:{picture:this.props.user.picture,displayName:this.props.user.displayName,text:""},userid:this.props.user.uid,onLogout:this.props.db.logout.bind(this.props.db),cancelEdit:this.props.onHide,doneEditing:this._onSubmit,onRemove:this.props.onHide})}})
module.exports=CreateComment},{"./comment-display.jsx":5}],8:[function(require,module,exports){"use strict"
module.exports=DBFirebase
function DBFirebase(options){
  this.db=new Firebase("https://"+options.firebase+".firebaseio.com/comments/"+options.slug)
var onValue
this.db.on("value",onValue=function(){this.db.off("value",onValue)
this.loaded=true}.bind(this))
this.user=null
this.options=options
this._auth=new FirebaseSimpleLogin(this.db,this._onLogin.bind(this))
this.liHanders=[]}DBFirebase.prototype={addComment:function(text,target,quote){if(!this.user){return console.error("Not logged in")}this.db.push({created:Date.now(),displayName:this.user.displayName,picture:this.user.picture,userid:this.user.uid,text:text,target:target,quote:quote})},editComment:function(id,text){if(!this.user){return console.error("Not logged in")}this.db.child(id).update({text:text})},removeComment:function(id){if(!this.user){return console.error("Not logged in")}this.db.child(id).remove()},flag:function(id,uid,flag){if(flag){this.db.child(id).child("flags").child(uid).set(flag)}else{this.db.child(id).child("flags").child(uid).remove()}},heart:function(id,uid){this.db.child(id).child("votes").child(uid).set(true)},unHeart:function(id,uid){this.db.child(id).child("votes").child(uid).remove()},login:function(type){this._auth.login(type,{rememberMe:true})},_onLogin:function(err,user){if(err||!user){return this.fireLoggedin(null)}user.picture=user.thirdPartyUserData.profile_image_url||user.thirdPartyUserData.picture||user.thirdPartyUserData.avatar_url
if(user.picture&&user.picture.data){user.picture=user.picture.data.url}this.user=user
this.fireLoggedin(user)},fireLoggedin:function(user){this.liHanders.forEach(function(fn){fn(user)})},logout:function(){this._auth.logout()},onLogin:function(cb){this.liHanders.push(cb)},offLogin:function(cb){var i=this.liHanders.indexOf(cb)
if(i===-1)return
this.liHanders.splice(i,1)},onceLoaded:function(done){var onValue
this.db.on("value",onValue=function(){done()
this.db.off("value",onValue)}.bind(this))},onAdd:function(cb){this.db.on("child_added",function(snapshot){var val=snapshot.val()
val._id=snapshot.name()
cb(val)})},onChange:function(cb){this.db.on("child_changed",function(snapshot){var val=snapshot.val()
val._id=snapshot.name()
cb(val)})},onRemove:function(cb){this.db.on("child_removed",function(snapshot){cb(snapshot.name())})}}},{}],9:[function(require,module,exports){"use strict"
var DBFirebase=require("./db-firebase")
module.exports=function(options){switch(options.type){case"firebase":return new DBFirebase(options)
default:console.error("Invalid backend specified",options.type,options)}}},{"./db-firebase":8}],10:[function(require,module,exports){"use strict"
if(window.marked){marked.setOptions({gfm:true,tables:true,breaks:true,pedantic:false,sanitize:true,smartLists:true,smartypants:true})
module.exports=function(text,cls){return React.DOM.div({className:cls,dangerouslySetInnerHTML:{__html:marked(text)}})}}else{module.exports=function(x,cls){return React.DOM.div({className:cls},x)}}},{}],11:[function(require,module,exports){"use strict"
var cleanSlug=require("./clean-slug.js"),getDb=require("./db"),InlineComments=require("./inline-comments.jsx"),MainComments=require("./main-comments.jsx")
module.exports=function(options){options.slug=cleanSlug(options.slug)
var db=window.db=getDb(options)
if(!db)return console.error("Failed to initialize db")
if(options.inline){var body=document.querySelector(options.inline)
body.classList.add("commented_inline-body")
var nodes=body.querySelectorAll(options.inline+" > *")
[].forEach.call(nodes,function(node,i){var id=node.getAttribute("data-section-id")||i
var inline=document.createElement("div")
inline.className="commented_inline-wrapper"
node.classList.add("commented_section")
node.appendChild(inline)
React.renderComponent(InlineComments({target:"inline:"+id,body:body,auth:options.auth,db:db}),inline)})}React.renderComponent(MainComments({auth:options.auth,db:db}),options.main)}},{"./clean-slug.js":4,"./db":9,"./inline-comments.jsx":12,"./main-comments.jsx":14}],12:[function(require,module,exports){var PT=React.PropTypes,mixing=require("./mixin"),ViewComments=require("./view-comments.jsx"),cx=React.addons.classSet
function isDescendent(child,parent){while(child){if(child===parent)return true
child=child.parentNode}return false}var InlineComments=React.createClass({displayName:"InlineComments",mixins:[mixing],propTypes:{target:PT.string.isRequired,body:PT.object.isRequired,auth:PT.array.isRequired,db:PT.object.isRequired},componentDidMount:function(){document.addEventListener("click",this.docMouseDown)},componentWillUnmount:function(){document.removeEventListener("click",this.docMouseDown)},docMouseDown:function(e){if(!this.state.showing){return}var isComment=false,node=e.target,me=this.getDOMNode()
if(node.classList.contains("add-comment")){return}while(node){if(node===me)return
if(node.classList){if(node.classList.contains("commented_login-type")){return}if(node.classList.contains("commented_inline")){isComment=true
break}}if(!node.parentNode&&node!==document){return}node=node.parentNode}if(!isComment){this.props.body.classList.remove("commented_inline-body--shifted")}this.setState({showing:false})},componentDidUpdate:function(){if(this.state.showing){this.props.body.classList.add("commented_inline-body--shifted")}},onShow:function(){if(this.state.showing){return this.onHide()}this.setState({showing:true})},onHide:function(){this.props.body.classList.remove("commented_inline-body--shifted")
this.setState({showing:false})},render:function(){var comments=this.organizeComments()
var hasComments=comments&&comments.list.length
var count=0
comments?comments.list.forEach(function(item){count+=1+item.replies.length}):null
return React.DOM.div({className:cx({commented_inline:true,"commented_inline--empty":!hasComments,"commented_inline--showing":this.state.showing})},React.DOM.div({className:"commented_inline_flag",onClick:this.onShow},count||"+"),this.state.showing&&ViewComments({comments:comments,db:this.props.db,user:this.state.user,loading:this.state.loading,auth:this.props.auth,target:this.props.target,startAdding:!hasComments}))}})
module.exports=InlineComments},{"./mixin":15,"./view-comments.jsx":20}],13:[function(require,module,exports){var ICONS={facebook:"facebook",twitter:"twitter",google:"google",github:"github"}
var Login=React.createClass({displayName:"Login",propTypes:{db:React.PropTypes.object.isRequired,auth:React.PropTypes.array.isRequired,onLogin:React.PropTypes.func.isRequired,onCancel:React.PropTypes.func.isRequired},getInitialState:function(){return{loading:false}},componentDidMount:function(){this.props.db.onLogin(this._onLogin)},componentWillUnmount:function(){this.props.db.offLogin(this._onLogin)},_onLogin:function(){this.setState({loading:false})},onClick:function(type){this.setState({loading:type})
this.props.db.login(type)},render:function(){if(this.state.loading){return React.DOM.div({className:"commented_login--loading commented_login"},"Connecting to ",this.state.loading,React.DOM.i({className:"fa fa-spin fa-spinner"}))}return React.DOM.div({className:"commented_login"},this.props.auth.map(function(type){var icon=ICONS[type],cls="commented_login-type"
cls+=" commented_login-type--"+type
return React.DOM.button({key:type,className:cls,onClick:this.onClick.bind(this,type)},React.DOM.span({className:"commented_pic fa-stack fa-lg"},React.DOM.i({className:"fa fa-circle fa-stack-2x"}),React.DOM.i({className:"fa fa-"+icon+" fa-stack-1x fa-inverse"})))}.bind(this)),this.props.onCancel&&React.DOM.button({className:"commented_login-type commente_login-type--cancel",onClick:this.props.onCancel},"×"))}})
module.exports=Login},{}],14:[function(require,module,exports){var ViewComments=require("./view-comments.jsx"),mixing=require("./mixin")
var MainComments=React.createClass({displayName:"MainComments",mixins:[mixing],propTypes:{db:React.PropTypes.object.isRequired,auth:React.PropTypes.array.isRequired},getDefaultProps:function(){return{target:"main"}},render:function(){return ViewComments({comments:this.organizeComments(),loading:this.state.loading,user:this.state.user,db:this.props.db,auth:this.props.auth,target:"main"})}})
module.exports=MainComments},{"./mixin":15,"./view-comments.jsx":20}],15:[function(require,module,exports){"use strict"
var up=React.addons.update
module.exports={propTypes:{db:React.PropTypes.object.isRequired,auth:React.PropTypes.array.isRequired},getInitialState:function(){return{comments:{},loading:!this.props.db.loaded,user:null}},_onLogin:function(user){this.setState({user:user})},_onLoaded:function(){this.setState({loading:false})},componentWillUnmount:function(){this.props.db.offLogin(this._onLogin)},componentDidMount:function(){this.props.db.onLogin(this._onLogin)
if(!this.props.db.loaded){this.props.db.onceLoaded(this._onLoaded)}this.props.db.onAdd(this._onAdded)
this.props.db.onRemove(this._onRemoved)
this.props.db.onChange(this._onChanged)
this.setState({user:this.props.db.user})},organizeComments:function(){var $__0=this
var ids=Object.keys(this.state.comments),comments=this.state.comments,showAll=this.state.showAll,isMain=this.props.target==="main",numInlines=0,replies=[],map={},list=[]
if(!ids.length)return null
ids.forEach(function(id){if(!comments[id])return
var item={comment:comments[id],replies:[]}
var target=comments[id].target
map[id]=item
if(target===$__0.props.target){list.push(item)}else if(isMain&&target.indexOf("inline:")===0){numInlines+=1
if(showAll){list.push(item)}}else if(target.indexOf("reply:")===0){replies.push(comments[id])}})
replies.forEach(function(comment){var parent=comment.target.slice("reply:".length)
if(!map[parent]){if(isMain){list.push({comment:comment,parentDeleted:true,replies:[]})}return}map[parent].replies.push(comment)})
return{list:list,numInlines:numInlines}},_onAdded:function(comment){var update={}
update[comment._id]={$set:comment}
this.setState({comments:up(this.state.comments,update)})},_onChanged:function(comment){var update={}
update[comment._id]={$set:comment}
this.setState({comments:up(this.state.comments,update)})},_onRemoved:function(id){var update={}
update[id]={$set:null}
this.setState({comments:up(this.state.comments,update)})}}},{}],16:[function(require,module,exports){"use strict"
module.exports={componentDidMount:function(){var node=this.getDOMNode()
this._height=node.getBoundingClientRect().height},componentDidUpdate:function(){var lastHeight=this._height,node=this.getDOMNode(),dur=this.slide.duration+""
node.style.WebkitTransition=""
node.style.height="auto"
var newHeight=this._height=node.getBoundingClientRect().height
node.style.height=lastHeight+"px"
setTimeout(function(){node.style.WebkitTransition="height "+dur+"s ease"
node.style.height=newHeight},0)}}},{}],17:[function(require,module,exports){var Login=require("./login.jsx")
var ReplyLogin=React.createClass({displayName:"ReplyLogin",propTypes:{db:React.PropTypes.object.isRequired,auth:React.PropTypes.array.isRequired,onCancel:React.PropTypes.func,onReply:React.PropTypes.func},getInitialState:function(){return{open:false}},onOpen:function(){this.props.onReply()
this.setState({open:true})},onCancel:function(){this.props.onCancel()
this.setState({open:false})},render:function(){return React.DOM.span({className:"commented_reply-login"},this.state.open?Login({db:this.props.db,auth:this.props.auth,onLogin:this.props.onReply,onCancel:this.onCancel}):React.DOM.span({onClick:this.onOpen,className:"commented_reply"},"reply"))}})
module.exports=ReplyLogin},{"./login.jsx":13}],18:[function(require,module,exports){var ShowAller=React.createClass({displayName:"ShowAller",propTypes:{skipped:React.PropTypes.number},render:function(){var show=this.props.showAll
return React.DOM.div({className:"commented_show-aller"},React.DOM.button({className:"commented_show-aller_btn",onClick:this.props.onChange.bind(null,!show)},show?"Hide":"Show"," ",this.props.count," side comments"))}})
module.exports=ShowAller},{}],19:[function(require,module,exports){"use strict"
module.exports={componentDidMount:function(){var node=this.getDOMNode(),style=window.getComputedStyle(node),height=parseFloat(style.height),paddingBottom=style.paddingBottom
this.slide=this.getSlide()
node.style.height=this.slide.closeHeight||0
node.style.opacity=0
node.style.overflow="hidden"
node.style.paddingBottom=0
var style=window.getComputedStyle(node)
var dur=this.slide.duration
setTimeout(function(){node.style.transition="height "+dur+"s ease, opacity "+dur+"s ease, padding-bottom "+dur+"s ease"
node.style.height=height+"px"
node.style.paddingBottom=paddingBottom
node.style.opacity=1},0)
function fin(){node.removeEventListener("transitionend",fin)
node.style.height="auto"}node.addEventListener("transitionend",fin)},slideAway:function(done){var node=this.getDOMNode()
var style=window.getComputedStyle(node)
node.style.height=style.height
var box=node.getBoundingClientRect()
node.style.height=(this.slide.closeHeight||0)+"px"
node.style.opacity=0
node.style.paddingBottom=0
function fin(){node.removeEventListener("transitionend",fin)
done&&done()}node.addEventListener("transitionend",fin)}}},{}],20:[function(require,module,exports){var mixing=require("./mixin"),Comment=require("./comment.jsx"),ShowAller=require("./show-aller.jsx"),AddComment=require("./add-comment.jsx")
var ViewComments=React.createClass({displayName:"ViewComments",propTypes:{comments:React.PropTypes.object,db:React.PropTypes.object.isRequired,auth:React.PropTypes.array.isRequired,target:React.PropTypes.string.isRequired,startAdding:React.PropTypes.bool},getInitialState:function(){return{showAll:false}},_onChangeShow:function(which){this.setState({showAll:which})},renderComments:function(){if(!this.props.comments){if(this.props.loading){return React.DOM.span(null,React.DOM.i({className:"fa fa-spin fa-spinner"})," ","Loading...")}return null}var organized=this.props.comments
var user=this.props.user
var db=this.props.db
var isMain=this.props.target==="main"
var comments=organized.list.map(function(item){return Comment({key:item.comment._id,replies:item.replies,parentDeleted:item.parentDeleted,canEdit:user&&user.uid==item.comment.userid,canVote:!!user,userid:user&&user.uid,data:item.comment,user:user,db:db})}.bind(this))
return React.DOM.div({className:"commented_comments"},isMain&&organized.inlines?ShowAller({count:organized.inlines,showAll:this.state.showAll,onChange:this._onChangeShow}):false,comments)},render:function(){return React.DOM.div({className:"commented_main"},this.renderComments(),React.DOM.div({className:"commented_add"},AddComment({autoAdd:this.props.startAdding,noCancel:this.props.startAdding,target:this.props.target,user:this.props.user,auth:this.props.auth,db:this.props.db})),this.props.target==="main"&&React.DOM.div({className:"commented_attribution"},"Comments powered by ",React.DOM.a({target:"_blank",href:"http://commented.github.io"},"//commented")))}})
module.exports=ViewComments},{"./add-comment.jsx":2,"./comment.jsx":6,"./mixin":15,"./show-aller.jsx":18}]},{},[1])
