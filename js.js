"use strict";

const studentUrl = "https://petlatkea.dk/2021/hogwarts/students.json";
const bloodUrl = "https://petlatkea.dk/2021/hogwarts/families.json";

document.addEventListener("DOMContentLoaded", start);

//My arrays
let allStudents = [];
let currentStudents = [];
let expelledStudents = [];
let seachBar = [];

//JSON stuff
let studentJSON;
let bloodJSON;

//Easier to use buttons / option
const filterButton = document.querySelectorAll("[data-action='filter']");
const sortOption = document.querySelectorAll("[data-action='sort'");
let searchInput = document.querySelector("#searching");

//My prototype
const Student = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  gender: "",
  house: "",
  blood: "",
  image: "",
  expelled: false,
  prefect: false,
  squad: false,
};

//Settings for sort / filter / search
const settings = {
  filter: "all",
  sortBy: "firstName",
  sortDir: "asc",
};

//Need await otherwise errors
async function start() {
  console.log("ready");
  reigsterButtons();
  await loadBloodJSON();
  await loadStudentsJSON();

  prepareObjects(studentJSON);
}

//Loading first JSON url
async function loadStudentsJSON() {
  const response = await fetch(studentUrl);
  const studentData = await response.json();
  studentJSON = studentData;
}

//Loading second JSON url
async function loadBloodJSON() {
  const response = await fetch(bloodUrl);
  const bloodData = await response.json();
  bloodJSON = bloodData;
}

//Buttuons click events
function reigsterButtons() {
  filterButton.forEach((button) =>
    button.addEventListener("click", selectFilter)
  );

  sortOption.forEach((button) => button.addEventListener("click", selectSort));

  searchInput.addEventListener("input", searchList);
}

//Prepareing stuff
function prepareObjects(jsonData) {
  console.log("Object Prepared");
  allStudents = jsonData.map(prepareObject);

  displayList(allStudents);
}

//Cleaing up my data + blood (Do this in seperate functions if time)
function prepareObject(jsonObject) {
  console.log("ObjectS Prepared");

  //Creating students
  const studentTemplate = Object.create(Student);

  //Trimming fullname + house
  let fullname;
  fullname = jsonObject.fullname.trim();
  fullname = fullname.toLowerCase();
  let fullNameArray = fullname.split(" ");

  let studentHouse = jsonObject.house.trim();

  let gender = jsonObject.gender.trim();

  //firstName cleaned up
  let firstName = fullNameArray[0];
  firstName =
    firstName.substring(0, 1).toUpperCase() +
    firstName.substring(1).toLowerCase();
  studentTemplate.firstName = firstName;

  //middleName cleaned up
  let middleName = fullname.substring(
    fullname.indexOf(` `),
    fullname.lastIndexOf(` `)
  );
  if (middleName === "") {
    studentTemplate.middleName = " ";
  } else {
    middleName =
      middleName.substring(1, 2).toUpperCase() +
      middleName.substring(2).toLowerCase();
    studentTemplate.middleName = middleName;
  }

  //lastName cleaned up
  let lastName = fullNameArray[fullNameArray.length - 1];
  if (fullname.length <= 6) {
    studentTemplate.lastName = "None";
  } else {
    lastName =
      lastName.substring(0, 1).toUpperCase() +
      lastName.substring(1).toLowerCase();
    studentTemplate.lastName = lastName;
  }

  //gender cleaned up
  gender = gender[0].toUpperCase() + gender.substring(1);
  studentTemplate.gender = gender;

  //studentHouse cleaned up
  studentHouse =
    studentHouse.substring(0, 1).toUpperCase() +
    studentHouse.substring(1).toLowerCase();
  studentTemplate.studentHouse = studentHouse;

  //image cleaned up
  let image;
  if (fullname.includes("leanne")) {
    image = " ";
  } else if (fullname.toLowerCase().includes("patil")) {
    image = `./images/patil_${studentTemplate.firstName.toLowerCase()}.png`;
  } else if (fullname.includes("-")) {
    image = `./images/${fullname
      .substring(fullname.lastIndexOf("-") + 1)
      .toLowerCase()}_${studentTemplate.firstName[0].toLowerCase()}.png`;
  } else {
    image = `./images/${fullname
      .substring(fullname.lastIndexOf(" ") + 1)
      .toLowerCase()}_${studentTemplate.firstName[0].toLowerCase()}.png`;
  }
  studentTemplate.image = image;

  //Bloodstatus done in function (Need the rest as well)
  let blood = findBlood(studentTemplate.lastName);
  studentTemplate.blood = blood;

  let prefect;
  prefect = false;
  studentTemplate.prefect = prefect;

  //Pushing them into array
  allStudents.push(studentTemplate);
  currentStudents.push(studentTemplate);
  console.log(studentTemplate);
  return studentTemplate;
}

//Filtering
function selectFilter(event) {
  console.log("Clicked");
  const filter = event.target.dataset.filter;
  filterList(filter);
}

