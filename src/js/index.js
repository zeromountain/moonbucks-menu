import { $ } from './utils/dom.js';
import MenuApi from './api/index.js';

function App() {
  // 상태(변할 수 있는 데이터) - 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = 'espresso';

  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    const menuItemTemplate = this.menu[this.currentCategory]
      .map((beverage) => {
        return `<li data-menu-id="${
          beverage.id
        }" class="menu-list-item d-flex items-center py-2">
      <span class="${
        beverage.isSoldOut ? 'sold-out' : ''
      } w-100 pl-2 menu-name">${beverage.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
      })
      .join('');
    $('#menu-list').innerHTML = menuItemTemplate;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').textContent = `총 ${menuCount} 개`;
  };

  const addMenuName = async () => {
    if ($('#menu-name').value.trim() === '') {
      alert('값을 입력해주세요. 공백 문자만을 입력할 수 없습니다.');
      return;
    }
    const duplicateItem = this.menu[this.currentCategory].find(
      (menuItem) => menuItem.name === $('#menu-name').value
    );
    if (duplicateItem) {
      alert('이미 등록된 메뉴입니다. 다시 입력해주세요.');
      $('#menu-name').value = '';
      return;
    }
    const menuName = $('#menu-name').value;

    await MenuApi.createMenu(this.currentCategory, menuName);

    render();
    $('#menu-name').value = '';
  };

  const updateMenuName = async (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);

    render();
  };

  const removeMenuName = async (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    await MenuApi.deleteMenu(this.currentCategory, menuId);
    render();
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  };

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  };

  const initEventListeners = () => {
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#menu-submit-button').addEventListener('click', addMenuName);

    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      addMenuName();
    });

    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return; // 불필요한 로직을 처리하지 않도록
      }
      if (e.target.classList.contains('menu-remove-button')) {
        if (confirm('메뉴를 삭제하시겠습니까?')) {
          removeMenuName(e);
          return;
        }
      }
      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e);
        return;
      }
    });

    $('nav').addEventListener('click', changeCategory);
  };
}

const app = new App();
app.init();
