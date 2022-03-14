document.querySelector("#search").addEventListener("click", searchText);
document.querySelector(".input").addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.querySelector("#search").click();
	}
});

document.querySelector("#discord").addEventListener("click", openDiscord);
function openDiscord() { 
	window.location.href = "https://discord.gg/afF568T6de";
}

function searchText() {
	document.querySelector("#search").disabled = true;
	document.querySelector("#search").innerHTML = "Searching in the pile...";
	var rejected = document.querySelector("#rejected");
	var selected = document.querySelector("#selected");
	var form = document.querySelector("#mainForm");
	var nameText = document.querySelector("#name");
	var nameText1 = document.querySelector("#name1");
	var domainText = document.querySelector("#domain");
	//var interviewText = document.querySelector("#date");
	output = "";
	var search = document.querySelector(".input").value.toUpperCase().trim();
	console.log(search);
	const adg = `https://recruitment2022.herokuapp.com/user/getResults?regno=${search}`;
	fetch(adg)
		.then(function (res) {
			// console.log(res.json());
			return res.json();
		})
		.then(function (data) {
			console.log(data);
			//No Record Found
			if (
				data.msg == "Invalid Registration Number" ||
				data.msg == "User not found"
			) {
				if (search == "") {
					output += `<p class="error">Please enter a Registration Number</p>`;
				} else {
					output += `<p class="error">Uh oh! We could not find your Registration Number.</p>`;
				}
			}
			//Result awaited
			else if (data.msg == "Result Awaited") {
				output += `<p class="error">Results are currently awaited, they will be released soon.</p>`;
			}
			//Rejected
			else if (
				data.user.isSelectedTechnical == false &&
				data.user.isSelectedDesign == false &&
				data.user.isSelectedManagement == false
			) {
				// console.log(data.user.name);
				nameText1.innerHTML = data.user.name;
				rejected.style.display = "flex";
				mainForm.style.display = "none";
			}
			//Selected in Tech
			else if (data.user.isSelectedTechnical == true) {
				nameText.innerHTML = data.user.name;
				// interviewText.innerHTML =
				// 	data.user.interDate + ", " + data.user.timeOfInter + "PM";
				if (data.user.isSelectedManagement == true) {
					domainText.innerHTML =
						"under Technical and Management Domain";
				} else if (data.user.isSelectedDesign == true) {
					domainText.innerHTML = "under Technical and Design Domain";
				} else {
					domainText.innerHTML = "under Technical Domain";
				}
				selected.style.display = "flex";
				mainForm.style.display = "none";
			}
			//Selected in Management
			else if (data.user.isSelectedManagement == true) {
				nameText.innerHTML = data.user.name;
				// interviewText.innerHTML =
				// 	data.user.interDate + ", " + data.user.timeOfInter + "PM";
				if (data.user.isSelectedDesign == true) {
					domainText.innerHTML = "under Management and Design Domain";
				} else {
					domainText.innerHTML = "under Management Domain";
				}
				selected.style.display = "flex";
				mainForm.style.display = "none";
			} else if (data.user.isSelectedDesign == true) {
				nameText.innerHTML = data.user.name;
				// interviewText.innerHTML =
				// 	data.user.interDate + ", " + data.user.timeOfInter + "PM";
				domainText.innerHTML = "under Design Domain";
				selected.style.display = "flex";
				mainForm.style.display = "none";
			} else {
				nameText.innerHTML = data.user.name;
				// interviewText.innerHTML =
				// 	data.user.interDate + ", " + data.user.timeOfInter + "PM";
				domainText.innerHTML =
					"under Technical, Management and Design Domain";
				selected.style.display = "flex";
				mainForm.style.display = "none";
			}

			document.querySelector(".output").innerHTML = output;
			document.querySelector("#search").disabled = false;
			document.querySelector("#search").innerHTML =
				"Recruitments '22 Result";
		});
}
