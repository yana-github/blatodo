export function getDate() {
  let d = new Date();

  let dd = d.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = d.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = d.getFullYear();

  return dd + "." + mm + "." + yy;
}

export function randomInteger(min, max) {
  return Math.round(Math.random(min, max) * (max - min) + min);
}

export function createEl(tag, className, text, type, placeholder) {
  let el = document.createElement(tag);
  className ? el.classList.add(className) : null;
  text ? (el.innerText = text) : null;
  if (tag === "input") {
    type ? (el.type = type) : null;
    placeholder ? (el.placeholder = placeholder) : null;
  }
  return el;
}
