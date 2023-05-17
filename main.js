// document.designMode = "on";

;window.$ = document.querySelector.bind(document);
window.$id = document.getElementById.bind(document);
window.$all = document.querySelectorAll.bind(document);
window.$create = document.createElement.bind(document);
window.$ls = window.localStorage;
window.$ss = window.sessionStorage;

window.classOf = (o)=>Object.prototype.toString.call(o).slice(8, -1);
window.task = (e)=>{
return new Promise((resolve, reject) => {
 if(classOf(e)!="Function"){
  resolve(e);
 } else {
  resolve(new Function(e)())
 }
  
});
};
window.delay = (milliseconds)=>new Promise(resolve=>setTimeout(resolve, milliseconds));
window.sha = async(arg=Date.now())=>await btoa(await String.fromCharCode(...new Uint8Array(await crypto.subtle.digest("SHA-512", (new TextEncoder().encode(decodeURIComponent(arg))))))).replace(/[\/=+]/g, "");
window.plainPaste = function(event){
  event.preventDefault();
  let paste = (event.clipboardData || window.clipboardData).getData("text");
  paste = paste;//.toUpperCase();
  const selection = window.getSelection();
  if (!selection.rangeCount) {return};
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(paste));
  selection.collapseToEnd();
};
// const originalConsoleLog = console.log;
Array.from(Object.keys(console)).filter(r=>r!="memory").map(r=>{window.originalConsoleLog = console[r].bind(console);})
function consoleLogProxy() { 
 originalConsoleLog.apply( console , arguments ); 
 document.getElementById( "container" ).innerHTML = `${ Array.prototype.slice.apply( arguments , [] ) .join( " " ) }<br>${ document.getElementById( "container" ).innerHTML }`; /*<br>${ document.getElementById( "container" ).innerHTML }*/
};
Array.from(Object.keys(console)).filter(r=>r!="memory").map(r=>{console[r] = consoleLogProxy});
// console.log = consoleLogProxy;
// window.log = console.log.bind(console);
$id("main").oninput = (evt)=>{
 // log(evt.target.innerText);
 location.hash = encodeURIComponent(evt.target.innerHTML);
 return new Function(evt.target.textContent)()
 
}
// $id("main").onpaste = (evt)=>{
//  plainPaste(evt);
// }
window.addEventListener("hashchange", (evt) => {
 //evt.target.innerText
 // console.log(evt.newURL.replace(location.origin+"/#",""))
 return new Function(decodeURIComponent(evt.newURL.replace(location.origin+"/#","")))()
});
// window.onload = (evt)=>{
//  evt.preventDefault();
 if(location.hash!=""){
  // jsbeautifier.beautify('your JavaScript string')
  $id("main").innerHTML = decodeURIComponent(location.hash.replace("#",""));
   // window.call($id("main").textContent)()
  // task(new Function($id("main").textContent))
  task(new Function($id("main").textContent)())
 }
// }

// $id("main").designMode = "on";
//  function _htmlNode(id,cl,node,t=Date.now()){
//         node = document.createElement("div");
//         node.id = id??t;
//         node.classList.add(cl??t);
//         return node
//     }


// let node = _htmlNode();

// document.body.insertBefore(node,document.getElementById( "container" ))
// should addContent before or even after element appended to document.
// console.log()

// node.innerHTML = "hello world2";
// node.innerHTML += "<br>";
// node.innerHTML += " hello world3";