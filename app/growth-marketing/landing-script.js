/* eslint-disable */
// Behaviour of the Growth Marketing landing page (from the approved HTML preview):
// WhatsApp links, reel player, case study tabs, industries slider, lead form, reveal-on-scroll.
export function initGrowthLanding() {
window.REELS=[{"id": "Dcy9cfFITzG", "brand": "Fuaark", "title": "Ads people actually want to watch", "kind": "Script based", "ig": "https://www.instagram.com/reel/Dcy9cfFITzG/"}, {"id": "DcnvQCCSykT", "brand": "XYXX", "title": "How do you make someone stop scrolling?", "kind": "Script based", "ig": "https://www.instagram.com/reel/DcnvQCCSykT/"}, {"id": "DbQwijaq3pu", "brand": "Aayush Wellness", "title": "Herbal Paan Masala digital ad film", "kind": "Script based", "ig": "https://www.instagram.com/reel/DbQwijaq3pu/"}, {"id": "DOiLOO4j9u5", "brand": "Signature", "title": "Meet the Tesla of Pants", "kind": "Talking head", "ig": "https://www.instagram.com/reel/DOiLOO4j9u5/"}, {"id": "DASbjpBSCiK", "brand": "Munchilicious", "title": "My morning routine, with a creator", "kind": "Trend hacking", "ig": "https://www.instagram.com/reel/DASbjpBSCiK/"}, {"id": "Dcsa4nUI_0H", "brand": "Fuaark", "title": "Performance ads that don't feel like ads", "kind": "Problem \u00b7 Agitate \u00b7 Solution", "ig": "https://www.instagram.com/reel/Dcsa4nUI-0H/"}, {"id": "DZpcx_nyxNf", "brand": "XYXX", "title": "Give her the gift of comfort", "kind": "Script based", "ig": "https://www.instagram.com/reel/DZpcx-nyxNf/"}, {"id": "DWtyuXnikaI", "brand": "bloomastra", "title": "We asked people on the street", "kind": "Trend hacking", "ig": "https://www.instagram.com/reel/DWtyuXnikaI/"}, {"id": "DX65TP3xp0_", "brand": "XYXX", "title": "When the office turns into a set", "kind": "Trend hacking", "ig": "https://www.instagram.com/reel/DX65TP3xp0-/"}, {"id": "DXWsx5uCtho", "brand": "bloomastra", "title": "Not all heroes wear capes", "kind": "Talking head", "ig": "https://www.instagram.com/reel/DXWsx5uCtho/"}, {"id": "Dc_hT0lIFKQ", "brand": "Aayush Wellness", "title": "A scroll-stopper for Shilajit", "kind": "Problem \u00b7 Agitate \u00b7 Solution", "ig": "https://www.instagram.com/reel/Dc-hT0lIFKQ/"}, {"id": "DVOMqYJCYcZ", "brand": "bloomastra", "title": "Still shy about intimate care?", "kind": "Talking head", "ig": "https://www.instagram.com/reel/DVOMqYJCYcZ/"}];

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
    var lines = ["Hi Dibiz Studio, I'd like to talk about growing my brand.", "Name: " + lead.name, "WhatsApp: +91 " + lead.phone];
    if (lead.service) lines.push("Goal: " + lead.service);
    if (lead.budget) lines.push("Monthly revenue: " + lead.budget);
    if (lead.timeline) lines.push("Monthly ad spend: " + lead.timeline);
    if (lead.brand) lines.push("Brand: " + lead.brand);
    if (lead.site) lines.push("Website / Instagram: " + lead.site);
    if (lead.notes) lines.push("Challenge: " + lead.notes);
    box.innerHTML =
      '<div class="check"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>' +
      '<h3>' + heading + ', ' + lead.name.split(" ")[0].replace(/</g, "") + '!</h3>' +
      '<p>We\'ve got your details. Tap below to send them on WhatsApp and get a faster reply.</p>' +
      '<a class="g-btn btn-wa btn-block" target="_blank" rel="noopener" href="' + waUrl(lines.join("\n")) + '"><svg width="20" height="20"><use href="#i-wa"/></svg>Send on WhatsApp</a>';
    form.style.display = "none"; box.classList.add("show");
    try { console.log("[lead]", lead); } catch(e){}
  }

  // Hero form
  var hf = $("#hero-form");
  hf.addEventListener("submit", function(e){
    e.preventDefault();
    var name = $("#h-name").value.trim(), phone = $("#h-phone").value, service = $("#h-service").value;
    var err = !name ? "Please enter your name." : !validPhone(phone) ? "Please enter a valid 10-digit WhatsApp number." : !service ? "Please choose your monthly revenue." : "";
    $("#h-err").textContent = err; if (err) return;
    showDone($("#hero-done"), hf, {name:name, phone:phone, service:"Growth enquiry", budget:service}, "Thank you");
  });

  // Mid-page form after the portfolio
  var mf = $("#mid-form");
  mf.addEventListener("submit", function(e){
    e.preventDefault();
    var name = $("#m-name").value.trim(), phone = $("#m-phone").value;
    var err = !name ? "Please enter your name." : !validPhone(phone) ? "Please enter a valid 10-digit WhatsApp number." : "";
    $("#m-err").textContent = err; if (err) return;
    showDone($("#mid-done"), mf, {name:name, phone:phone, service:"Wants to connect (saw case studies)"}, "Thank you");
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
      brand:$("#w-brand").value.trim(), site:$("#w-site").value.trim(), notes:$("#w-notes").value.trim()}, "Thanks! We'll connect with you soon");
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


