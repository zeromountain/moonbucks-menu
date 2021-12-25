const $ = (selector) => document.querySelector(selector);

function App() {
  // 메뉴의 입름을 입력 받는 인풋 필드 → #espresso-menu-name 엘리먼트 찾기
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($('#espresso-menu-name').value.trim() === '') {
      alert('값을 입력해주세요. 공백 문자만을 입력할 수 없습니다.');
      return;
    }
    const $espressoMenuName = document.querySelector(
      '#espresso-menu-name'
    ).value;
    const menuItemTemplate = (name) => {
      return `<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
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
    };
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate($espressoMenuName)
    );
    updateMenuCount();
    $('#espresso-menu-name').value = '';
    // $('.menu-edit-button').addEventListener('click', () => {
    //   Modal();
    // });
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const menuName = $menuName.textContent;
    const newMenuName = prompt('메뉴명을 수정하세요', menuName);
    $menuName.textContent = newMenuName;
  };

  const removeMenuName = (e) => {
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

App();
