"use strict";function _inheritsLoose(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,_setPrototypeOf(t,o);}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t;},_setPrototypeOf(t,e);}var







TeamIndex=function(_preact$Component){






function TeamIndex(props){var _this;
_this=_preact$Component.call(this,props)||this;_this.state={teams:[],loggedIn:false,loading:true,search:null};
_this.loadTeams();return _this;
}_inheritsLoose(TeamIndex,_preact$Component);var _proto=TeamIndex.prototype;_proto.
loadTeams=function loadTeams(){var _this2=this;
void Net('/api/getteams').get({query:{full:1}}).then(function(resultText){
if(resultText.startsWith(']'))resultText=resultText.slice(1);
var result;
try{
result=JSON.parse(resultText);
}catch(_unused){
result={actionerror:"Malformed response received. Try again later."};
}
_this2.setState(Object.assign({},result,{loading:false}));
});
};_proto.

onInput=function onInput(_ref){var currentTarget=_ref.currentTarget;
this.setState({search:currentTarget.value});
};_proto.
searchMatch=function searchMatch(team){
var s=toID(this.state.search);
if(!s)return true;
if(!toID(this.state.search))return true;
if(toID(team.name).includes(s))return true;
if(toID(team.format).includes(s))return true;
if(team.team.split(',').map(toID).some(function(x){return x.includes(s);}))return true;
if((""+team.teamid).startsWith(s))return true;
return false;
};_proto.
render=function render(){var _this3=this;
if(this.state.loading){
return preact.h("div",{"class":"section",style:{wordWrap:'break-word'}},"Loading...");
}
var teamsByFormat={};
var i=0;for(var _i2=0,_this$state$teams2=
this.state.teams;_i2<_this$state$teams2.length;_i2++){var team=_this$state$teams2[_i2];


if(!this.searchMatch(team))continue;
if(!teamsByFormat[team.format])teamsByFormat[team.format]=[];
teamsByFormat[team.format].push(team);
i++;
}
return preact.h("div",{"class":"section",style:{wordWrap:'break-word'}},
preact.h("h2",null,"Hi, ",this.state.loggedIn||"guest","!"),
preact.h("label",null,"Upload a new team: "),
preact.h("a",{"class":"button",href:"//"+Config.routes.client+"/view-teams-upload"},"Go"),preact.h("br",null),preact.h("br",null),
preact.h("label",null,"Search all teams:")," ",preact.h("a",{"class":"button",href:"/search/"},"Go"),preact.h("br",null),preact.h("br",null),
preact.h("label",null,"Search your teams (",i,"): "),
preact.h("input",{value:this.state.search||"",onInput:function(e){return _this3.onInput(e);},label:"Search teams/formats"}),
preact.h("hr",null),
!this.state.teams.length?
preact.h("em",null,"You have no teams lol"):
Object.entries(teamsByFormat).map(function(_ref2){var format=_ref2[0],teams=_ref2[1];return(
preact.h(preact.Fragment,null,preact.h("h4",null,format,":"),
preact.h("ul",{"class":"teamlist"},
teams.map(function(team){return preact.h("li",null,preact.h(MiniTeam,{team:team}));})
),
preact.h("hr",null)));}
)
);
};return TeamIndex;}(preact.Component);
//# sourceMappingURL=teams-index.js.map