/* Scroll reveal + number count-up. Content is visible by default; the effect only applies once this runs. */
(function(){
  if (!("IntersectionObserver" in window)) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelector(".lpg").classList.add("js");
  var els = document.querySelectorAll(".sec-head,.res,.pain,.svc,.offer-box,.story,.step,.cmp,.wizard,.faq details,.final-box,.midcap,.fmt,.pillar,.fixc,.job,.pq,.founders,.series,.case,.stage,.rcard,.sop,.tl li,.app");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {rootMargin:"0px 0px -8% 0px"});
  Array.prototype.forEach.call(els, function(el){
    var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.classList.add("rv"); el.style.transitionDelay = Math.min(sib, 5) * 70 + "ms"; io.observe(el);
  });
  var co = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return; co.unobserve(e.target);
      var el = e.target, to = +el.dataset.to, t0 = null;
      if (reduce) return;
      function f(t){ if (!t0) t0 = t; var p = Math.min((t - t0) / 1300, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }
      requestAnimationFrame(f);
    });
  }, {threshold:.6});
  Array.prototype.forEach.call(document.querySelectorAll(".cnt"), function(el){ co.observe(el); });
})();


/* Work tabs: arrow keys move between tabs, as in the WAI tabs pattern. */
(function(){
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role=tab]'));
  function show(t){
    tabs.forEach(function(x){
      var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ show(t); });
    t.addEventListener('keydown', function(e){
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length]; show(n); n.focus(); e.preventDefault();
    });
  });
})();


/* Stage cards preselect monthly revenue in the audit form. */
(function(){
  Array.prototype.forEach.call(document.querySelectorAll('[data-stage]'), function(a){
    a.addEventListener('click', function(){ var r = document.getElementById(a.dataset.stage); if (r) r.checked = true; });
  });
})();


/* Reel filters */
(function(){
  var btns = document.querySelectorAll(".rf"), cards = document.querySelectorAll(".reelc");
  Array.prototype.forEach.call(btns, function(b){
    b.addEventListener("click", function(){
      Array.prototype.forEach.call(btns, function(x){ x.setAttribute("aria-pressed", x === b); });
      var f = b.dataset.f, i = 0;
      Array.prototype.forEach.call(cards, function(c){
        var show = f === "all" || c.dataset.c === f; c.hidden = !show;
        if (show){ c.style.animation = "none"; c.offsetHeight; c.style.animation = ""; c.style.animationDelay = (i++ * 50) + "ms"; }
      });
    });
  });
})();


