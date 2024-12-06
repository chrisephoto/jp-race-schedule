// option to hide past events

// variables
timeDifMin = 1000000000000000000000000;
const seriesList = [...new Set(dataset.map(item => item.series))].sort();
const allEvents = dataset.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : -1);
const eventList = []
for (let i = 0; i < seriesList.length; i++) {
  eventList[i] = dataset.filter(item => item.series == seriesList[i]).sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : -1);
}

// listeners
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("scroll", function() {
  heroOpacity(window.scrollY);
}, false);


// functions
function init() {
  // id next event
  nextEvent() ;

  // populate hero 
  populateHero();

  // populate feed
  populateFeed(i);

  // 
  document.getElementById("button-info").addEventListener("click", function() {
    document.getElementById("dialog-info").open = true;
  }, false);
}

function nextEvent() {
}

function populateHero() {
}

function populateFeed(i) {
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
      html += `
              <a class="card" href="${dataset[i].events[j]}" target="_blank">
                <img src="${dataset[i].logo}">
                <div>
                  <p class="text-size-s">${dataset[i].series}</p>
                  <p class="text-size-s">${dataset[i].events[j].title}</p>
                  <p class="text-size-s">${dataset[i].events[j].date}</p>
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
