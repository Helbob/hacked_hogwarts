"use strict";

const studentUrl = "https://petlatkea.dk/2021/hogwarts/students.json";
const bloodUrl = "https://petlatkea.dk/2021/hogwarts/families.json";

document.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let expelledStudent = [];
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

function prepareObject() {
  console.log("Object Prepared");
}

function prepareObjects() {
  console.log("ObjectS Prepared");
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

function findFirstName() {}

function findMiddleName() {}

function findLastName() {}

function findLastNameHyphen() {}

function findNickName() {}

function findGender() {}

function findHouse() {}

function findBlood() {}

function findImagePath() {}

function expelStudent() {}

function prefectToggle() {}

function squadToggle() {}

function hackerMan() {}