function filterList(filter) {
  let filteredList = currentStudents;

  if (filter === "hufflepuff") {
    filteredList = filteredList.filter(isHufflePuff);
  } else if (filter === "gryffindor") {
    filteredList = filteredList.filter(isGryffindor);
  } else if (filter === "slytherin") {
    filteredList = filteredList.filter(isSlytherin);
  } else if (filter === "ravenclaw") {
    filteredList = filteredList.filter(isRavenclaw);
  } else if (filter === "all") {
    filteredList = filteredList.filter(showAllStudents);
  }

  displayList(filteredList);
}

function showAllStudents() {
  return currentStudents;
}

//isXHouse Functions for selectFilter
function isHufflePuff(student) {
  return student.studentHouse === "Hufflepuff";
}
function isGryffindor(student) {
  return student.studentHouse === "Gryffindor";
}
function isSlytherin(student) {
  return student.studentHouse === "Slytherin";
}
function isRavenclaw(student) {
  return student.studentHouse === "Ravenclaw";
}

//Sorting
function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  sortList(sortBy);
}

//More sorting
function sortList(sortBy) {
  console.log("Chosen");
  let sortedList = currentStudents;
  if (sortBy === "firstName") {
    sortedList = sortedList.sort(sortByFirstNameAZ);
  } else if (sortBy === "lastName") {
    sortedList = sortedList.sort(sortByLastNameAZ);
  } else if (sortBy === "firstNameZA") {
    sortedList = sortedList.sort(sortByFirstNameZA);
  } else if (sortBy === "lastNameZA") {
    sortedList = sortedList.sort(sortByLastNameZA);
  }

  displayList(sortedList);
}

//Sorting by firstName A-Z
function sortByFirstNameAZ(studentA, studentB) {
  if (studentA.firstname < studentB.firstname) {
    return -1;
  } else {
    return 1;
  }
} //Sorting by firstName Z-A
function sortByFirstNameZA(studentA, studentB) {
  if (studentA.firstname > studentB.firstname) {
    return -1;
  } else {
    return 1;
  }
}

//Sorting by lastName A-Z
function sortByLastNameAZ(studentA, studentB) {
  if (studentA.lastName < studentB.lastName) {
    return -1;
  } else {
    return 1;
  }
}
//Sorting by lastName Z-A
function sortByLastNameZA(studentA, studentB) {
  if (studentA.lastName > studentB.lastName) {
    return -1;
  } else {
    return 1;
  }
}

//Buildlist
function buildList() {
  const currentList = filterList(allStudents);
  const sortedList = sortList(currentList);

  displayList(sortedList);
}

//Emptying list and then putting students in
function displayList(student) {
  document.querySelector("#container").innerHTML = "";

  student.forEach(displayStudents);
  displayCount(student);
}

//Displays the students in the template with info needed
function displayStudents(student) {
  const klon = document.querySelector("#newtemp").content.cloneNode(true);
  const container = document.querySelector("#container");

  klon.querySelector("#name").textContent =
    student.firstName + " " + student.middleName + " " + student.lastName;
  klon.querySelector("#test").src = student.image;
  klon.querySelector("#hus").textContent = student.studentHouse;
  klon.querySelector("#gender").textContent = student.gender;

  //PREFECT TOGGLE
  if (student.prefect === true) {
    klon.querySelector("#prefect").src = `/images/prefect.png`;
  } else {
    klon.querySelector("#prefect").src = `/images/non-prefect.png`;
  }
  klon.querySelector("#prefect").addEventListener("click", prefectToggle);
  function prefectToggle() {
    if (student.prefect === true) {
      student.prefect = false;
    } else {
      tryToMakePrefect(student);
    }
    displayList(currentStudents);
  }

  //SQUAD TOGGLE
  if (student.squad === true) {
    klon.querySelector("#squad").src = `/images/squad.png`;
  } else {
    klon.querySelector("#squad").src = `/images/non-squad.png`;
  }
  klon.querySelector("#squad").addEventListener("click", squadToggle);
  function squadToggle() {
    if (student.squad === true) {
      student.squad = false;
    } else {
      tryToMakeSquad(student);
    }
    displayList(currentStudents);
  }

  //Click for detailsModal
  klon
    .querySelector("#showmore")
    .addEventListener("click", () => displayModal(student));
  container.appendChild(klon);
}

//Details in the detailsModal
function displayModal(student) {
  console.log("hej");

  document.querySelector("#popup").classList.remove("hide2");
  document
    .querySelector("#popup .closebuttons")
    .addEventListener("click", closeModal);
  document.querySelector(".expel").addEventListener("click", expelStudent);
  popup.querySelector("#fullname").textContent =
    student.firstName + " " + student.middleName + " " + student.lastName;
  popup.querySelector(".gender").textContent = "Gender: " + student.gender;
  popup.querySelector(".house").textContent = "From: " + student.studentHouse;
  popup.querySelector("#studentimg").src = student.image;
  popup.querySelector("#crest").src = `images/${student.studentHouse}.png`;
  popup.querySelector(".blood").textContent = "Bloodtype: " + student.blood;

  function closeModal() {
    document.querySelector("#popup").classList.add("hide2");
  }
  displayList(currentStudents);
}

