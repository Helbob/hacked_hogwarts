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
  search: "",
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
  let bloodStatus = findBlood(studentTemplate.lastName);
  studentTemplate.bloodStatus = bloodStatus;

  //Pushing them into array
  allStudents.push(studentTemplate);
  currentStudents.push(studentTemplate);
  console.log(studentTemplate);
  return studentTemplate;
}

//Filtering
function selectFilter() {
  console.log("Clicked");
}

//isXHouse Functions for selectFilter
function isHufflePuff() {}
function isGryffindor() {}
function isSlytherin() {}
function isRavenclaw() {}

//Sorting
function selectSort() {
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

  //displayList(sortedList);
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

function buildList() {}

function displayList() {}

function displayStudents() {}

function displayModal() {}

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
  let familyStatus = "Muggle-born";
  if (lastName === "No Last Name") {
    familyStatus = "Unknown";
  } else if (bloodJSON.half.includes(lastName)) {
    familyStatus = "Halfblood";
  } else if (bloodJSON.pure.includes(lastName)) {
    familyStatus = "Pureblood";
  }
  return familyStatus;
}

function findImagePath() {}

function expelStudent() {}

function prefectToggle() {}

function squadToggle() {}

function hackerMan() {}
