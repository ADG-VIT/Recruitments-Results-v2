document.querySelector("#search").addEventListener("click", searchText);
document.querySelector(".input").addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.querySelector("#search").click();
	}
});

function searchText() {
	document.querySelector("#search").disabled = true;
	document.querySelector("#search").innerHTML = "Searching in the pile...";
	output = "";
	var search = document.querySelector(".input").value.toUpperCase().trim();
	const adg = `https://recruitment2022.herokuapp.com/user/getResult?regno=${search}`;
	fetch(adg)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			if (data.message == "User does Not Exist") {
				if (search == "") {
					output += `<p>Please enter a Registration Number</p>`;
				} else {
					output += `<p>Uh oh! Please enter the correct Registration Number.</p>`;
				}
			} else if (
				data.message ==
				"Hey, you missed it by a narrow margin. All the best for your future endeavours!"
			) {
				output += `<p>${data.message}</p>`;
			} else if (
				data.message ==
				"Hey, you missed it by a narrow margin. See you next year. Till then keep hustling."
			) {
				output += `<p>${data.message}</p>`;
			} else {
				output += `<div class="container info">      
            <p>
                ${data.message}
            </p> 
            </div>`;
			}
			document.querySelector(".output").innerHTML = output;
			document.querySelector("#search").disabled = false;
			document.querySelector("#search").innerHTML =
				"Check Round 1 Result";
		});
}