/* TRY TO DO CLEAING UP + BLOOD IN FUNCTIONS IF TIME 
function findFirstName() {}

function findMiddleName() {}

function findLastName() {}

function findLastNameHyphen() {}

function findNickName() {}

function findGender() {}

function findHouse() {}
*/
function findBlood(lastName) {
  let blood = "Muggle";
  if (bloodJSON.half.includes(lastName)) {
    blood = "Halfblood";
  } else if (bloodJSON.pure.includes(lastName)) {
    blood = "Pureblood";
  }
  return blood;
}

//TRY TO DO CLEAING UP + BLOOD IN FUNCTIONS IF TIME
//function findImagePath() {}

function expelStudent(student) {}

//Prefect toggle  w/ restrictions
function tryToMakePrefect(selectedStudent) {
  const allPrefects = currentStudents.filter((student) => student.prefect);

  const prefects = allPrefects.filter(
    (prefect) => prefect.studentHouse === selectedStudent.studentHouse
  );
  const other = prefects
    .filter(
      (prefects) =>
        selectedStudent.studentHouse &&
        prefects.gender === selectedStudent.gender
    )
    .shift();

  if (other !== undefined) {
    removeOther(other);
  } else {
    makePrefect(selectedStudent);
  }

  //Displays the dialogbox asking if you want to remove the other prefect
  //Also removes the other if thats chosen
  function removeOther(other) {
    document.querySelector("#remove_other").classList.remove("hide");
    document
      .querySelector("#remove_other .closebutton")
      .addEventListener("click", closeDialog);
    document
      .querySelector("#removeother")
      .addEventListener("click", clickRemoveOther);

    function closeDialog() {
      document.querySelector("#remove_other").classList.add("hide");
      document
        .querySelector("#remove_other .closebutton")
        .removeEventListener("click", closeDialog);
      document
        .querySelector("#removeother")
        .removeEventListener("click", clickRemoveOther);
    }

    function clickRemoveOther() {
      removePrefect(other);
      makePrefect(selectedStudent);
      displayList(currentStudents);
      closeDialog();
    }
  }

  function removePrefect(prefectStudent) {
    prefectStudent.prefect = false;
  }

  function makePrefect(prefectos) {
    prefectos.prefect = true;
  }
}

//Squad toggle w/ restrictions
function tryToMakeSquad(selectedStudent) {
  if (
    selectedStudent.studentHouse === "Slytherin" ||
    selectedStudent.blood === "Pureblood"
  ) {
    isPureOrSlyth(selectedStudent);
  } else {
    selectedStudent.squad = false;
    notPureOrSlyth();
  }

  function isPureOrSlyth(selectedStudent) {
    //need to toggle on it so like !== true? or smth idfk
    selectedStudent.squad = true;
    //console.log(selectedStudent.squad);
  }

  function notPureOrSlyth() {
    //make a popup instead of alert
    document.querySelector("#notsquad").classList.remove("hide");

    document
      .querySelector("#notsquad .closebutton")
      .addEventListener("click", closeWindow);
    document
      .querySelector("#closebuttonok")
      .addEventListener("click", closeWindow);

    function closeWindow() {
      document.querySelector("#notsquad").classList.add("hide");
    }
    // alert("NOT PURE OR SLYTH NO CAN DO SIR");
  }
}

//Search function
function searchList() {
  //Takes value from input puts it in lowercase
  let input = searchInput.value.toLowerCase();
  let searchResult = currentStudents.filter(searchForX);

  //Able to search for firstName, middleName, lastName, bloodType and gender
  function searchForX(student) {
    if (
      student.firstName.toString().toLowerCase().includes(input) ||
      student.middleName.toString().toLowerCase().includes(input) ||
      student.lastName.toString().toLowerCase().includes(input) ||
      student.blood.toString().toLowerCase().includes(input) ||
      student.gender.toString().toLowerCase().includes(input)
    ) {
      return true;
    }
    return false;
  }
  if (input === " ") {
    displayList(currentStudents);
  }
  displayList(searchResult);
}

function hackerMan() {
  /* let hackerMan = {
    firstName: "hackerman",
    middleName: "",
    lastName: "",
    nickName: "",
    gender: "",
    house: "",
    blood: "",
    image: "",
    expelled: false,
    prefect: false,
    squad: false,
  }; */
  //Put yourself in (Hackerman)
  //Break blood
  //CANNOT expel hackerman popup "CANNOT EXPEL HACKERMAN SMILER"
  //hackerman picture = ezclap or some pepe or just a frog for the memes
  //if (student.blood === "Pure"){do something so blood is random}
  // maybe whenever a filter is clicked, do the randomBlood(); function
  //settimeout for squads = settimeout(removeFromSqaud,“5000”) or smth simmilar
}

//Currently displays only count of ALL students
//Missing for House and expelled students
function displayCount() {
  let lenghts = currentStudents.length;
  document.querySelector(
    "#totalstudents"
  ).textContent = `Total Students: ${lenghts}`;
}
