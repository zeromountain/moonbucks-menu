const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('menu'));
  },
};

function App() {
  // 상태(변할 수 있는 데이터) - 메뉴명
  this.menu = [];
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
    // TODO: li 요소의 id값을 고유한 값으로 변경 → 배열의 인덱스로 할 경우, 삭제할때마다 id값이 변경
    const menuItemTemplate = this.menu
      .map((beverage, idx) => {
        return `<li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${beverage.name}</span>
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

    $('#espresso-menu-list').innerHTML = menuItemTemplate;
  };

  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($('#espresso-menu-name').value.trim() === '') {
      alert('값을 입력해주세요. 공백 문자만을 입력할 수 없습니다.');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    render();
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.textContent = updatedMenuName;
  };

  const removeMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu.splice(menuId, 1);
    store.setLocalStorage(this.menu);
    e.target.closest('li').remove();
    updateMenuCount();
  };

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }
    if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('메뉴를 삭제하시겠습니까?')) {
        removeMenuName(e);
      }
    }
  });
}

const app = new App();
app.init();
