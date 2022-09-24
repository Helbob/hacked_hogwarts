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
  expelled: false,
  prefect: false,
  squad: false,
  image: "",
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

function selectFilter() {
  console.log("Clicked");
}

function selectSort() {
  console.log("Chosen");
}