/* Reels: card previews play only while on screen; tapping opens the in-page player with sound. */
(function(){
  var R = window.REELS || [], lb = document.getElementById("lb"); if (!lb) return;
  var v = document.getElementById("lb-v"), cur = 0, lastFocus = null;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cards = document.querySelectorAll(".reelc video");
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        var el = e.target;
        if (e.isIntersecting && !reduce){ if (!el.src) el.src = el.dataset.src; var p = el.play(); if (p && p.catch) p.catch(function(){}); }
        else el.pause();
      });
    }, {threshold:.35});
    Array.prototype.forEach.call(cards, function(el){ io.observe(el); });
    Array.prototype.forEach.call(document.querySelectorAll(".hp video"), function(el){
      new IntersectionObserver(function(es){ es[0].isIntersecting && !reduce ? el.play().catch(function(){}) : el.pause(); }).observe(el);
    });
  }
  function visible(){ return Array.prototype.filter.call(document.querySelectorAll(".reelc"), function(c){ return !c.hidden; }).map(function(c){ return +c.dataset.open; }); }
  function load(i){
    cur = i; var r = R[i];
    v.src = "/lp/growth/reels/" + r.id + ".mp4"; v.poster = "/lp/growth/reels/" + r.id + ".jpg";
    document.getElementById("lb-kind").textContent = r.kind;
    document.getElementById("lb-brand").textContent = r.brand;
    document.getElementById("lb-title").textContent = r.title;
    document.getElementById("lb-wa").dataset.wa = "Hi Dibiz, I watched your " + r.brand + " reel (" + r.title + "). I'd like ads like this for my brand.";
    var list = visible(), pos = list.indexOf(i);
    document.getElementById("lb-count").textContent = (pos < 0 ? i + 1 : pos + 1) + " of " + (pos < 0 ? R.length : list.length) + " reels";
    var p = v.play(); if (p && p.catch) p.catch(function(){});
  }
  function open(i){
    lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = "hidden";
    Array.prototype.forEach.call(document.querySelectorAll(".reelc video,.hp video"), function(el){ el.pause(); });
    load(i); document.getElementById("lb-x").focus();
  }
  function close(){
    v.pause(); v.removeAttribute("src"); v.load(); lb.hidden = true; document.body.style.overflow = "";
    Array.prototype.forEach.call(document.querySelectorAll(".hp video"), function(el){ el.play().catch(function(){}); });
    if (lastFocus) lastFocus.focus();
  }
  function step(d){ var list = visible(); if (list.indexOf(cur) < 0) list = R.map(function(_, k){ return k; }); var pos = list.indexOf(cur); load(list[(pos + d + list.length) % list.length]); }
  Array.prototype.forEach.call(document.querySelectorAll("[data-open]"), function(b){ b.addEventListener("click", function(){ open(+b.dataset.open); }); });
  document.getElementById("lb-x").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", function(){ step(-1); });
  document.getElementById("lb-next").addEventListener("click", function(){ step(1); });
  document.getElementById("lb-cta").addEventListener("click", close);
  v.addEventListener("ended", function(){ step(1); });
  lb.addEventListener("click", function(e){ if (e.target === lb) close(); });
  document.addEventListener("keydown", function(e){
    if (lb.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1);
  });
  /* method tabs */
  var mt = document.querySelectorAll(".mtabs [role=tab]");
  Array.prototype.forEach.call(mt, function(t, i){
    function sel(n){ Array.prototype.forEach.call(mt, function(x, k){ var on = k === n; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; }); }
    t.addEventListener("click", function(){ sel(i); });
    t.addEventListener("keydown", function(e){ var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return; var n = (i + d + mt.length) % mt.length; sel(n); mt[n].focus(); e.preventDefault(); });
  });
  /* "I'm at this stage" now lives in a tab: scroll to the form */
})();


(function(){
  var row=document.getElementById('ind-row');
  document.querySelectorAll('.ind-btn').forEach(function(b){b.addEventListener('click',function(){
    var c=row.querySelector('.ind');var step=c?c.getBoundingClientRect().width+20:300;
    row.scrollBy({left:step*(+b.dataset.d),behavior:'smooth'});});});
  document.querySelectorAll('.ind-more[data-tab]').forEach(function(a){a.addEventListener('click',function(){
    var t=document.getElementById(a.dataset.tab);if(t)t.click();});});
})();


(function(){
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.querySelector(".nav");
  function onScroll(){ if (nav) nav.classList.toggle("scrolled", scrollY > 20); }
  addEventListener("scroll", onScroll, {passive:true}); onScroll();
  if (reduce || !("IntersectionObserver" in window)) return;
  var fresh = !document.querySelector(".rv");
  if (fresh) document.querySelector(".lpg").classList.add("js");
  var sel = fresh ? ".sec-head,.res,.svc,.why,.step,.story,.cn-box,.wizard,.faq details,.final-box,.midcap,.wp,.inc,.cmp,.pcard,.feature" : ".cn-box";
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }); }, {rootMargin:"0px 0px -8% 0px"});
  Array.prototype.forEach.call(document.querySelectorAll(sel), function(el){ var i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0; el.classList.add("rv"); el.style.transitionDelay = Math.min(i,4)*60 + "ms"; io.observe(el); });
})();

}
