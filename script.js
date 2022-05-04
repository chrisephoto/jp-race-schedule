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

// functions
function init() {
  window.addEventListener("scroll", carouselOpacity(window.scrollY));
  nextEvent();
  createSlider(allEvents,"following");
  for (i = 0; i < seriesList.length; i++) {
    createSlider(eventList[i]);
  }
}

function createSlider(data, opt1, opt2, opt3, opt4) {
  //data - array of events
  //opt 1 - string = override heading
  //opt 2 - hide = hide past events
	
  opt1 = (typeof opt1 !== 'undefined') ?  opt1 : data[0].series;
  
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
  
  main.appendChild(section);
  section.appendChild(sliderTitle);
  sliderTitle.appendChild(document.createTextNode(opt1))
  section.appendChild(sliderOuter);
  sliderOuter.appendChild(sliderMid);
  sliderMid.appendChild(sliderInner);
  sliderMid.appendChild(sliderInner);
  sliderInner.appendChild(buttonLeft);
  
  for (let j = 0; j < data.length; j++) {
    const anchor = document.createElement("a");
    anchor.className = "card";
    anchor.href = data[j].url;
    anchor.target = "_blank";
    const img = document.createElement("img");
    img.src = data[j].image;
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
    if (Date.parse(data[j].date) < Date.parse(Date())) {
      anchor.classList.add("unavailable");
    }
  }
  const buttonRight = document.createElement("a");
  buttonRight.className = "nav-right";
  buttonRight.setAttribute("onclick", "scrollSlider('slider-" + opt1 + "','r')");
  
  sliderInner.appendChild(buttonRight);
}

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

function scrollSlider(id, direction) {
	if (direction == "l") {
		i = -1;
	}
	else if (direction == "r") {
		i = 1;
	}
	else {
		i = 0;
	}
	vw = window.innerWidth;
	//count = getComputedStyle(document.querySelector(":root")).getPropertyValue('--card-count');
	//scrollIncrement = vw / count;
	document.getElementById(id).scrollBy({
		top: 0,
		left: vw * i,
		behavior: "smooth"
	});
}

function carouselOpacity(sp) {
  console.log(window.scrollY);
  vh = window.innerHeight;
  //n = 1 - (2 * sp) / vh; //current position in vh
  n = 1 - (sp / vh); //current position in vh
  console.log(n)
  document.getElementById("carousel").style.opacity = n;
}
