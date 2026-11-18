/* eslint-disable */
// Behaviour of the Web & App landing page (from the approved HTML preview):
// WhatsApp links, quote wizard, scroll recordings, reveal-on-scroll.
export function initWebLanding() {

(function(){
  var WA = "918928186991";
  function waUrl(msg){ return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $(s, r){ return (r||document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }

  // Every WhatsApp link gets its own message.
  $$("[data-wa]").forEach(function(a){ a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });

  var leadDone = false;
  function validPhone(v){ return /^[6-9]\d{9}$/.test(v.replace(/\D/g, "")); }
  $$('input[inputmode="numeric"]').forEach(function(i){ i.addEventListener("input", function(){ i.value = i.value.replace(/\D/g, "").slice(0, 10); }); });

  // In the live site this also saves the lead (Google Sheet / email / CRM) before showing WhatsApp,
  // so a lead is captured even if the visitor never presses Send.
  function showDone(box, form, lead, heading){
    leadDone = true;
    var lines = ["Hi Dibiz Studio, I'd like a quote.", "Name: " + lead.name, "WhatsApp: +91 " + lead.phone];
    if (lead.service) lines.push("Service: " + lead.service);
    if (lead.budget) lines.push("Budget: " + lead.budget);
    if (lead.timeline) lines.push("Launch: " + lead.timeline);
    if (lead.brand) lines.push("Brand: " + lead.brand);
    if (lead.site) lines.push("Website: " + lead.site);
    if (lead.notes) lines.push("Notes: " + lead.notes);
    box.innerHTML =
      '<div class="check"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>' +
      '<h3>' + heading + ', ' + lead.name.split(" ")[0].replace(/</g, "") + '!</h3>' +
      '<p>We\'ve got your details. Tap below to send them on WhatsApp and get a faster reply.</p>' +
      '<a class="w-btn btn-wa btn-block" target="_blank" rel="noopener" href="' + waUrl(lines.join("\n")) + '"><svg width="20" height="20"><use href="#i-wa"/></svg>Send on WhatsApp</a>';
    form.style.display = "none"; box.classList.add("show");
    try { console.log("[lead]", lead); } catch(e){}
  }

  // Hero form
  var hf = $("#hero-form");
  hf.addEventListener("submit", function(e){
    e.preventDefault();
    var name = $("#h-name").value.trim(), phone = $("#h-phone").value, service = $("#h-service").value;
    var err = !name ? "Please enter your name." : !validPhone(phone) ? "Please enter a valid 10-digit WhatsApp number." : !service ? "Please choose what you need." : "";
    $("#h-err").textContent = err; if (err) return;
    showDone($("#hero-done"), hf, {name:name, phone:phone, service:service}, "Thank you");
  });

  // Mid-page form after the portfolio
  var mf = $("#mid-form");
  mf.addEventListener("submit", function(e){
    e.preventDefault();
    var name = $("#m-name").value.trim(), phone = $("#m-phone").value;
    var err = !name ? "Please enter your name." : !validPhone(phone) ? "Please enter a valid 10-digit WhatsApp number." : "";
    $("#m-err").textContent = err; if (err) return;
    showDone($("#mid-done"), mf, {name:name, phone:phone, service:"Website ideas (saw your portfolio)"}, "Thank you");
  });

  // Quote wizard
  var step = 1, total = 4, wiz = $("#wiz");
  function render(){
    $$(".wstep", wiz).forEach(function(f){ f.classList.toggle("active", +f.dataset.step === step); });
    $$(".progress i", wiz).forEach(function(b, i){ b.classList.toggle("on", i < step); });
    $("#w-back").hidden = step === 1;
    $("#w-next").textContent = step === total ? "Connect with us →" : "Next →";
    $("#w-err").textContent = "";
  }
  function picked(n){ var c = $('input[name="' + n + '"]:checked', wiz); return c ? c.value : ""; }
  $("#w-next").addEventListener("click", function(){
    var need = {1:"service", 2:"budget", 3:"timeline"}[step];
    if (need && !picked(need)) { $("#w-err").textContent = "Please choose one option to continue."; return; }
    if (step < total) { step++; render(); return; }
    var name = $("#w-name").value.trim(), phone = $("#w-phone").value;
    if (!name) { $("#w-err").textContent = "Please enter your name."; return; }
    if (!validPhone(phone)) { $("#w-err").textContent = "Please enter a valid 10-digit WhatsApp number."; return; }
    showDone($("#wiz-done"), wiz, {name:name, phone:phone, service:picked("service"), budget:picked("budget"), timeline:picked("timeline"),
      brand:$("#w-brand").value.trim(), site:$("#w-site").value.trim(), notes:$("#w-notes").value.trim()}, "Your quote request is in");
  });
  $("#w-back").addEventListener("click", function(){ if (step > 1) { step--; render(); } });
  // Auto-advance after picking an option.
  $$('.wstep[data-step="1"] input, .wstep[data-step="2"] input, .wstep[data-step="3"] input', wiz).forEach(function(r){
    r.addEventListener("change", function(){ setTimeout(function(){ if (step < total) { step++; render(); } }, 220); });
  });

  // Service buttons preselect the service in the wizard.
  $$("[data-service]").forEach(function(a){
    a.addEventListener("click", function(){
      var r = $('input[data-key="' + a.dataset.service + '"]', wiz);
      if (r) { r.checked = true; step = 2; render(); }
    });
  });

  // Exit intent: desktop when the cursor leaves through the top, mobile after 35s on the page. Once per visit.
  var modal = $("#exit"), shown = false;
  function seen(){ try { return sessionStorage.getItem("dz_exit") === "1"; } catch(e){ return false; } }
  function openExit(){
    if (shown || leadDone || seen()) return;
    shown = true; modal.classList.add("open");
    try { sessionStorage.setItem("dz_exit", "1"); } catch(e){}
    setTimeout(function(){ $("#e-name").focus(); }, 50);
  }
  function closeExit(){ modal.classList.remove("open"); }
  document.addEventListener("mouseout", function(e){ if (!e.relatedTarget && e.clientY <= 0) openExit(); });
  if (window.matchMedia("(max-width:680px)").matches) setTimeout(openExit, 35000);
  $("#exit-close").addEventListener("click", closeExit);
  modal.addEventListener("click", function(e){ if (e.target === modal) closeExit(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeExit(); });
  $("#exit-form").addEventListener("submit", function(e){
    e.preventDefault();
    var name = $("#e-name").value.trim(), phone = $("#e-phone").value;
    var err = !name ? "Please enter your name." : !validPhone(phone) ? "Please enter a valid 10-digit WhatsApp number." : "";
    $("#e-err").textContent = err; if (err) return;
    showDone($("#exit-done"), $("#exit-form"), {name:name, phone:phone, service:"Wants to connect (exit popup)"}, "Thank you");
  });
})();


/* Live scroll "screen recordings": a full-page capture scrolls inside a browser frame,
   down and back up, only while visible. Hover (or tap) pauses it. */
(function(){
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var players = [];
  function fmt(s){ s = Math.floor(s); return "REC " + String(Math.floor(s/60)).padStart(2,"0") + ":" + String(s%60).padStart(2,"0"); }
  function setup(rec){
    var badge = document.createElement("span"); badge.className = "recbadge"; badge.innerHTML = "<i></i><span>REC 00:00</span>";
    var bar = document.createElement("span"); bar.className = "recbar"; bar.innerHTML = "<b></b>";
    rec.appendChild(badge); rec.appendChild(bar);
    var label = badge.querySelector("span"), fill = bar.querySelector("b");
    var p = {rec:rec, visible:false, hover:false, anim:null, t0:performance.now(), elapsed:0};
    var tall = rec.querySelector(".tall");
    var slides = rec.querySelectorAll(".sl");
    if (tall){
      var build = function(){
        var d = tall.offsetHeight - rec.clientHeight; if (d <= 0) return;
        var down = Math.max(6000, d / (rec.clientWidth * 0.22) * 1000);
        var total = down * 2 + 3200;
        if (p.anim) p.anim.cancel();
        p.anim = tall.animate([
          {transform:"translateY(0)", offset:0},
          {transform:"translateY(0)", offset:1200/total, easing:"cubic-bezier(.45,.05,.55,.95)"},
          {transform:"translateY(-" + d + "px)", offset:(1200+down)/total},
          {transform:"translateY(-" + d + "px)", offset:(2000+down)/total, easing:"cubic-bezier(.45,.05,.55,.95)"},
          {transform:"translateY(0)", offset:(2000+down*2)/total},
          {transform:"translateY(0)", offset:1}
        ], {duration: total, iterations: Infinity});
        p.anim.pause(); sync();
      };
      if (tall.complete) build(); else tall.addEventListener("load", build);
      window.addEventListener("resize", function(){ clearTimeout(p.rt); p.rt = setTimeout(build, 200); });
    } else if (slides.length){
      var i = 0; slides[0].classList.add("on");
      p.tick = function(){ slides[i].classList.remove("on"); i = (i + 1) % slides.length; slides[i].classList.add("on"); };
    }
    function playing(){ return p.visible && !p.hover && !reduce; }
    function sync(){
      rec.classList.toggle("paused", !playing());
      if (p.anim){ playing() ? p.anim.play() : p.anim.pause(); }
      if (p.tick){ clearInterval(p.iv); if (playing()) p.iv = setInterval(p.tick, 2600); }
    }
    p.sync = sync;
    rec.addEventListener("mouseenter", function(){ p.hover = true; sync(); });
    rec.addEventListener("mouseleave", function(){ p.hover = false; sync(); });
    var last = performance.now();
    (function loop(now){
      if (playing()) p.elapsed += (now - last) / 1000;
      last = now;
      label.textContent = fmt(p.elapsed);
      if (p.anim && p.anim.effect){ var c = p.anim.effect.getComputedTiming(); fill.style.width = ((c.progress || 0) * 100) + "%"; }
      else if (slides.length){ var on = Array.prototype.indexOf.call(slides, rec.querySelector(".sl.on")); fill.style.width = ((on + 1) / slides.length * 100) + "%"; }
      requestAnimationFrame(loop);
    })(last);
    players.push(p);
  }
  Array.prototype.forEach.call(document.querySelectorAll(".rec"), setup);
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ players.forEach(function(p){ if (p.rec === e.target){ p.visible = e.isIntersecting; p.sync(); } }); });
    }, {threshold:.25});
    players.forEach(function(p){ io.observe(p.rec); });
  } else players.forEach(function(p){ p.visible = true; p.sync(); });
})();


(function(){
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.querySelector(".nav");
  function onScroll(){ if (nav) nav.classList.toggle("scrolled", scrollY > 20); }
  addEventListener("scroll", onScroll, {passive:true}); onScroll();
  if (reduce || !("IntersectionObserver" in window)) return;
  var fresh = !document.querySelector(".rv");
  if (fresh) document.querySelector(".lpw").classList.add("js");
  var sel = fresh ? ".sec-head,.res,.svc,.why,.w-step,.story,.cn-box,.wizard,.faq details,.final-box,.midcap,.wp,.inc,.cmp,.pcard,.feature" : ".cn-box";
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }); }, {rootMargin:"0px 0px -8% 0px"});
  Array.prototype.forEach.call(document.querySelectorAll(sel), function(el){ var i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0; el.classList.add("rv"); el.style.transitionDelay = Math.min(i,4)*60 + "ms"; io.observe(el); });
})();

}
