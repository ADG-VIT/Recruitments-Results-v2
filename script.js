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
	output = "";
	var search = document.querySelector(".input").value.toUpperCase().trim();
	const adg = `https://recruitment2022.herokuapp.com/user/getResult?regno=${search}`;
	fetch(adg)
		.then(function (res) {
			// console.log(res.json());
			return res.json();
		})
		.then(function (data) {
			console.log(data);
			//No Record Found
			if (data.message == "User does Not Exist") {
				if (search == "") {
					// output += `<p class="error">Please enter a Registration Number</p>`;
					output += `<p class="error">${data.status}</p>`;
				} else {
					output += `<p class="error">Uh oh! Please enter the correct Registration Number.</p>`;
				}
			}
			//Rejected
			else if (
				data.message ==
				"Hey, you missed it by a narrow margin. All the best for your future endeavours!"
			) {
				// output += `<p>${data.message}</p>`;
				rejected.style.display = "flex";
				mainForm.style.display = "none";
			} else if (
				data.message ==
				"Hey, you missed it by a narrow margin. See you next year. Till then keep hustling."
			) {
				//output += `<p>${data.message}</p>`;
				rejected.style.display = "flex";
				mainForm.style.display = "none";
			}
			//Selected in Tech
			else {
				/*output += `<div class="container info">   
				
            <p>
                ${data.message}
            </p> 
            </div >`;*/
				selected.style.display = "flex";
				mainForm.style.display = "none";
			}
			//Selected in Management

			//Selected in Design

			//Selected in TM

			//Selected in TD

			//Selected in MD

			//Selected in TMD

			document.querySelector(".output").innerHTML = output;
			document.querySelector("#search").disabled = false;
			document.querySelector("#search").innerHTML =
				"Check Round 1 Result";
		});
}
