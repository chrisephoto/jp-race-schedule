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
  /*nextEvent();*/
  for (i = 0; i < dataset.length; i++) {
    populateFeed(i);
  }
  /*
  createSlider(allEvents, "following", "hide");
  for (i = 0; i < seriesList.length; i++) {
    createSlider(eventList[i]);
  }
  */
  document.getElementById("button-info").addEventListener("click", function() {
    document.getElementById("dialog-info").open = true;
  }, false);
  document.getElementById("button-settings").addEventListener("click", function() {
    document.getElementById("dialog-settings").open = true;
  }, false);
}

function populateFeed(i) {
  let html = '';
  html += `
    <section>
      <h2 class="slider-title text-size-l">${dataset[i][0].series}</h2>
      <div class="slider-outer">
        <div class="slider-mid" id="slider-${dataset[i][0].series}">
          <div class="slider-inner">
            <a class="nav-left" onclick="scrollSlider('slider-${dataset[i][0].series}','l')">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.25 6.75L4.75 12L10.25 17.25"></path>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 12H5"></path>
              </svg>
            </a>
  `;
  for (let j = 1; j < dataset[i].length - 1; j++) {
    html += `
            <a class="card" href="${dataset[i].url}" target="_blank">
              <img src="${dataset[i].image}">
              <div>
                <p class="text-size-s">${dataset[i][0].series}</p>
                <p class="text-size-s">${dataset[i][j].round}</p>
                <p class="text-size-s">${dataset[i][j].date}</p>
                <p class="text-size-s">${dataset[i][j].track}</p>
              </div>
            </a>
    `;
  }
  html += `
            <a class="nav-right visible" onclick="scrollSlider('slider-${dataset[i][0].series}','r')">
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

function createSlider(data, opt1, opt2) {
  //data - array of events
  //opt 1 - string = override heading
  //opt 2 - hide = hide past events

  opt1 = (typeof opt1 !== 'undefined') ? opt1.replace(/\s+/g, "-").toLowerCase() : data[0].series.replace(/\s+/g, "-").toLowerCase();

  const main = document.getElementById("main");
  const section = document.createElement("section");
  const sliderOuter = document.createElement("div");
  sliderOuter.className = "slider-outer";
  const sliderTitle = document.createElement("h2");
  sliderTitle.className = "slider-title text-size-l";
  const sliderMid = document.createElement("div");
  sliderMid.className = "slider-mid";
  sliderMid.id = "slider-" + opt1;
  const sliderInner = document.createElement("div");
  sliderInner.className = "slider-inner";
  const buttonLeft = document.createElement("a");
  buttonLeft.className = "nav-left";
  buttonLeft.setAttribute("onclick", "scrollSlider('slider-" + opt1 + "','l')");
  buttonLeft.innerHTML = "<svg width='24' height='24' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.25 6.75L4.75 12L10.25 17.25'></path><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.25 12H5'></path></svg>";
  const buttonRight = document.createElement("a");
  buttonRight.className = "nav-right visible";
  buttonRight.setAttribute("onclick", "scrollSlider('slider-" + opt1 + "','r')");
  buttonRight.innerHTML = "<svg width='24' height='24' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M13.75 6.75L19.25 12L13.75 17.25'></path><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 12H4.75'></path></svg>";

  main.appendChild(section);
  section.appendChild(sliderTitle);
  sliderTitle.appendChild(document.createTextNode(opt1.replace("-"," ")));
  section.appendChild(sliderOuter);
  sliderOuter.appendChild(sliderMid);
  sliderMid.appendChild(sliderInner);
  sliderMid.appendChild(sliderInner);
  sliderInner.appendChild(buttonLeft);

  for (let j = 0; j < data.length; j++) {

    if (Date.parse(data[j].date) >= Date.parse(Date()) || opt2 != "hide") {
      const anchor = document.createElement("a");
      anchor.className = "card";
      anchor.href = data[j].url;
      anchor.target = "_blank";
      if (Date.parse(data[j].date) < Date.parse(Date())) {
          anchor.classList.add("unavailable");
      }
      const img = document.createElement("img"); img.src = data[j].image;
      const textdiv = document.createElement("div");
      const series = document.createElement("p");
      const round = document.createElement("p");
      const date = document.createElement("p");
      const track = document.createElement("p");
      const seriestext = document.createTextNode(data[j].series);
      const roundtext = document.createTextNode(data[j].round);
      const datetext = document.createTextNode(data[j].date);
      const tracktext = document.createTextNode(data[j].track);
      sliderInner.appendChild(anchor);
      anchor.appendChild(img);
      textdiv.appendChild(series);
      series.className = "text-size-s";
      series.appendChild(seriestext);
      anchor.appendChild(textdiv);
      textdiv.appendChild(round);
      round.className = "text-size-s";
      round.appendChild(roundtext);
      textdiv.appendChild(track);
      track.className = "text-size-s";
      track.appendChild(tracktext);
      textdiv.appendChild(date);
      date.className = "text-size-s";
      date.appendChild(datetext);
      }
    }
    sliderInner.appendChild(buttonRight);
  }

  function nextEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      proposedDate = Date.parse(allEvents[i].date);
      currentDate = Date.parse(Date());
      timeDif = proposedDate - currentDate;
      if (timeDif >= 0) {
        if (timeDif < timeDifMin) {
          timeDifMin = timeDif;
          nextEvent = i;
        }
      }
    }
    document.getElementById("hero-header").innerHTML = allEvents[nextEvent].series + " at " + allEvents[nextEvent].track;
    document.getElementById("hero-copy").innerHTML = allEvents[nextEvent].date;
    document.getElementById("hero-button").href = allEvents[nextEvent].url;
    document.getElementById("hero-image").src = allEvents[nextEvent].image;
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
