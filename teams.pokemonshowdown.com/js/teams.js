"use strict";








var PSRouter=new(function(){function _class(){this.
routes={};}var _proto=_class.prototype;_proto.

setRoutes=function setRoutes(routes){
Object.assign(this.routes,routes);
};_proto.


redir=function redir(path){
location.href=path;
};_proto.

go=function go(){
var params=location.pathname.split('/');
var args={};
var Element;
for(var k in this.routes){
var matched=false;
var routeParts=k.split('/');
for(var i=0;i<routeParts.length;i++){var _routeParts$i;
var part=params[i];
if(routeParts[i].startsWith('?')){
routeParts[i]=routeParts[i].slice(1);
if(!part.trim())break;
}
if((_routeParts$i=routeParts[i])!=null&&_routeParts$i.startsWith(':')){
args[routeParts[i].slice(1)]=part;
continue;
}
if(part!==routeParts[i]){
matched=false;
args={};
break;
}else{
matched=true;
}
}
if(matched){
Element=this.routes[k];
break;
}
}
if(!Element){
this.redir('//'+Config.routes.teams+"/404.html");
}else{
preact.render(preact.h(Element,{args:args}),document.getElementById('main'));
}
};return _class;}())(
);

if(window.matchMedia!=null&&window.matchMedia('(prefers-color-scheme: dark)').matches){
localStorage.setItem('darkmode','true');
}
if(localStorage.getItem('darkmode')){var _document$querySelect;
(_document$querySelect=document.querySelector('html'))==null||_document$querySelect.classList.add('dark');
}

PSRouter.setRoutes({
'/view/:id':TeamViewer,
'/':TeamIndex,
'/search/?:type/?:val':TeamSearcher,
'/search':TeamSearcher,
'/browse':TeamSearcher
});
PSRouter.go();
//# sourceMappingURL=teams.js.map