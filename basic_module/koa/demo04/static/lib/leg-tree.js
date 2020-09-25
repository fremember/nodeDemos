((global)=>{$.fn.extend({uuid(){var s=[];var hexDigits="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var i=0;i<8;i++){s[i]=hexDigits.substr(Math.floor(Math.random()*0x30),1);}
var uuid=s.join("");return uuid;},tree(data,arrs){var tree=this;$(tree).on("click",".isShow",function(){let that=this;isShow(that);})
function isShow(that){if($(that).parent().find("ul").is(":visible")){$(that).parent().find("ul").hide();$(that).attr("style",'transform:rotate(-90deg)');}else{if($(that).parent().find("ul").length>0){$(that).attr("style",'transform:rotate(0deg)');}else{$(that).attr("style",'opacity: 0;');}
$(that).parent().find("ul").show();}}
function checkParent(param){if($(param).is(':checked')){$(param).parent().parent().prev().prev().prev().prev().prop("checked",'true');}else{var temp=$(param).parent().parent().find("input");var isChecked=false;$.each(temp,function(index,item){if(item.checked){isChecked=true;}});if(!isChecked){$(param).parent().parent().prev().prev().prev().prev().removeAttr("checked");}}
var asd=$(param).parent().parent().prev().prev().prev().prev()[0];if(asd!=undefined){checkParent(asd)}
return;}
function checkChildren(param){if(param.checked){$(param).next().next().next().next().children().find("input").prop("checked",'true');}else{$(param).next().next().next().next().children().find("input").removeAttr("checked");}}
$(tree).on("click","input",function(){if(data[0].cascade){checkChildren(this);checkParent(this);}})
$(tree).on("click","a",function(){if($(this).prev().prev().prev()[0].checked){$(this).prev().prev().prev().removeAttr("checked");}else{$(this).prev().prev().prev().prop("checked",'true');}
if(data[0].cascade){checkChildren($(this).prev().prev().prev()[0]);checkParent($(this).prev().prev().prev()[0]);}})
const insert=(children,arr)=>{for(var a in arr){if(children.id==arr[a]){children.checked=true}}}
function setCheckedNodes(data,arrs){for(let x in data){let children=data[x].children;if(children!=null){for(let y in children){insert(children[y],arrs)
setCheckedNodes(children,arrs);}}else{return;}}}
var ids=0;var uuid=$(this).uuid();function createTree(data){var str='<ul>';for(var i=0;i<data.length;i++){ids++;str+='<li><img class="isShow" src="/img/minus.png" />'
if(data[i].checked==true){str+='<input id="'+uuid+ids+'" type="checkbox" checked '+
'data-show="'+data[i].open+'" value="'+data[i].id+'"/>'}else{str+='<input id="'+uuid+ids+'" type="checkbox" '+
'data-show="'+data[i].open+'" value="'+data[i].id+'"/>'}
str+='<label class="label" for="'+
uuid+ids+'"/><i class="'+data[i].ico+'"/><a href="#">'+data[i].name+'</a>';if(data[i].children&&data[i].children!=''){str+=createTree(data[i].children);}
str+='</li>';};str+='</ul>';return str;};if(arrs.constructor==Array){setCheckedNodes(data,arrs);}
$(tree).html(createTree(data));$.each($("input:checkbox:checked"),function(){checkParent(this)});$.each($("input"),function(){if(this.getAttribute('data-show')=='false'){$(this).parent().find("ul").hide();$(this).prev()[0].setAttribute("style",'transform:rotate(-90deg)');}else{$(this).parent().find("ul").show();if($(this).parent().find("ul").length>0){$(this).prev()[0].setAttribute("style",'transform:rotate(0deg)');}else{$(this).prev()[0].setAttribute("style",'opacity: 0;');}}});},})
$.extend({getCheckedNodes(){var arr=[]
$.each($('input:checkbox:checked'),function(){let temp=$(this).val();if(temp!=""&&temp!="undefined"){arr.push($(this).val())}});return arr;}});global.leg=global.$=$;})(window)