var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
allEvents = [];
favoritesArray = [];
favoritesCount = 0;

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("scroll", function() {
  heroOpacity(window.scrollY);
}, false);

function init() {
  // get all events
  getAllEvents();

  // get favorites
  getFavorites();

  // prepare favorite dialog
  populateDialogFavorites();

  // prepare info dialog
  populateDialogInfo();

  // populate favorites
  populateFavorites();

  // populate feed
  populateFeed();

  // populate hero 
  populateHero();
}

function getAllEvents() {
  let k = 0;
  for (i = 0; i < dataset.length; i++) {
    for (j = 0; j < dataset[i].events.length; j++) {
      allEvents.push(dataset[i].events[j]);
      allEvents[k].series = dataset[i].series;
      allEvents[k].url = dataset[i].url;
      allEvents[k].logo = dataset[i].logo;
      k++;
    }
  }

  // sort all events by date
  allEvents.sort((x, y) => new Date(x.date) - new Date(y.date));
}

function getFavorites() {
  if (document.cookie.length > 10) {
    const favorites = getCookie('favorites');
    favoritesArray = favorites.split(",");
    favoritesArray.pop();
  }
  if (document.cookie.length == 10) {
    favoritesArray = []
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function heroOpacity(sp) {
  vh = window.innerHeight;
  //n = 1 - (2 * sp) / vh; //current position in vh
  n = 1 - (1.4 * sp / vh); //current position in vh
  document.getElementById("hero").style.opacity = n;
}

function populateDialogFavorites() {
  document.getElementById("button-favorite").addEventListener("click", function() {
    document.getElementById("dialog-favorite").showModal();
  }, false);

  let html = '';
  for (i = 0; i < dataset.length; i++) {
    friendlySeries = dataset[i].series.replace(/\s+/g, "-").toLowerCase();
    checkedStatus = " checked";
    if (favoritesArray.includes(dataset[i].series)) {
      checkedStatus = "";
    }
    html += `
    <div>
      <input type="checkbox" id="${friendlySeries}" name="${friendlySeries}" value="${dataset[i].series}" ${checkedStatus} />
      <label for="${friendlySeries}">${dataset[i].series}</label>
    </div>
    `;
  }
  const target = document.getElementById("form-checkbox");
  target.innerHTML = html;

  document.getElementById("dialog-favorite").addEventListener('close', updateFavorites);
}

function populateDialogInfo() {
  document.getElementById("button-info").addEventListener("click", function() {
    document.getElementById("dialog-info").showModal();
  }, false);
}

function populateFavorites() {
  getFavorites();
  
  dateCurrent = new Date;

  // create slider for custom series
  let html = "";
  html += `
    <h2 class="slider-title text-size-l shadow">
      <a href="" target="_blank">
        Following
      </a>
    </h2>
    <div class="slider-outer">
      <div class="slider-mid" id="slider-">
        <div class="slider-inner">
          <a class="nav-left" onclick="scrollSlider('slider-','l')">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.25 6.75L4.75 12L10.25 17.25"></path>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 12H5"></path>
            </svg>
          </a>
  `

  for (i = 0; i < allEvents.length; i++) {

      // create human readable date
      dateRaw = new Date(allEvents[i].date);
      monthRaw = dateRaw.getMonth();
      monthLong = months[monthRaw];
      monthShort = monthLong.substr(0, 3);
      dayRaw = dateRaw.getDate();
      weekdayRaw = dateRaw.getDay();
      weekdayLong = days[weekdayRaw];
      weekdayShort = weekdayLong.substr(0, 3);

      // assign class for cards
      cardClass = "";
      if (favoritesArray.includes(allEvents[i].series)) {
        cardClass = "hidden";
      }
      if (dateRaw < dateCurrent) {
        cardClass = "hidden";
      }

      html += `
        <a href="${allEvents[i].url}" target="_blank" class="${cardClass}">
          <div class="card">
              <img src="${allEvents[i].image}">
            <div>
              <div>
                <img src="${allEvents[i].logo}" alt="${allEvents[i].series}" />
                <p class="card-text-track text-size-m">${allEvents[i].title}</p>
              </div>
              <div>
                <p class="card-text-month text-size-2xl bold">${monthShort}</p>
                <p class="card-text-day text-size-4xl">${dayRaw}</p>
              </div>
              <p class="card-text-track text-size-m">${allEvents[i].track}</p>
            </div>
          </div>
        </a>
    `
  }

  html += `
          <a class="nav-right visible" onclick="scrollSlider('slider-','r')">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 6.75L19.25 12L13.75 17.25"></path>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H4.75"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;

  const target = document.getElementById("favorites");
  target.innerHTML = html;
}

function populateFeed() {
  dateCurrent = new Date;

  // Create slider for each individual series
  for (i = 0; i < dataset.length; i++) {
    if (dataset[i].events.length > 0) {
      friendlySeries = dataset[i].series.replace(/\s+/g, "-").toLowerCase();
      let html = "";
      html += `
        <section>
          <h2 class="slider-title text-size-l shadow">
            <a href="${dataset[i].url}" target="_blank">
              ${dataset[i].series}
            </a>
          </h2>
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
        weekdayLong = days[weekdayRaw];
        weekdayShort = weekdayLong.substr(0, 3);

        // assign class for cards
        cardClass = "";
        if (dateRaw < dateCurrent) {
          cardClass = " inactive";
        }
        
        html += `
                <a href="${dataset[i].url}" target="_blank">
                  <div class="card${cardClass}">
                    <img src="${dataset[i].events[j].image}">
                    <div>

                      <div>
                        <img src="${dataset[i].events[j].logo}" alt="${dataset[i].events[j].series}" />
                        <p class="card-text-track text-size-m">${dataset[i].events[j].title}</p>
                      </div>

                      <div>
                        <p class="card-text-month text-size-2xl bold">${monthShort}</p>
                        <p class="card-text-day text-size-4xl">${dayRaw}</p>
                      </div>
                      <p class="card-text-track text-size-m">${dataset[i].events[j].track}</p>
                    </div>
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
      const target = document.querySelector("main");
      target.innerHTML += html;
    }
  }
}

function populateHero() {
  dateCurrent = new Date();
  j = 0;

  for (i = 0; i < allEvents.length; i++) {
    dateCandidate = new Date(allEvents[i].date)
    if (dateCandidate >= dateCurrent) {
      if (!favoritesArray.includes(allEvents[i].series)) {
        j = i;
        break;
      }
    }
  }
  
  // create human readable date
  dateRaw = new Date(allEvents[j].date);
  monthRaw = dateRaw.getMonth();
  monthLong = months[monthRaw];
  monthShort = monthLong.substr(0, 3);
  dayRaw = dateRaw.getDate();
  weekdayRaw = dateRaw.getDay();
  weekdayLong = days[weekdayRaw];
  weekdayShort = weekdayLong.substr(0, 3);

  // Update the count down every 1 second
  var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = dateRaw - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("countdown-d").innerHTML = days;
  document.getElementById("countdown-h").innerHTML = hours.toString().padStart(2, "0");
  document.getElementById("countdown-m").innerHTML = minutes.toString().padStart(2, "0");
  document.getElementById("countdown-s").innerHTML = seconds.toString().padStart(2, "0");

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);

  
  let html = "";
  html += `
    <img id="hero-image" src="${allEvents[j].image}">
    <div class="hero-text">
      <p id="hero-header" class="text-size-2xl bold">${allEvents[j].series}</p>
      <p id="hero-copy" class="text-size-xl bold">${allEvents[j].title}: ${allEvents[j].track}</p>
      <div id="countdown">
        <p class="text-size-xl bold" id="countdown-d">00</p>
        <p class="text-size-xl bold" id="countdown-h">00</p>
        <p class="text-size-xl bold" id="countdown-m">00</p>
        <p class="text-size-xl bold" id="countdown-s">00</p>
        <p class="text-size-xs">Days</p>
        <p class="text-size-xs">Hours</p>
        <p class="text-size-xs">Minutes</p>
        <p class="text-size-xs">Seconds</p>
      </div>
      <p id="hero-title" class="text-size-l bold">${weekdayLong} ${monthLong} ${dayRaw}</p>
    </div>
  `;
  const target = document.getElementById("hero");
  target.innerHTML = html;
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
  base = parseInt(getComputedStyle(document.querySelector("html")).getPropertyValue("font-size"));
  gutter = parseInt(getComputedStyle(document.querySelector(":root")).getPropertyValue("--gutter"));
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

function updateFavorites() {
  favoritesCount = 0;
  favoritesList = "favorites=";
  favoritesCheckboxes = document.querySelectorAll("#form-checkbox input[type='checkbox']");
  for (i = 0; i < favoritesCheckboxes.length; i++) {
    if (favoritesCheckboxes[i].checked) {
      favoritesCount++;
    }
    else {
      favoritesList += favoritesCheckboxes[i].value + ",";
    }
  }
  if (favoritesCount == 0) {
    for (i = 0; i < favoritesCheckboxes.length; i++) {
      favoritesCheckboxes[i].checked = true;
    }
    favoritesArray = [];
    favoritesList = "favorites=";
  }
  document.cookie = favoritesList + "; max-age=31536000;";
  populateFavorites();
  populateHero();
}