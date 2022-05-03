// prevent scrolling left past 0
// sort events
// all events slider

// variables
timeDifMin = 999999999999999999999999;
const seriesList = [...new Set(dataset.map(item => item.series))].sort();
const allEvents = dataset.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : -1);
const eventList = []
for (let i = 0; i < seriesList.length; i++) {
  eventList[i] = dataset.filter(item => item.series == seriesList[i]).sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : -1);
}

// listeners
// window.addEventListener("scroll", carouselOpacity(window.scrollY));
window.addEventListener("load", nextEvent);
window.addEventListener("load", loadData);

// functions
function nextEvent() {
  for (let i = 0; i < allEvents.length; i++) {
    proposedDate = Date.parse(allEvents[i].date);
    currentDate = Date.parse(Date()); timeDif=proposedDate - currentDate;
    if (timeDif>= 0) {
      if (timeDif < timeDifMin) {
        timeDifMin = timeDif;
        nextEvent = i;
      }
    }
  }
  document.getElementById("carousel-header").innerHTML = allEvents[nextEvent].series;
  document.getElementById("carousel-copy").innerHTML = allEvents[nextEvent].track;
  document.getElementById("carousel-button").href = allEvents[nextEvent].url;
  document.getElementById("carousel-image").src = allEvents[nextEvent].image;
}

function loadData() {
    const main = document.getElementById("main");
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    const text = document.createTextNode("Following");
    const div = document.createElement("div");
    main.appendChild(section);
    section.appendChild(h2);
    h2.appendChild(text);
    section.appendChild(div);
    div.id = "slider-all";
    for (let j = 0; j < allEvents.length; j++) {
      if (j == 0) {
        const button = document.createElement("a");
        button.className = "button-left";
        button.setAttribute("onclick", "scrollSlider('slider-0','l')");
        const buttontext = document.createTextNode("left");
        div.appendChild(button);
      }
      if (true) { //update to check for favorites only
        const anchor = document.createElement("a");
        anchor.className = "card";
        anchor.href = allEvents[j].url;
        anchor.target = "_blank";
        const img = document.createElement("img");
        img.src = allEvents[j].image;
        const textdiv = document.createElement("div");
        const series = document.createElement("p");
        const round = document.createElement("p");
        const date = document.createElement("p");
        const track = document.createElement("p");
        const seriestext = document.createTextNode(allEvents[j].series);
        const roundtext = document.createTextNode(allEvents[j].round);
        const datetext = document.createTextNode(allEvents[j].date);
        const tracktext = document.createTextNode(allEvents[j].track);
        div.appendChild(anchor);
        anchor.appendChild(img);
        textdiv.appendChild(series);
        series.className = "text-size-xl";
        series.appendChild(seriestext);
        anchor.appendChild(textdiv);
        textdiv.appendChild(round);
        round.className = "text-size-xl";
        round.appendChild(roundtext);
        textdiv.appendChild(track);
        track.className = "text-size-l";
        track.appendChild(tracktext);
        textdiv.appendChild(date);
        date.className = "text-size-m";
        date.appendChild(datetext);
        if (Date.parse(allEvents[j].date) < Date.parse(Date())) {
          anchor.classList.add("unavailable");
        }
      }
      if (j == allEvents.length - 1) {
        const button = document.createElement("a");
        button.className = "button-right";
        button.setAttribute("onclick", "scrollSlider('slider-0','r')");
        const buttontext = document.createTextNode("right");
        div.appendChild(button);
      }
    }
  
  
  
  for (let i = 0; i < seriesList.length; i++) {
    const main = document.getElementById("main");
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    const text = document.createTextNode(seriesList[i]);
    const div = document.createElement("div");
    main.appendChild(section);
    section.appendChild(h2);
    h2.appendChild(text);
    section.appendChild(div);
    div.id = "slider-" + [i];
    for (let j = 0; j < eventList[i].length; j++) {
      if (j == 0) {
        const button = document.createElement("a");
        button.className = "button-left";
        button.setAttribute("onclick", "scrollSlider('slider-0','l')");
        const buttontext = document.createTextNode("left");
        div.appendChild(button);
      }
      if (eventList[i][j].series == seriesList[i]) {
        const anchor = document.createElement("a");
        anchor.className = "card";
        anchor.href = eventList[i][j].url;
        anchor.target = "_blank";
        const img = document.createElement("img");
        img.src = eventList[i][j].image;
        const textdiv = document.createElement("div");
        const round = document.createElement("p");
        const date = document.createElement("p");
        const track = document.createElement("p");
        const roundtext = document.createTextNode(eventList[i][j].round);
        const datetext = document.createTextNode(eventList[i][j].date);
        const tracktext = document.createTextNode(eventList[i][j].track);
        div.appendChild(anchor);
        anchor.appendChild(img);
        anchor.appendChild(textdiv);
        textdiv.appendChild(round);
        round.className = "text-size-xl";
        round.appendChild(roundtext);
        textdiv.appendChild(track);
        track.className = "text-size-l";
        track.appendChild(tracktext);
        textdiv.appendChild(date);
        date.className = "text-size-m";
        date.appendChild(datetext);
        if (Date.parse(eventList[i][j].date) < Date.parse(Date())) {
          anchor.classList.add("unavailable");
        }
      }
      if (j == eventList[i].length - 1) {
        const button = document.createElement("a");
        button.className = "button-right";
        button.setAttribute("onclick", "scrollSlider('slider-0','r')");
        const buttontext = document.createTextNode("right");
        div.appendChild(button);
      }
    }
  }
}

function scrollSlider(id, direction) {
  d = document.getElementById(id);
  vw = window.innerWidth;
  base = parseFloat(getComputedStyle(document.documentElement).fontSize);
  num = Math.floor(vw / (base * 21.2));
  scrollOffset = num * base * 21.2;
  current = parseInt(getComputedStyle(d).left);
  if (direction == "r") {
    if (d.getBoundingClientRect().right > vw) {
      scrollTo = current - scrollOffset;
      d.style.left = scrollTo + "px";
    }
  }
  if (direction == "l") {
    if (d.getBoundingClientRect().left < 0) {
      scrollTo = current + scrollOffset;
      d.style.left = scrollTo + "px";
    }
  }
}

function carouselOpacity(sp) {
  vh = window.innerHeight;
  n = 1 - (2 * sp) / vh; //current position in vh
  document.getElementById("carousel").style.opacity = n;
}
