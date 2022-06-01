var slideIndex = 0;
document.getElementById("Prev").addEventListener("click", function () {
	showSlides(--slideIndex);
});
document.getElementById("Next").addEventListener("click", function () {
	showSlides(++slideIndex);
	console.log("next click");
});

function showContent(array) {
	var sliderShow = document.getElementById("sliderShow");

	for (let data of array) {
		//show image

		var date = new Date(data.date);
		var imageName = date.getMonth() + 1 + "_" + date.getDate();
		var container = document.createElement("div");
		container.className = "mySlides fade";
		var slideContainer = document.createElement("div");
		slideContainer.className = "my-slide-container";

		var image = document.createElement("img");
		image.src = "img/" + imageName + ".JPG";
		image.className = "skin_img";
		slideContainer.append(image);

		//show text
		var text = document.createElement("div");
		var Humidifier = data.Humidifier;
		var Skin = data.Skin_condition;
		var Eyes = data.Eyes_condition;
		var Feeling = data.Feeling;

		text.innerHTML =
			"<div id=day>" +
			date.toDateString() +
			"</div>" +
			"<div class=lable>" +
			"Humidifier" +
			"</div>" +
			Humidifier +
			"<div class=lable>" +
			"Skin Condition" +
			"</div>" +
			"<div id=Skin>" +
			Skin +
			"</div>" +
			"<div class=lable>" +
			"Eyes Condition" +
			"</div>" +
			"<div id=Eyes>" +
			Eyes +
			"</div>" +
			"<div class=lable>" +
			"Feeling" +
			"</div>" +
			"<div id=Feeling>" +
			Feeling +
			"</div>";
		text.className = "diary";
		slideContainer.append(text);

		container.append(slideContainer);
		sliderShow.append(container);
	}

	slideIndex = array.length;
	showSlides(slideIndex);
}

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("diary/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

//usage:
readTextFile("diary.json", function (text) {
	var data = JSON.parse(text);
	showContent(data);
});

function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	slides[slideIndex - 1].style.display = "block";
}
