/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */
fetch("https://cs571.org/s23/hw3/api/students", {
		headers: { "X-CS571-ID": "bid_2b48c7a36a98db55355d" }
	})
	.then(response => response.json())
	.then(students => {
		const studentsDiv = document.getElementById("students");
		studentsDiv.innerHTML = buildStudentsHtml(students);

		document.getElementById("search-btn").addEventListener("click", () => {
			const searchName = document.getElementById("search-name").value.trim().toLowerCase();
			const searchMajor = document.getElementById("search-major").value.trim().toLowerCase();
			const searchInterest = document.getElementById("search-interest").value.trim().toLowerCase();
			
			studentsDiv.innerHTML = buildStudentsHtml(students.filter(stud => {
					const { name, major, interests } = stud;
					const fullName = (name.first + ' ' + name.last).trim().toLocaleLowerCase();
					return fullName.includes(searchName) &&
						major.trim().toLowerCase().includes(searchMajor) &&
						interests.some(i => i.trim().toLowerCase().includes(searchInterest));
				})
			);
		});

		document.getElementById("reset-search-btn").addEventListener("click", () => {
			document.getElementById("search-name").value = "";
			document.getElementById("search-major").value = "";
			document.getElementById("search-interest").value = "";
			studentsDiv.innerHTML = buildStudentsHtml(students);
		});
	});


/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<strong><p>${stud.major}</p></strong>`;
	html += `<p>${stud.name.first} is taking ${stud.numCredits} and is ${stud.fromWisconsin ? '' : 'not '}from Wisconsin</p>`;
	html += `They have ${stud.interests.length} interests including...`;
	html += "<ul>";
	html += stud.interests.map(i => `<li>${i}</li>`).join("");
	html += "</ul></div>";
	return html;
}