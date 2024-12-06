var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("scroll", function() {
  heroOpacity(window.scrollY);
}, false);

function init() {
  // id next event
  nextEvent() ;

  // populate hero 
  populateHero();

  // populate feed
  populateFeed();

  // prepare info dialog
  document.getElementById("button-info").addEventListener("click", function() {
    document.getElementById("dialog-info").open = true;
  }, false);
}

function nextEvent() {
}

function populateHero() {
  let html = '';
  html += `
    <img id="hero-image" src="${dataset[0].logo}">
    <div class="hero-text">
      <p id="hero-title" class="text-size-xl">${dataset[0].events[0].date}</p>
      <p id="hero-header" class="text-size-3xl">${dataset[0].events[0].title}</p>
      <p id="hero-copy" class="text-size-xl">${dataset[0].events[0].track}</p>
      <a id="hero-button" class="button-1 text-size-xs" href="#">See Details</a>
      </div>
  `;
  const target = document.getElementById('hero');
  target.innerHTML = html;
}

function populateFeed() {
  for (i = 0; i < dataset.length; i++) {
    friendlySeries = dataset[i].series.replace(/\s+/g, '-').toLowerCase();
    let html = '';
    html += `
      <section>
        <h2 class="slider-title text-size-l">${dataset[i].series}</h2>
        <div class="slider-outer">
          <div class="slider-mid" id="slider-${friendlySeries}">
            <div class="slider-inner">
              <a class="nav-left" onclick="scrollSlider('slider-${friendlySeries}','l')">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.25 6.75L4.75 12L10.25 17.25"></path>
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 12H5"></path>
                </svg>
              </a>
    `;
    for (let j = 0; j < dataset[i].events.length; j++) {
      // create human readable date
      dateRaw = new Date(dataset[i].events[j].date);
      monthRaw = dateRaw.getMonth();
      monthLong = months[monthRaw];
      monthShort = monthLong.substr(0, 3);
      dayRaw = dateRaw.getDate();
      weekdayRaw = dateRaw.getDay();
      weekdayName = days[dayRaw];
      
      html += `
              <a class="card" href="${dataset[i].events[j]}" target="_blank">
                <img src="${dataset[i].logo}">
                <div>
                  <p class="text-size-s">${dataset[i].events[j].title}</p>
                  <p class="text-size-s">${weekdayName}</p>
                  <p class="text-size-s">${dayRaw}</p>
                  <p class="text-size-s">${monthShort}</p>
                  <p class="text-size-s">${dataset[i].events[j].track}</p>
                </div>
              </a>
      `;
    }
    html += `
              <a class="nav-right visible" onclick="scrollSlider('slider-${friendlySeries}','r')">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 6.75L19.25 12L13.75 17.25"></path>
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H4.75"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
    const target = document.querySelector('main');
    target.innerHTML += html;
  }
}

function scrollSlider(id, direction) {
  if (direction == "l") {
    i = -1;
  } else if (direction == "r") {
    i = 1;
  } else {
    i = 0;
  }
  vw = window.innerWidth;
  base = parseInt(getComputedStyle(document.querySelector("html")).getPropertyValue('font-size'));
  gutter = parseInt(getComputedStyle(document.querySelector(":root")).getPropertyValue('--gutter'));
  scroll = vw - (gutter * base);
  current = document.getElementById(id).scrollLeft;
  remain = document.getElementById(id).scrollWidth - current;
  document.getElementById(id).scrollBy({
    top: 0,
    left: scroll * i,
    behavior: "smooth"
  });
  if (direction == "l") {
    if (document.getElementById(id).scrollLeft <= vw + 10) {
      document.querySelector("#" + id + " .nav-left").classList.remove("visible");
    }
    document.querySelector("#" + id + " .nav-right").classList.add("visible");
  } else if (direction == "r") {
    if (remain <= 2 * vw + 10) {
      document.querySelector("#" + id + " .nav-right").classList.remove("visible");
    }
    document.querySelector("#" + id + " .nav-left").classList.add("visible");
  }
}

function heroOpacity(sp) {
  vh = window.innerHeight;
  //n = 1 - (2 * sp) / vh; //current position in vh
  n = 1 - (1.4 * sp / vh); //current position in vh
  document.getElementById("hero").style.opacity = n;
}
