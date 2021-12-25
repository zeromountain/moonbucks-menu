const $ = (selector) => document.querySelector(selector);

function App() {
  // 메뉴의 입름을 입력 받는 인풋 필드 → #espresso-menu-name 엘리먼트 찾기
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요.');
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
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
    $('#espresso-menu-name').value = '';
  };
  $('#espresso-menu-submit-button').addEventListener('click', () => {
    console.log('click');
    addMenuName();
  });
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();
