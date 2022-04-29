// variables
timeDifMin = 999999999999999999999999;

// listeners
window.addEventListener("scroll", function () {
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

	const seriesList = [...new Set(dataset.map(item => item.series))];
	console.log(unique);

	
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

		for (let j = 0; j < dataset.length; j++) {
			if (j == 0) {
				//first
			}
			
			if (dataset[j].series == seriesList[i]) {
			const anchor = document.createElement("a");
			anchor.className = "card";
			anchor.href = dataset[j].url;
			anchor.target = "_blank";
			const img = document.createElement("img");
			img.src = dataset[j].image;
			const textdiv = document.createElement("div");
			const round = document.createElement("p");
			const date = document.createElement("p");
			const track = document.createElement("p");
			
			const roundtext = document.createTextNode(dataset[j].round);
			const datetext = document.createTextNode(dataset[j].date);
			const tracktext = document.createTextNode(dataset[j].track);
			
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
			
			if (Date.parse(dataset[j].date) < Date.parse(Date())) {
					anchor.classList.add("unavailable");
			}
				
			}
			
			if (j == dataset.length) {
				//last
			}

			//determine next event
			proposedDate = Date.parse(dataset[j].date);
			currentDate = Date.parse(Date());
			timeDif = proposedDate - currentDate;
				if (timeDif < timeDifMin) {
					timeDifMin = timeDif;
					nextEvent = j;
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
