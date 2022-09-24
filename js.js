"use strict";

const studentUrl = "https://petlatkea.dk/2021/hogwarts/students.json";
const bloodUrl = "https://petlatkea.dk/2021/hogwarts/families.json";

document.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let currentStudents = [];
let expelledStudents = [];
let seachBar = [];

let studentJSON;
let bloodJSON;

const filterButton = document.querySelectorAll("[data-action='filter']");
const sortOption = document.querySelectorAll("[data-action='sort'");

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

const settings = {
  filter: "all",
  sortBy: "firstName",
  sortDir: "asc",
  search: "",
};

async function start() {
  console.log("Klar");
  reigsterButtons();
  await loadStudentsJSON();
  await loadBloodJSON();
}

async function loadStudentsJSON() {
  const response = await fetch(studentUrl);
  const studentData = await response.json();
  studentJSON = studentData;
}

async function loadBloodJSON() {
  const response = await fetch(bloodUrl);
  const bloodData = await response.json();
  bloodJSON = bloodData;
}

function reigsterButtons() {
  filterButton.forEach((button) =>
    button.addEventListener("click", selectFilter)
  );

  sortOption.forEach((button) => button.addEventListener("click", selectSort));
}

function prepareObjects(jsonData) {
  console.log("Object Prepared");
  allStudents = jsonData.map(prepareObject);

  buildList();
}

function prepareObject(jsonObject) {
  console.log("ObjectS Prepared");
  const studentTemplate = Object.create(Student);

  //Trimming fullname + house
  let fullNameArray = jsonObject.fullname.trim();
  let studentHouse = jsonObject.house.trim();

  fullNameArray = fullNameArray.toLowerCase();
  fullNameArray = fullNameArray.split(" ");

  //firstName cleaned up
  let firstName = fullNameArray[0];
  firstName =
    firstName.substring(0, 1).toUpperCase() +
    firstName.substring(1).toLowerCase();
  studentTemplate.firstName = firstName;

  //middleName cleaned up
  let middleName = fullName.substring(
    fullName.indexOf(` `),
    fullName.lastIndexOf(` `)
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
  if (fullNameArray.length <= 6) {
    studentTemplate.lastName = "None";
  } else {
    lastName =
      lastName.substring(0, 1).toUpperCase() +
      lastName.substring(1).toLowerCase();
    studentTemplate.lastName = lastName;
  }

  //gender cleaned up
  let gender = gender[0].toUpperCase() + gender.substring(1);
  studentTemplate.gender = gender;

  //studentHouse cleaned up
  studentHouse =
    studentHouse.substring(0, 1).toUpperCase() +
    studentHouse.substring(1).toLowerCase();
  studentTemplate.studentHouse = studentHouse;

  console.log("hello: ", firstName);
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
}

//Sorting by firstName A-Z
function sortByFirstNameAZ() {}
//Sorting by firstName Z-A
function sortByFirstNameZA() {}

//Sorting by lastName A-Z
function sortByLastNameAZ() {}
//Sorting by lastName Z-A
function sortByLastNameZA() {}

function buildList() {}

function displayList() {}

function displayStudents() {}

function displayModal() {}

/* TRY TO DO CLEAING UP IN FUNCTIONS IF TIME 
function findFirstName() {}

function findMiddleName() {}

function findLastName() {}

function findLastNameHyphen() {}

function findNickName() {}

function findGender() {}

function findHouse() {}

function findBlood() {} */

function findImagePath() {}

function expelStudent() {}

function prefectToggle() {}

function squadToggle() {}

function hackerMan() {}
