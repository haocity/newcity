/*! 
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */
!function(t){function e(e,r,a){var o=this
return this.on("click.pjax",e,function(e){var i=t.extend({},m(r,a))
i.container||(i.container=t(this).attr("data-pjax")||o),n(e,i)})}function n(e,n,r){r=m(n,r)
var o=e.currentTarget
if("A"!==o.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element"
if(!(e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.protocol!==o.protocol||location.hostname!==o.hostname||o.href.indexOf("#")>-1&&h(o)==h(location)||e.isDefaultPrevented())){var i={url:o.href,container:t(o).attr("data-pjax"),target:o},c=t.extend({},i,r),s=t.Event("pjax:click")
t(o).trigger(s,[c]),s.isDefaultPrevented()||(a(c),e.preventDefault(),t(o).trigger("pjax:clicked",[c]))}}function r(e,n,r){r=m(n,r)
var o=e.currentTarget,i=t(o)
if("FORM"!==o.tagName.toUpperCase())throw"$.pjax.submit requires a form element"
var c={type:(i.attr("method")||"GET").toUpperCase(),url:i.attr("action"),container:i.attr("data-pjax"),target:o}
if("GET"!==c.type&&void 0!==window.FormData)c.data=new FormData(o),c.processData=!1,c.contentType=!1
else{if(t(o).find(":file").length)return
c.data=t(o).serializeArray()}a(t.extend({},c,r)),e.preventDefault()}function a(e){function n(e,n,a){a||(a={}),a.relatedTarget=r
var o=t.Event(e,a)
return c.trigger(o,n),!o.isDefaultPrevented()}e=t.extend(!0,{},t.ajaxSettings,a.defaults,e),t.isFunction(e.url)&&(e.url=e.url())
var r=e.target,o=d(e.url).hash,c=e.context=v(e.container)
e.data||(e.data={}),t.isArray(e.data)?e.data.push({name:"_pjax",value:c.selector}):e.data._pjax=c.selector
var s
e.beforeSend=function(t,r){if("GET"!==r.type&&(r.timeout=0),t.setRequestHeader("X-PJAX","true"),t.setRequestHeader("X-PJAX-Container",c.selector),!n("pjax:beforeSend",[t,r]))return!1
r.timeout>0&&(s=setTimeout(function(){n("pjax:timeout",[t,e])&&t.abort("timeout")},r.timeout),r.timeout=0)
var a=d(r.url)
o&&(a.hash=o),e.requestUrl=f(a)},e.complete=function(t,r){s&&clearTimeout(s),n("pjax:complete",[t,r,e]),n("pjax:end",[t,e])},e.error=function(t,r,a){var o=j("",t,e),c=n("pjax:error",[t,r,a,e])
"GET"==e.type&&"abort"!==r&&c&&i(o.url)},e.success=function(r,s,u){var p=a.state,f="function"==typeof t.pjax.defaults.version?t.pjax.defaults.version():t.pjax.defaults.version,h=u.getResponseHeader("X-PJAX-Version"),m=j(r,u,e),v=d(m.url)
if(o&&(v.hash=o,m.url=v.href),f&&h&&f!==h)return void i(m.url)
if(!m.contents)return void i(m.url)
a.state={id:e.id||l(),url:m.url,title:m.title,container:c.selector,fragment:e.fragment,timeout:e.timeout},(e.push||e.replace)&&window.history.replaceState(a.state,m.title,m.url)
var x=t.contains(e.container,document.activeElement)
if(x)try{document.activeElement.blur()}catch(g){}m.title&&(document.title=m.title),n("pjax:beforeReplace",[m.contents,e],{state:a.state,previousState:p}),c.html(m.contents)
var w=c.find("input[autofocus], textarea[autofocus]").last()[0]
w&&document.activeElement!==w&&w.focus(),y(m.scripts)
var b=e.scrollTo
if(o){var T=decodeURIComponent(o.slice(1)),E=document.getElementById(T)||document.getElementsByName(T)[0]
E&&(b=t(E).offset().top)}"number"==typeof b&&t(window).scrollTop(b),n("pjax:success",[r,s,u,e])},a.state||(a.state={id:l(),url:window.location.href,title:document.title,container:c.selector,fragment:e.fragment,timeout:e.timeout},window.history.replaceState(a.state,document.title)),u(a.xhr),a.options=e
var h=a.xhr=t.ajax(e)
return h.readyState>0&&(e.push&&!e.replace&&(w(a.state.id,p(c)),window.history.pushState(null,"",e.requestUrl)),n("pjax:start",[h,e]),n("pjax:send",[h,e])),a.xhr}function o(e,n){var r={url:window.location.href,push:!1,replace:!0,scrollTo:!1}
return a(t.extend(r,m(e,n)))}function i(t){window.history.replaceState(null,"",a.state.url),window.location.replace(t)}function c(e){C||u(a.xhr)
var n,r=a.state,o=e.state
if(o&&o.container){if(C&&A==o.url)return
if(r){if(r.id===o.id)return
n=r.id<o.id?"forward":"back"}var c=R[o.id]||[],s=t(c[0]||o.container),l=c[1]
if(s.length){r&&b(n,r.id,p(s))
var f=t.Event("pjax:popstate",{state:o,direction:n})
s.trigger(f)
var d={id:o.id,url:o.url,container:s,push:!1,fragment:o.fragment,timeout:o.timeout,scrollTo:!1}
if(l){s.trigger("pjax:start",[null,d]),a.state=o,o.title&&(document.title=o.title)
var h=t.Event("pjax:beforeReplace",{state:o,previousState:r})
s.trigger(h,[l,d]),s.html(l),s.trigger("pjax:end",[null,d])}else a(d)
s[0].offsetHeight}else i(location.href)}C=!1}function s(e){var n=t.isFunction(e.url)?e.url():e.url,r=e.type?e.type.toUpperCase():"GET",a=t("<form>",{method:"GET"===r?"GET":"POST",action:n,style:"display:none"})
"GET"!==r&&"POST"!==r&&a.append(t("<input>",{type:"hidden",name:"_method",value:r.toLowerCase()}))
var o=e.data
if("string"==typeof o)t.each(o.split("&"),function(e,n){var r=n.split("=")
a.append(t("<input>",{type:"hidden",name:r[0],value:r[1]}))})
else if(t.isArray(o))t.each(o,function(e,n){a.append(t("<input>",{type:"hidden",name:n.name,value:n.value}))})
else if("object"==typeof o){var i
for(i in o)a.append(t("<input>",{type:"hidden",name:i,value:o[i]}))}t(document.body).append(a),a.submit()}function u(e){e&&e.readyState<4&&(e.onreadystatechange=t.noop,e.abort())}function l(){return(new Date).getTime()}function p(t){var e=t.clone()
return e.find("script").each(function(){this.src||jQuery._data(this,"globalEval",!1)}),[t.selector,e.contents()]}function f(t){return t.search=t.search.replace(/([?&])(_pjax|_)=[^&]*/g,""),t.href.replace(/\?($|#)/,"$1")}function d(t){var e=document.createElement("a")
return e.href=t,e}function h(t){return t.href.replace(/#.*/,"")}function m(e,n){return e&&n?n.container=e:n=t.isPlainObject(e)?e:{container:e},n.container&&(n.container=v(n.container)),n}function v(e){if(e=t(e),e.length){if(""!==e.selector&&e.context===document)return e
if(e.attr("id"))return t("#"+e.attr("id"))
throw"cant get selector for pjax container!"}throw"no pjax container for "+e.selector}function x(t,e){return t.filter(e).add(t.find(e))}function g(e){return t.parseHTML(e,document,!0)}function j(e,n,r){var a={},o=/<html/i.test(e),i=n.getResponseHeader("X-PJAX-URL")
if(a.url=i?f(d(i)):r.requestUrl,o)var c=t(g(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),s=t(g(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))
else var c=s=t(g(e))
if(0===s.length)return a
if(a.title=x(c,"title").last().text(),r.fragment){if("body"===r.fragment)var u=s
else var u=x(s,r.fragment).first()
u.length&&(a.contents="body"===r.fragment?u:u.contents(),a.title||(a.title=u.attr("title")||u.data("title")))}else o||(a.contents=s)
return a.contents&&(a.contents=a.contents.not(function(){return t(this).is("title")}),a.contents.find("title").remove(),a.scripts=x(a.contents,"script[src]").remove(),a.contents=a.contents.not(a.scripts)),a.title&&(a.title=t.trim(a.title)),a}function y(e){if(e){var n=t("script[src]")
e.each(function(){var e=this.src,r=n.filter(function(){return this.src===e})
if(!r.length){var a=document.createElement("script"),o=t(this).attr("type")
o&&(a.type=o),a.src=t(this).attr("src"),document.head.appendChild(a)}})}}function w(t,e){R[t]=e,X.push(t),T(U,0),T(X,a.defaults.maxCacheLength)}function b(t,e,n){var r,o
R[e]=n,"forward"===t?(r=X,o=U):(r=U,o=X),r.push(e),(e=o.pop())&&delete R[e],T(r,a.defaults.maxCacheLength)}function T(t,e){for(;t.length>e;)delete R[t.shift()]}function E(){return t("meta").filter(function(){var e=t(this).attr("http-equiv")
return e&&"X-PJAX-VERSION"===e.toUpperCase()}).attr("content")}function S(){t.fn.pjax=e,t.pjax=a,t.pjax.enable=t.noop,t.pjax.disable=P,t.pjax.click=n,t.pjax.submit=r,t.pjax.reload=o,t.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:E},t(window).on("popstate.pjax",c)}function P(){t.fn.pjax=function(){return this},t.pjax=s,t.pjax.enable=S,t.pjax.disable=t.noop,t.pjax.click=t.noop,t.pjax.submit=t.noop,t.pjax.reload=function(){window.location.reload()},t(window).off("popstate.pjax",c)}var C=!0,A=window.location.href,D=window.history.state
D&&D.container&&(a.state=D),"state"in window.history&&(C=!1)
var R={},U=[],X=[]
t.inArray("state",t.event.props)<0&&t.event.props.push("state"),t.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/),t.support.pjax?S():P()}(jQuery)
