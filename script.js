// option to hide past events

// variables
timeDifMin = 999999999999999999999999;
const seriesList = [...new Set(dataset.map(item => item.series))].sort();
const allEvents = dataset.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : -1);
const eventList = []
for (let i = 0; i < seriesList.length; i++) {
  eventList[i] = dataset.filter(item => item.series == seriesList[i]).sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : -1);
}

// listeners
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("scroll", function() {
  carouselOpacity(window.scrollY);
}, false);


// functions
function init() {
  nextEvent();
  createSlider(allEvents, "following", "hide");
  for (i = 0; i < seriesList.length; i++) {
    createSlider(eventList[i]);
  }
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
  const sliderMid = document.createElement("div");
  sliderMid.className = "slider-mid";
  sliderMid.id = "slider-" + opt1;
  const sliderInner = document.createElement("div");
  sliderInner.className = "slider-inner";
  const buttonLeft = document.createElement("a");
  buttonLeft.className = "nav-left";
  buttonLeft.setAttribute("onclick", "scrollSlider('slider-" + opt1 + "','l')");
  const buttonRight = document.createElement("a");
  buttonRight.className = "nav-right visible";
  buttonRight.setAttribute("onclick", "scrollSlider('slider-" + opt1 + "','r')");

  main.appendChild(section);
  section.appendChild(sliderTitle);
  sliderTitle.appendChild(document.createTextNode(opt1.replace("-", /\s+/g)))
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
      sliderInner.appendChild(anchor); anchor.appendChild(img); textdiv.appendChild(series); series.className = "text-size-xl"; series.appendChild(seriestext); anchor.appendChild(textdiv); textdiv.appendChild(round); round.className = "text-size-xl"; round.appendChild(roundtext); textdiv.appendChild(track); track.className = "text-size-l"; track.appendChild(tracktext); textdiv.appendChild(date); date.className = "text-size-m"; date.appendChild(datetext);
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
    document.getElementById("carousel-header").innerHTML = allEvents[nextEvent].series + " at " + allEvents[nextEvent].track;
    document.getElementById("carousel-copy").innerHTML = allEvents[nextEvent].date;
    document.getElementById("carousel-button").href = allEvents[nextEvent].url;
    document.getElementById("carousel-image").src = allEvents[nextEvent].image;
  }

  function scrollSlider(id, direction) {
    if (direction == "l") {
      i = -1;
    } else if (direction == "r") {
      i = 1;
    } else {
      i = 0;
    }
    
    console.log(i);
    console.log(id);
    console.log(direction);
    
    vw = window.innerWidth;
    current = document.getElementById(id).scrollLeft;
    remain = document.getElementById(id).scrollWidth - current;
    document.getElementById(id).scrollBy({
      top: 0,
      left: vw * i,
      behavior: "smooth"
    });
    if (direction == "l") {
      if (document.getElementById(id).scrollLeft <= vw) {
        document.querySelector("#" + id + " .nav-left").classList.remove("visible");
      }
      document.querySelector("#" + id + " .nav-right").classList.add("visible");
    }
    if (direction == "r") {
      if (remain <= 2 * vw) {
        document.querySelector("#" + id + " .nav-right").classList.remove("visible");
      }
      document.querySelector("#" + id + " .nav-left").classList.add("visible");
    }
  }

  function carouselOpacity(sp) {
    vh = window.innerHeight;
    //n = 1 - (2 * sp) / vh; //current position in vh
    n = 1 - (1.4 * sp / vh); //current position in vh
    document.getElementById("carousel").style.opacity = n;
  }
