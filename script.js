// to do
// auto scroll sliders to first non-epired event
// prevent scrolling left past 0
// sort events
// all events slider

// variables
timeDifMin = 999999999999999999999999;

// listeners
window.addEventListener("scroll", function() {
  carouselOpacity(window.scrollY);
});
window.addEventListener("load", loadData);

// functions
function carouselOpacity(sp) {
  vh = window.innerHeight;
  n = 1 - (2 * sp) / vh; //current position in vh
  document.getElementById("carousel").style.opacity = n;
}

function loadData() {
  const seriesList = [...new Set(dataset.map(item => item.series))].sort();
  const eventList = []
  
  for (let i = 0; i < seriesList.length; i++) {
    eventList[i] = dataset.filter(item => item.series == seriesList[i]).sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : -1);
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
        const button = document.createElement("a")
        button.className = "button-left";
        button.onclick = scrollSlider("slider" + i,"l")
        const buttontext = document.createTextNode("left");
        div.appendChild(button)
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
        const button = document.createElement("a")
        button.className = "button-right";
        button.onclick = scrollSlider("slider" + i,"r")
        const buttontext = document.createTextNode("right");
        div.appendChild(button)
      }

      //determine next event
      proposedDate = Date.parse(dataset[j].date);
      currentDate = Date.parse(Date());
      timeDif = proposedDate - currentDate;
      if (timeDif >= 0) {
        if (timeDif < timeDifMin) {
          timeDifMin = timeDif;
          nextEvent = j;
        }
      }
    }
  }

  document.getElementById("carousel-header").innerHTML =
    dataset[nextEvent].series;
  document.getElementById("carousel-copy").innerHTML =
    dataset[nextEvent].track;
  document.getElementById("carousel-button").href =
    dataset[nextEvent].url;
  document.getElementById("carousel-image").src =
    dataset[nextEvent].image;
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
