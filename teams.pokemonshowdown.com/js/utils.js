"use strict";function _inheritsLoose(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,_setPrototypeOf(t,o);}function _wrapNativeSuper(t){var r="function"==typeof Map?new Map():void 0;return _wrapNativeSuper=function(t){if(null===t||!_isNativeFunction(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,Wrapper);}function Wrapper(){return _construct(t,arguments,_getPrototypeOf(this).constructor);}return Wrapper.prototype=Object.create(t.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(Wrapper,t);},_wrapNativeSuper(t);}function _construct(t,e,r){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var o=[null];o.push.apply(o,e);var p=new(t.bind.apply(t,o))();return r&&_setPrototypeOf(p,r.prototype),p;}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));}catch(t){}return(_isNativeReflectConstruct=function(){return!!t;})();}function _isNativeFunction(t){try{return-1!==Function.toString.call(t).indexOf("[native code]");}catch(n){return"function"==typeof t;}}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t;},_setPrototypeOf(t,e);}function _getPrototypeOf(t){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t);},_getPrototypeOf(t);}var

















HttpError=function(_Error){


function HttpError(message,statusCode,body){var _this;
_this=_Error.call(this,message)||this;_this.statusCode=void 0;_this.body=void 0;
_this.name='HttpError';
_this.statusCode=statusCode;
_this.body=body;
try{
Error.captureStackTrace(_this,HttpError);
}catch(_unused){}return _this;
}_inheritsLoose(HttpError,_Error);return HttpError;}(_wrapNativeSuper(Error));var

NetRequest=function(){

function NetRequest(uri){this.uri=void 0;
this.uri=uri;
}var _proto=NetRequest.prototype;_proto.









get=function get(){var _this2=this;var opts=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
return new Promise(function(resolve,reject){
var xhr=new XMLHttpRequest();
var uri=_this2.uri;
if(opts.query){
uri+=(uri.includes('?')?'&':'?')+Net.encodeQuery(opts.query);
}
xhr.open(opts.method||'GET',uri);
xhr.onreadystatechange=function(){
var DONE=4;
if(xhr.readyState===DONE){
if(xhr.status===200){
resolve(xhr.responseText||'');
return;
}
var err=new HttpError(xhr.statusText||"Connection error",xhr.status,xhr.responseText);
reject(err);
}
};
if(opts.body){
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(Net.encodeQuery(opts.body));
}else{
xhr.send();
}
});
};_proto.












post=function post(){var opts=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var body=arguments.length>1?arguments[1]:undefined;
if(!body)body=opts.body;
return this.get(Object.assign({},
opts,{
method:'POST',
body:body})
);
};return NetRequest;}();


function Net(uri){
if(uri.startsWith('/')&&!uri.startsWith('//')&&Net.defaultRoute)uri=Net.defaultRoute+uri;
if(uri.startsWith('//')&&document.location.protocol==='file:')uri='https:'+uri;
return new NetRequest(uri);
}


Net.defaultRoute='';

Net.encodeQuery=function(data){
if(typeof data==='string')return data;
var urlencodedData='';
for(var _key in data){
if(data[_key]===undefined)continue;
if(urlencodedData)urlencodedData+='&';
urlencodedData+=encodeURIComponent(_key)+'='+encodeURIComponent(data[_key]);
}
return urlencodedData;
};
Net.decodeQuery=function(query){
var out={};
var questionIndex=query.indexOf('?');
if(questionIndex>=0)query=query.slice(questionIndex+1);for(var _i2=0,_query$split2=
query.split('&');_i2<_query$split2.length;_i2++){var queryPart=_query$split2[_i2];
var _queryPart$split=queryPart.split('='),_key2=_queryPart$split[0],value=_queryPart$split[1];
out[decodeURIComponent(_key2)]=decodeURIComponent(value||'');
}
return out;
};var





PSSubscription=function(){


function PSSubscription(observable,listener){this.observable=void 0;this.listener=void 0;
this.observable=observable;
this.listener=listener;
}var _proto2=PSSubscription.prototype;_proto2.
unsubscribe=function unsubscribe(){
var index=this.observable.subscriptions.indexOf(this);
if(index>=0)this.observable.subscriptions.splice(index,1);
};return PSSubscription;}();var







PSModel=function(){function PSModel(){this.
subscriptions=[];}var _proto3=PSModel.prototype;_proto3.
subscribe=function subscribe(listener){
var subscription=new PSSubscription(this,listener);
this.subscriptions.push(subscription);
return subscription;
};_proto3.
subscribeAndRun=function subscribeAndRun(listener){
var subscription=this.subscribe(listener);
subscription.listener();
return subscription;
};_proto3.
update=function update(){for(var _i4=0,_this$subscriptions2=
this.subscriptions;_i4<_this$subscriptions2.length;_i4++){var subscription=_this$subscriptions2[_i4];
subscription.listener();
}
};return PSModel;}();var









PSStreamModel=function(){function PSStreamModel(){this.
subscriptions=[];this.
updates=[];}var _proto4=PSStreamModel.prototype;_proto4.
subscribe=function subscribe(listener){

var subscription=new PSSubscription(this,listener);
this.subscriptions.push(subscription);
if(this.updates.length){for(var _i6=0,_this$updates2=
this.updates;_i6<_this$updates2.length;_i6++){var update=_this$updates2[_i6];
subscription.listener(update);
}
this.updates=[];
}
return subscription;
};_proto4.
subscribeAndRun=function subscribeAndRun(listener){
var subscription=this.subscribe(listener);
subscription.listener(null);
return subscription;
};_proto4.
update=function update(value){
if(!this.subscriptions.length){

this.updates.push(value);
}for(var _i8=0,_this$subscriptions4=
this.subscriptions;_i8<_this$subscriptions4.length;_i8++){var subscription=_this$subscriptions4[_i8];
subscription.listener(value);
}
};return PSStreamModel;}();var


