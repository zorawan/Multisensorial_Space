var gridIndex = 0;

function showContent(array) {
	var grid = document.getElementById("grid");

	for (let data of array) {
		//show image

		var date = new Date(data.date);
		var imageName = date.getMonth() + 1 + "_" + date.getDate();
		var container = document.createElement("div");
		container.className = "myGrid";
		var gridContainer = document.createElement("div");
		gridContainer.className = "my-grid-container";

		var image = document.createElement("img");
		image.src = "img/" + imageName + ".JPG";
		image.className = "skin2_img";
		gridContainer.append(image);

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
			"<div id=Humidifier>" +
			Humidifier +
			"</div>" +
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
		gridContainer.append(text);

		container.append(gridContainer);
		grid.append(container);
	}

	slideIndex = array.length;
	showSlides(gridIndex);
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

function grid_gallary() {}
