//instantiate classes
const ft = new Fetch();
const ui = new UI();

//add event listeners//
ft.getCurrent('Mumbai').then((data) => {
  //call a UI method//
  ui.populateUI(data);
  //call saveToLS
  ui.saveToLS(data);
});

const search = document.getElementById("city-search");
const button = document.getElementById("btn-search");
button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
});