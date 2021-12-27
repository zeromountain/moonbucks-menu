import { $ } from '../utils/dom.js';

function Modal(props) {
  const { currentCategory, menuId, inputValue } = props;

  let modalTemplate = `
      <form id="modal-menu-form">
              <div class="d-flex w-100 template">
                <label for="menu-name" class="input-label" hidden>
                  메뉴 이름
                </label>
                <input type="text" id="menu-name" name="menuName" class="input-field"
                  placeholder="메뉴 이름" value="${inputValue}" autofoucus />
                <div class="modal-button-container">
                  <button type="button" name="submit" id="menu-submit-button"
                    class="input-submit bg-green-600 ml-2 ok">
                    확인
                  </button>
                  <button type="button" name="submit" id="menu-cancel-button"
                    class="input-submit bg-red-600 ml-2 cancel">
                    취소
                  </button>
                </div>
              </div>
            </form>
      `;
  // 메뉴 수정 모달
  // if( /*메뉴 수정 요청이면*/ ) {
  // }

  $('.modal-title').innerText = `${currentCategory} 메뉴 수정`;
  $('.modal-inner').insertAdjacentHTML('beforeend', modalTemplate);
  $('.modal').classList.add('open');

  $('.modal-inner').addEventListener('click', (e) => {
    if (e.target.classList.contains('ok')) {
      console.log('hello');
      return;
    }
    if (e.target.classList.contains('cancel')) {
      console.log(e.target.closest('.modal-inner'));
      $('#modal-menu-form').remove();
      $('.modal').classList.remove('open');
    }
  });
}

export default Modal;
