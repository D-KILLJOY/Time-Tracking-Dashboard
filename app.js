const navItem = document.querySelectorAll(".nav-item");
const currentTime = document.querySelectorAll(".curr-time");
const prevText = document.querySelectorAll(".prev-text");
const prevTime = document.querySelectorAll(".prev-time");

let timeframe = "weekly";

async function UserData(arg) {
	const res = await fetch("./data.json");
	const data = await res.json();

	function filterData(arg) {
		return data.map((item) => {
			return {
				title: item.title,
				current: item.timeframes[arg].current,
				previous: item.timeframes[arg].previous,
			};
		});
	}

	console.log(filterData(arg));

	displayData(filterData(arg));
}

UserData("weekly");

navItem.forEach((navBtn) => {
	navBtn.addEventListener("click", () => {
		navItem.forEach((btn) => {
			btn.classList.remove("active");
		});

		navBtn.classList.add("active");

		const btnAtt = navBtn.getAttribute("id");
		timeframe = btnAtt;
		UserData(btnAtt);
	});
});

const displayData = (data) => {
	data.forEach((item, index) => {
		currentTime.forEach((time) => {
			time = currentTime[index];
			time.textContent = item.current;
		});
		prevTime.forEach((time) => {
			time = prevTime[index];
			time.textContent = item.previous;
		});
	});
	prevText.forEach((text, index) => {
		text = prevText[index];
		if (timeframe === "daily") {
			text.textContent = "Yesterday";
		} else if (timeframe === "weekly") {
			text.textContent = "Last Week";
		} else if (timeframe === "monthly") {
			text.textContent = "Last Month";
		}
	});
};
