const $ = (s) => document.querySelector(s);

window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("hide"), 700);
});

const modal = $("#letterModal");
$("#openLetter").addEventListener("click", () => modal.classList.add("open"));
$("#closeLetter").addEventListener("click", () => modal.classList.remove("open"));
$("#modalClose").addEventListener("click", () => modal.classList.remove("open"));
$("#modalContinue").addEventListener("click", () => {
  modal.classList.remove("open");
  document.querySelector(".memories").scrollIntoView({behavior:"smooth"});
});

function heartBurst(count=28){
  for(let i=0;i<count;i++){
    const h=document.createElement("div");
    h.className="heart-float";
    h.textContent=["♥","♡","✦"][Math.floor(Math.random()*3)];
    h.style.left=(Math.random()*100)+"vw";
    h.style.bottom=(8+Math.random()*18)+"vh";
    h.style.fontSize=(12+Math.random()*28)+"px";
    h.style.animationDelay=(Math.random()*.35)+"s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),2500);
  }
}
$("#celebrate").addEventListener("click",()=>{
  heartBurst(55);
  const toast=$("#toast"); toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2400);
});

let audioCtx, master, playing=false, timer;
function startVibe(){
  audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
  master = master || audioCtx.createGain();
  master.gain.value=.045;
  master.connect(audioCtx.destination);
  const notes=[261.63,329.63,392,523.25,392,329.63];
  let idx=0;
  const playNote=()=>{
    if(!playing)return;
    const osc=audioCtx.createOscillator(), g=audioCtx.createGain();
    osc.type="sine"; osc.frequency.value=notes[idx++%notes.length];
    g.gain.setValueAtTime(0,audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(.16,audioCtx.currentTime+.05);
    g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+1.2);
    osc.connect(g);g.connect(master);osc.start();osc.stop(audioCtx.currentTime+1.25);
  };
  playNote(); timer=setInterval(playNote,700);
}
$("#musicBtn").addEventListener("click",()=>{
  playing=!playing;
  if(playing){
    startVibe();
    $("#musicText").textContent="Vibe on";
    heartBurst(8);
  }else{
    clearInterval(timer);
    if(master) master.gain.setTargetAtTime(0,audioCtx.currentTime,.08);
    $("#musicText").textContent="Play our vibe";
  }
});

// subtle floating particles
const canvas=$("#particles"), ctx=canvas.getContext("2d");
let dots=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;dots=Array.from({length:45},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+.3,s:Math.random()*.25+.05,a:Math.random()}))}
resize(); addEventListener("resize",resize);
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach(d=>{d.y-=d.s;if(d.y<0)d.y=innerHeight;d.a+=.01;ctx.globalAlpha=.12+.08*Math.sin(d.a);ctx.fillStyle="#f4a8b8";ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill()});
  requestAnimationFrame(draw);
}
draw();
