const $$=(s,r=document)=>[...r.querySelectorAll(s)], $=(s,r=document)=>r.querySelector(s);

const progress=$('.top-progress');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${scrollY/max*100}%`;});

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(x=>obs.observe(x));

const countObs=new IntersectionObserver(es=>es.forEach(e=>{
 if(e.isIntersecting){const el=e.target,target=+el.dataset.count,start=performance.now();
  const tick=t=>{const p=Math.min((t-start)/1000,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);countObs.unobserve(el)}
}),{threshold:.7});
$$('[data-count]').forEach(x=>countObs.observe(x));

const nav=$('.header nav'), ham=$('.hamburger');
ham.addEventListener('click',()=>nav.classList.toggle('mobile-open'));
$$('.header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('mobile-open')));


const labData={
 raw:{
  stage:'RAW MATERIAL', count:'07', overviewTitle:'Raw material controls',
  overviewCopy:'GSM, bursting strength, Cobb value, moisture content, ring crush, flat crush and viscosity checks.',
  checks:[
   ['Test for GSM','assets/test-tools-overview.png','RAW / 01','Reference laboratory visual for GSM / grammage checking.'],
   ['Bursting Strength','assets/test-bursting-strength.png','RAW / 02','Reference equipment visual for the Bursting Strength check listed in the supplied company profile.'],
   ['Cobb Value','assets/test-cobb.png','RAW / 03','Reference equipment visual for the Cobb Value check listed in the supplied company profile.'],
   ['Moisture content','assets/test-tools-overview.png','RAW / 04','Reference laboratory tools and sample visual for moisture-content checking.'],
   ['Ring Crush Test','assets/test-tools-overview.png','RAW / 05','Reference sample visual for the Ring Crush Test.'],
   ['Flat Crush Test','assets/test-tools-overview.png','RAW / 06','Reference sample visual for the Flat Crush Test.'],
   ['Viscosity Test','assets/test-tools-overview.png','RAW / 07','Reference sample visual for the Viscosity Test.']
  ]
 },
 final:{
  stage:'FINAL PRODUCT', count:'08', overviewTitle:'Finished-box controls',
  overviewCopy:'Dimension, bursting strength, punching resistance, box compression, sheer strength, moisture, board thickness and edge crush checks.',
  checks:[
   ['Dimension Test','assets/test-tools-overview.png','FINAL / 01','Reference measurement-tool visual for the Dimension Test.'],
   ['Test for the Bursting Strength','assets/test-bursting-strength.png','FINAL / 02','Reference equipment visual for the final-product Bursting Strength check.'],
   ['Punching Resistance of Board','assets/test-tools-overview.png','FINAL / 03','Reference punching-tool visual for the listed board resistance check.'],
   ['Compression of the box','assets/test-box-compression.png','FINAL / 04','Reference Box Compression Tester visual for the finished-box compression check.'],
   ['Sheer Strength test','assets/test-tensile.png','FINAL / 05','Reference strength-testing equipment visual for the listed strength check.'],
   ['Moisture content','assets/test-tools-overview.png','FINAL / 06','Reference laboratory sample visual for moisture-content checking.'],
   ['Board thickness Test','assets/test-tools-overview.png','FINAL / 07','Reference board-thickness and measurement tools visual.'],
   ['Edge crush Test','assets/test-tools-overview.png','FINAL / 08','Reference crush-test sample visual for the listed Edge Crush Test.']
  ]
 }
};

const labConsole=$('[data-lab-console]');
if(labConsole){
 const list=$('[data-check-list]',labConsole), img=$('[data-test-image]',labConsole), title=$('[data-test-title]',labConsole), stage=$('[data-test-stage]',labConsole), code=$('[data-test-code]',labConsole), note=$('[data-test-note]',labConsole), count=$('[data-check-count]',labConsole), complete=$('[data-complete-count]',labConsole), overviewTitle=$('[data-overview-title]',labConsole), overviewCopy=$('[data-overview-copy]',labConsole), tabs=$$('.lab-tab',labConsole), visual=$('.lab-visual-image',labConsole);
 let group='raw', active=1;
 const renderChecks=()=>{
  const data=labData[group]; list.innerHTML='';
  data.checks.forEach((item,i)=>{
   const b=document.createElement('button'); b.type='button'; b.className='lab-check'+(i===active?' active':'');
   b.innerHTML=`<span class="lab-check-number">${String(i+1).padStart(2,'0')}</span><span class="lab-check-title">${item[0]}</span>`;
   b.addEventListener('click',()=>{active=i;renderChecks();showTest()}); list.appendChild(b);
  });
  count.textContent=`${String(active+1).padStart(2,'0')} / ${data.count}`;
  complete.textContent=data.count;
  overviewTitle.textContent=data.overviewTitle; overviewCopy.textContent=data.overviewCopy;
 };
 const showTest=()=>{
  const item=labData[group].checks[active];
  visual.classList.add('is-changing');
  setTimeout(()=>{
   img.src=item[1]; img.alt=`Reference laboratory equipment for ${item[0]}`; title.textContent=item[0]; stage.textContent=labData[group].stage; code.textContent=item[2]; note.textContent=item[3]; visual.classList.remove('is-changing');
  },170);
 };
 tabs.forEach(tab=>tab.addEventListener('click',()=>{
  group=tab.dataset.group; active=group==='raw'?1:0;
  tabs.forEach(t=>{const on=t===tab;t.classList.toggle('active',on);t.setAttribute('aria-selected',on)});
  renderChecks();showTest();
 }));
 renderChecks();showTest();
}

// Mobile-only Packaging Formats rotator.
// Automatic swaps remain staggered, but users can swipe any visible card left/right at any time.
const mobileFormatRotator=$('[data-mobile-format-rotator]');
if(mobileFormatRotator){
 const mobileQuery=matchMedia('(max-width:650px)');
 const figures=$$('figure',mobileFormatRotator);
 const items=[
  {src:'assets/custom-boxes.jpeg',alt:'Corrugated boards and custom boxes',caption:'Corrugated boards & sheets'},
  {src:'assets/shipping-boxes.jpeg',alt:'Corrugated shipping boxes',caption:'Slotted & shipping boxes'},
  {src:'assets/branded-box.jpeg',alt:'Multi-colour flexo printed corrugated box',caption:'Multi-colour flexo printed boxes'},
  {src:'assets/industrial-packaging.jpeg',alt:'Heavy-duty industrial corrugated packaging',caption:'Export-grade & heavy-duty shippers'},
  {src:'assets/bike-packaging.jpeg',alt:'Large format corrugated product packaging',caption:'Large format & special packaging'},
  {src:'assets/mailer-box.jpeg',alt:'Custom corrugated mailer packaging',caption:'Custom packaging formats'}
 ];
 let timers=[],started=false,sequence=0;
 const slots=[0,1,2];
 const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
 const swapFigure=(figure,item,direction='left')=>{
  if(!figure || !item)return;
  const image=$('img',figure), caption=$('figcaption',figure);
  figure.classList.remove('mobile-format-swipe-in','mobile-format-swipe-out','swipe-right');
  if(direction==='right')figure.classList.add('swipe-right');
  figure.classList.add('mobile-format-swipe-out');
  timers.push(setTimeout(()=>{
   image.src=item.src; image.alt=item.alt; caption.textContent=item.caption;
   figure.classList.remove('mobile-format-swipe-out');
   figure.classList.add('mobile-format-swipe-in');
  },750));
  timers.push(setTimeout(()=>figure.classList.remove('mobile-format-swipe-in','swipe-right'),1500));
 };
 const getCurrentIndex=(figure)=>{
  const src=$('img',figure)?.getAttribute('src');
  const i=items.findIndex(x=>src===x.src);
  return i<0?0:i;
 };
 const manualSwipe=(figure,dir)=>{
  if(!mobileQuery.matches)return;
  clearTimers();
  started=true;
  const current=getCurrentIndex(figure);
  const next=(current+(dir==='left'?1:-1)+items.length)%items.length;
  swapFigure(figure,items[next],dir);
  // Resume the staggered automatic sequence after a fresh 7s interval.
  timers.push(setTimeout(tick,7000));
 };
 const attachSwipe=(figure)=>{
  let sx=0,sy=0,tracking=false;
  figure.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;tracking=true},{passive:true});
  figure.addEventListener('touchend',e=>{
   if(!tracking)return; tracking=false;
   const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
   if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.15)manualSwipe(figure,dx<0?'left':'right');
  },{passive:true});
 };
 figures.slice(0,3).forEach(attachSwipe);
 const tick=()=>{
  const slot=sequence%3;
  const itemIndex=(sequence+3)%items.length;
  swapFigure(figures[slot],items[itemIndex],'left');
  sequence++;
  timers.push(setTimeout(tick,7000));
 };
 const start=()=>{if(started)return;started=true;clearTimers();sequence=0;timers.push(setTimeout(tick,7000));};
 const stop=()=>{started=false;clearTimers()};
 const sync=()=>mobileQuery.matches?start():stop();
 sync(); mobileQuery.addEventListener?.('change',sync);
}

// Mobile-only infrastructure image rotator. Desktop keeps the full layout.
// Users can swipe any visible image left/right at any time; auto-swaps remain staggered.
const mobileInfraRotator=$('[data-mobile-infra-rotator]');
if(mobileInfraRotator){
 const mobileQuery=matchMedia('(max-width:620px)');
 const figures=$$('figure',mobileInfraRotator);
 const items=[
  {src:'assets/infra/board-manufacturing-line.png',alt:'Long corrugated board manufacturing line',kicker:'01 / BOARD LINE',title:'Fully automatic high-speed corrugated board manufacturing'},
  {src:'assets/infra/flexo-printing-machine.png',alt:'Flexographic printing machine for corrugated packaging',kicker:'02 / FLEXO',title:'Printing, slotting & die-cutting'},
  {src:'assets/infra/folder-gluer-strapping.png',alt:'Corrugated folder gluer and strapping equipment',kicker:'03 / FINISHING',title:'Gluing, stitching & strapping'},
  {src:'assets/infra/box-conversion-finishing.png',alt:'Corrugated box conversion and finishing machine',kicker:'04 / CONVERSION',title:'Corrugated box conversion'},
  {src:'assets/infra/steam-boiler-generated.png',alt:'Industrial steam boiler supporting corrugated production',kicker:'05 / UTILITY',title:'Green-fuel steam boiler'}
 ];
 let timers=[],started=false,sequence=0;
 const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
 const swapFigure=(figure,item,direction='left')=>{
  if(!figure || !item)return;
  const image=$('img',figure), caption=$('figcaption',figure);
  figure.classList.remove('mobile-infra-swipe-in','mobile-infra-swipe-out','swipe-right');
  if(direction==='right')figure.classList.add('swipe-right');
  figure.classList.add('mobile-infra-swipe-out');
  timers.push(setTimeout(()=>{
   image.src=item.src; image.alt=item.alt;
   const span=$('span',caption), b=$('b',caption);
   if(span)span.textContent=item.kicker; if(b)b.textContent=item.title;
   figure.classList.remove('mobile-infra-swipe-out'); figure.classList.add('mobile-infra-swipe-in');
  },750));
  timers.push(setTimeout(()=>figure.classList.remove('mobile-infra-swipe-in','swipe-right'),1500));
 };
 const getCurrentIndex=(figure)=>{const src=$('img',figure)?.getAttribute('src');const i=items.findIndex(x=>src===x.src);return i<0?0:i};
 const manualSwipe=(figure,dir)=>{
  if(!mobileQuery.matches)return;
  clearTimers(); started=true;
  const current=getCurrentIndex(figure), next=(current+(dir==='left'?1:-1)+items.length)%items.length;
  swapFigure(figure,items[next],dir); timers.push(setTimeout(tick,7000));
 };
 const attachSwipe=(figure)=>{
  let sx=0,sy=0,tracking=false;
  figure.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;tracking=true},{passive:true});
  figure.addEventListener('touchend',e=>{if(!tracking)return;tracking=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15)manualSwipe(figure,dx<0?'left':'right')},{passive:true});
 };
 figures.slice(0,3).forEach(attachSwipe);
 const tick=()=>{const slot=sequence%3;const itemIndex=(sequence+3)%items.length;swapFigure(figures[slot],items[itemIndex],'left');sequence++;timers.push(setTimeout(tick,7000));};
 const start=()=>{if(started)return;started=true;clearTimers();sequence=0;timers.push(setTimeout(tick,7000));};
 const stop=()=>{started=false;clearTimers()};
 const sync=()=>mobileQuery.matches?start():stop(); sync(); mobileQuery.addEventListener?.('change',sync);
}

// Mobile product hero image: swipe left/right to change immediately, independent of the timer.
const productSlideshow=$('[data-product-slideshow]');
if(productSlideshow){
 const frame=$('.product-slideshow-frame',productSlideshow), img=$('[data-product-slide-image]',productSlideshow), kicker=$('[data-product-slide-kicker]',productSlideshow), title=$('[data-product-slide-title]',productSlideshow), progress=$('.product-slide-progress span',productSlideshow);
 const slides=[
  {src:'assets/product-airport-box-01.jpeg',alt:'B2Binc corrugated box prepared for airport logistics',kicker:'01 / SHIPPING',title:'Protection built for movement.'},
  {src:'assets/product-airport-box-02.jpeg',alt:'B2Binc corrugated boxes in an airport logistics environment',kicker:'02 / EXPORT + TRANSIT',title:'Packaging for demanding journeys.'},
  {src:'assets/shipping-boxes.jpeg',alt:'Corrugated shipping boxes',kicker:'03 / SHIPPING BOXES',title:'Built for storage, handling and delivery.'},
  {src:'assets/industrial-packaging.jpeg',alt:'Heavy-duty industrial corrugated packaging',kicker:'04 / INDUSTRIAL',title:'Heavy-duty protection for demanding applications.'},
  {src:'assets/branded-box.jpeg',alt:'Multi-colour flexo printed corrugated box',kicker:'05 / PRINTED PACKAGING',title:'Packaging that carries the brand forward.'}
 ];
 slides.forEach(s=>{const pre=new Image();pre.src=s.src}); let index=0,autoTimer;
 const render=(next,direction='left')=>{
  frame.classList.remove('is-entering','swipe-right-out','swipe-right-in'); frame.classList.add('is-changing'); if(direction==='right') frame.classList.add('swipe-right-out'); progress.style.animation='none'; void progress.offsetWidth;
  setTimeout(()=>{index=(next+slides.length)%slides.length;const s=slides[index];img.src=s.src;img.alt=s.alt;kicker.textContent=s.kicker;title.textContent=s.title;frame.classList.remove('is-changing','swipe-right-out');frame.classList.add('is-entering');if(direction==='right') frame.classList.add('swipe-right-in');progress.style.animation='';setTimeout(()=>frame.classList.remove('is-entering','swipe-right-in'),700)},direction==='right'?0:480);
 };
 const schedule=()=>{clearTimeout(autoTimer);autoTimer=setTimeout(()=>{render(index+1,'left');schedule()},4000)};
 let sx=0,sy=0;
 frame.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
 frame.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15){clearTimeout(autoTimer);render(index+(dx<0?1:-1),dx<0?'left':'right');schedule()}},{passive:true});
 schedule();
}

/* Contact form → Web3Forms → info@b2binc.in (same delivery as the previous site) */
const CONTACT_CONFIG = {
  email: "info@b2binc.in",
  web3formsAccessKey: "aceba07c-a936-4bba-8ef5-31eb7b9bcfdb",
};

const form = $("#quoteForm");
const formStatus = $("#formStatus");
const CONTACT_EMAIL = CONTACT_CONFIG.email;
const ACCESS_KEY = (CONTACT_CONFIG.web3formsAccessKey || "").trim();
const SUBMIT_HTML = "Send enquiry <b>↗</b>";

function showFormStatus(type, text) {
  if (!formStatus) return;
  formStatus.className = `form-status full is-${type}`;
  formStatus.textContent = text;
  formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function openMailto(data) {
  const subject = encodeURIComponent("New enquiry from B2Binc website");
  const body = encodeURIComponent(
    [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Interest: ${data.interest}`,
      "",
      data.message,
    ].join("\n")
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const botcheck = form.elements.namedItem("botcheck");
  if (botcheck && botcheck.checked) {
    showFormStatus("success", "Thank you! We will contact you shortly.");
    form.reset();
    return;
  }

  const required = ["name", "company", "email", "phone", "interest", "message"];
  let valid = true;

  required.forEach((field) => {
    const input = form.elements[field];
    if (!input) return;
    const ok = String(input.value || "").trim().length > 0;
    input.classList.toggle("is-error", !ok);
    if (!ok) valid = false;
  });

  const emailInput = form.elements.email;
  if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    emailInput.classList.add("is-error");
    valid = false;
  }

  if (!valid) {
    showFormStatus("error", "Please fill in all required fields correctly.");
    return;
  }

  const data = {
    name: form.elements.name.value.trim(),
    company: form.elements.company.value.trim(),
    email: form.elements.email.value.trim(),
    phone: form.elements.phone.value.trim(),
    interest: form.elements.interest.value,
    message: form.elements.message.value.trim(),
  };

  const submitBtn = $("#formSubmitBtn") || form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
  }

  const restoreBtn = () => {
    if (!submitBtn) return;
    submitBtn.disabled = false;
    submitBtn.innerHTML = SUBMIT_HTML;
  };

  if (!ACCESS_KEY) {
    openMailto(data);
    showFormStatus(
      "error",
      `Automatic email is not set up yet. Your mail app opened with the enquiry — click Send to email ${CONTACT_EMAIL}.`
    );
    restoreBtn();
    return;
  }

  showFormStatus("success", `Sending your enquiry to ${CONTACT_EMAIL}…`);

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: "New enquiry from B2Binc website",
        from_name: "B2Binc Website",
        replyto: data.email,
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        message: data.message,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    const result = await res.json().catch(() => ({}));

    if (res.ok && result.success) {
      showFormStatus(
        "success",
        `Thank you! Your enquiry has been sent to ${CONTACT_EMAIL}. Our team will respond within 1–2 business days.`
      );
      form.reset();
    } else {
      throw new Error(result.message || "send failed");
    }
  } catch (err) {
    clearTimeout(timer);
    openMailto(data);
    showFormStatus(
      "error",
      `Could not send automatically (${err.message || "network error"}). Your mail app opened — please click Send to email ${CONTACT_EMAIL}.`
    );
  } finally {
    restoreBtn();
  }
});

$('#year').textContent=new Date().getFullYear();
