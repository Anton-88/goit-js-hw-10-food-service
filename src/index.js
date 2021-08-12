import './sass/main.scss';
import data from './menu.json';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};


const mainMenu = document.querySelector('.js-menu');
const body = document.querySelector('body');
const themeSwitcher = document.querySelector('#theme-switch-toggle');

const drawMenu = data.map(element => {
  const addMenuItem = `<li class="menu__item">
    <article class="card" id="${element.id}">
    <img
      src="${element.image}"
      alt="${element.name}"
      class="card__image"
    />
    <div class="card__content">
      <h2 class="card__name">${element.name}</h2>
      <p class="card__price">
        <i class="material-icons"> monetization_on </i>
        ${element.price} кредитов
      </p>

      <p class="card__descr">
        ${element.description}
      </p>

      <ul class="tag-list">
        ${element.ingredients.map(value => `<li class="tag-list__item">${value}</li>`).join(" ")}
      </ul>
    </div>

    <button class="card__button button">
      <i class="material-icons button__icon"> shopping_cart </i>
      В корзину
    </button>
  </article>
    </li>`
  return addMenuItem;
})

mainMenu.insertAdjacentHTML("beforeend", drawMenu.join(' '));

let isChecked = themeSwitcher.checked;
// console.log('isChecked :>> ', isChecked);

function loadSavedTheme() {
  const themeInStorage = localStorage.getItem("theme");
  // console.log('themeInStorage :>> ', themeInStorage);
  if (themeInStorage) {
    body.classList.add(themeInStorage);
    if (themeInStorage === Theme.DARK) {
      localStorage.removeItem("theme");
      localStorage.setItem("theme", Theme.DARK);
      isChecked = true;
      themeSwitcher.checked = isChecked;
    }
  }
}

function switchTheme() {
  if (isChecked) {
    body.classList.add(Theme.LIGHT);
    body.classList.remove(Theme.DARK);
    localStorage.removeItem("theme");
    localStorage.setItem("theme", Theme.LIGHT);
  } else {
    body.classList.add(Theme.DARK);
    body.classList.remove(Theme.LIGHT);
    localStorage.removeItem("theme");
    localStorage.setItem("theme", Theme.DARK);
  }
  isChecked = !isChecked;
  themeSwitcher.checked = isChecked;
  console.log('themeSwitcher.checked :>> ', themeSwitcher.checked);
}

loadSavedTheme();
themeSwitcher.addEventListener("change", switchTheme);

