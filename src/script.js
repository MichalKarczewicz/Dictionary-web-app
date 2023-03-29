let startBtn = document.querySelector(".start");
let textWrapper = document.querySelector(".text");
let dictionaryPage = document.querySelector(".dictionary");
let homePage = document.querySelector(".home");

let words = ["ever", "every", "everyo", "everyon", "everyone", "everyone..."];
let wordIndex = 0;
let deleting = false;

let dictionary = {
	fetchDictionary: function (word) {
		fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
			.then(response => response.json())
			.then(data => displayWord(data));
	},
};

const displayWord = data => {
	const wordInput = document.querySelector(".search-word");
	console.log("Received data:" + data);
	const { word, phonetic } = data[0];
	const { partOfSpeech } = data[0].meanings[0];
	const { definition } = data[0].meanings[0].definitions[0];
	const { example } = data[0].meanings[0].definitions[1];
	// console.log(typeof example);

	document.querySelector(".word").innerText = word;
	document.querySelector(".phonetic-word").innerText = phonetic;
	document.querySelector(".partOfSpeech").innerText = partOfSpeech;
	document.querySelector(".definition").innerText = definition;
	if (typeof example === "string") {
		document.querySelector(".example").innerText = example;
	} else {
		document.querySelector(".example").innerText = "No more info";
	}
};

const type = () => {
	const word = words[wordIndex];
	const speed = deleting ? 50 : 150;
	if (!deleting && textWrapper.textContent === word) {
		deleting = true;
		setTimeout(type, 800);
		return;
	}
	if (deleting && textWrapper.textContent === "e") {
		deleting = false;
		wordIndex = (wordIndex + 1) % words.length;
		setTimeout(type, 800);
		return;
	}
	let text = deleting
		? textWrapper.textContent.slice(0, -1)
		: word.slice(0, textWrapper.textContent.length + 1);
	textWrapper.textContent = text;
	setTimeout(type, speed);
};

startBtn.addEventListener("click", () => {
	homePage.classList.add("hide");
	dictionaryPage.classList.add("show");
	setTimeout(() => {
		homePage.style.display = "none";
		dictionaryPage.style.display = "block";
	}, 1000);
});

const search = () => {
	dictionary.fetchDictionary(document.querySelector(".search-bar").value);
};

document.querySelector(".search-bar").addEventListener("keyup", e => {
	if (e.key == "Enter") {
		search();
	}
});

document.querySelector(".search-button").addEventListener("click", () => {
	search();
});

window.onload = () => {
	type();
};

dictionary.fetchDictionary("word");
