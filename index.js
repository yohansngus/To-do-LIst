//GETTING ELEMENTS

const body = document.querySelector("body");
const container = document.querySelector(".container");
const input = document.querySelector("input");
const addBtn = document.querySelector(".add");
const output = document.querySelector(".output");

//ID GENERATOR FUNCITION

function generateID() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

//ADDING TASK

addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") return;

  //TASK OBJECT

  const newTask = {
    id: generateID(),
    text: value,
  };

  //CREATING ELEMENTS

  creatingElements(newTask);

  //LOCAL STORAGE

  let itmes = JSON.parse(localStorage.getItem("todoItems")) || [];
  itmes.push(newTask);
  localStorage.setItem("todoItems", JSON.stringify(itmes));

  //RESETING THE INPUT VALUE

  input.value = "";
});

//CREATING ELEMENTS

function creatingElements(inpValue) {
  const newDiv = document.createElement("div");
  const newFinished = document.createElement("div");
  const newoutput = document.createElement("div");
  const newCloses = document.createElement("div");

  //ADDING CLASS NAME

  newDiv.classList.add("newDiv");
  newFinished.classList.add("newFinished");
  newoutput.classList.add("newoutput");
  newCloses.classList.add("newClose");

  //APPENDING TO THEIR PARENT ELEMENT

  output.prepend(newDiv);
  newDiv.append(newFinished, newoutput, newCloses);

  //INNER HTML

  newFinished.innerHTML = "O";
  newCloses.innerHTML = "X";
  newoutput.innerHTML = inpValue.text;

  //COMPLETED TASK

  newFinished.addEventListener("click", () => {
    newoutput.classList.toggle("newDivfinished");
    newFinished.classList.toggle("newFinsishednewDiv");
  });

  //DELETING TASK

  newCloses.addEventListener("click", () => {
    newDiv.remove();
    let items = JSON.parse(localStorage.getItem("todoItems")) || [];
    items = items.filter((item) => item.id !== inpValue.id);
    localStorage.setItem("todoItems", JSON.stringify(items));
  });
}

//when the browser refresh to stay there

window.addEventListener("DOMContentLoaded", () => {
  const savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];
  savedItems.forEach((itemText) => {
    creatingElements(itemText);
  });
});