PSIcon=function(_preact$Component){function PSIcon(){return _preact$Component.apply(this,arguments)||this;}_inheritsLoose(PSIcon,_preact$Component);var _proto5=PSIcon.prototype;_proto5.


render=function render(){
if(this.props.pokemon){
return preact.h("span",{
"class":"picon",
style:{background:Dex.getPokemonIcon(this.props.pokemon).replace('background:','')}}
);
}else if(this.props.item){
return preact.h("span",{
className:"itemicon",
style:{background:Dex.getItemIcon(this.props.item).replace('background:','')}}
);
}else if(this.props.type){
var type=Dex.types.get(this.props.type).name;
if(!type)type='???';
var sanitizedType=type.replace(/\?/g,'%3f');
return preact.h("img",{
src:Dex.resourcePrefix+"sprites/types/"+sanitizedType+".png",
alt:this.props.hideAlt?undefined:type,
height:"14",
width:"32",
"class":"pixelated"}
);
}else if(this.props.category){
var categoryID=toID(this.props.category);
var sanitizedCategory='';
switch(categoryID){
case'physical':
case'special':
case'status':
sanitizedCategory=categoryID.charAt(0).toUpperCase()+categoryID.slice(1);
break;
default:
sanitizedCategory='undefined';
break;
}
return preact.h("img",{
src:Dex.resourcePrefix+"sprites/categories/"+sanitizedCategory+".png",
alt:this.props.hideAlt?undefined:sanitizedCategory,
height:"14",
width:"32",
"class":"pixelated"}
);
}else{
return preact.h("span",null);
}
};return PSIcon;}(preact.Component);











function unpackTeam(buf){
if(!buf)return[];

var team=[];for(var _i10=0,_buf$split2=

buf.split("]");_i10<_buf$split2.length;_i10++){var setBuf=_buf$split2[_i10];
var parts=setBuf.split("|");
if(parts.length<11)continue;
var set={species:'',moves:[]};
team.push(set);


set.name=parts[0];


set.species=Dex.species.get(parts[1]).name||set.name;


set.item=Dex.items.get(parts[2]).name;


var species=Dex.species.get(set.species);
set.ability=
parts[3]==='-'?'':
species.baseSpecies==='Zygarde'&&parts[3]==='H'?'Power Construct':
['','0','1','H','S'].includes(parts[3])?
species.abilities[parts[3]||'0']||(parts[3]===''?'':'!!!ERROR!!!'):
Dex.abilities.get(parts[3]).name;


set.moves=parts[4].split(',').map(function(moveid){return(
Dex.moves.get(moveid).name);}
);


set.nature=parts[5];
if(set.nature==='undefined')set.nature=undefined;


if(parts[6]){
if(parts[6].length>5){
var evs=parts[6].split(',');
set.evs={
hp:Number(evs[0])||0,
atk:Number(evs[1])||0,
def:Number(evs[2])||0,
spa:Number(evs[3])||0,
spd:Number(evs[4])||0,
spe:Number(evs[5])||0
};
}else if(parts[6]==='0'){
set.evs={hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
}
}


if(parts[7])set.gender=parts[7];


if(parts[8]){
var ivs=parts[8].split(',');
set.ivs={
hp:ivs[0]===''?31:Number(ivs[0]),
atk:ivs[1]===''?31:Number(ivs[1]),
def:ivs[2]===''?31:Number(ivs[2]),
spa:ivs[3]===''?31:Number(ivs[3]),
spd:ivs[4]===''?31:Number(ivs[4]),
spe:ivs[5]===''?31:Number(ivs[5])
};
}


if(parts[9])set.shiny=true;


if(parts[10])set.level=parseInt(parts[9],10);


if(parts[11]){
var misc=parts[11].split(',');
set.happiness=misc[0]?Number(misc[0]):undefined;
set.hpType=misc[1];
set.pokeball=misc[2];
set.gigantamax=!!misc[3];
set.dynamaxLevel=misc[4]?Number(misc[4]):10;
set.teraType=misc[5];
}
}

return team;
}var

MiniTeam=function(_preact$Component2){function MiniTeam(){return _preact$Component2.apply(this,arguments)||this;}_inheritsLoose(MiniTeam,_preact$Component2);var _proto6=MiniTeam.prototype;_proto6.
render=function render(){
var team=this.props.team;
return preact.h(preact.Fragment,null,
preact.h("a",{
"class":"team",
style:{color:'black',textDecoration:'none'},
href:"/view/"+team.teamid+(team["private"]?"-"+team["private"]:'')},

preact.h("strong",null,
team.name||team.title||"Untitled "+team.teamid,
team["private"]?preact.h(preact.Fragment,null," ",preact.h("i",{"class":"fa fa-lock"})):preact.h(preact.Fragment,null)
),
preact.h("br",null),
preact.h("small",null,
(this.props.fullTeam?
unpackTeam(team.team).map(function(x){return x.species;}):
team.team.split(',')).
map(function(x){return preact.h(PSIcon,{pokemon:x});})||preact.h("em",null,"(Empty team)")
)
)
);
};return MiniTeam;}(preact.Component);


function getShowdownUsername(){
var vals=document.cookie.split(';');for(var _i12=0;_i12<
vals.length;_i12++){var cookie=vals[_i12];
var _cookie$split=cookie.split('='),part=_cookie$split[0],rest=_cookie$split.slice(1);
var data=decodeURIComponent(rest.join('='));
if(toID(part)==='showdownusername'||toID(part)==='sid'){
return data.split(',')[0];
}
}
return null;
}
//# sourceMappingURL=utils.js.map