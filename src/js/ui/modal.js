function Modal() {
  const $modalContainer = document.querySelector('modal-container');
  let modalTemplate = `
      <form id="espresso-menu-form">
              <div class="d-flex w-100">
                <label for="menu-name" class="input-label" hidden>
                  메뉴 이름
                </label>
                <input type="text" id="menu-name" name="menuName" class="input-field"
                  placeholder="메뉴 이름" autocomplete="off" />
                <button type="button" name="submit" id="menu-submit-button"
                  class="input-submit bg-green-600 ml-2">
                  확인
                </button>
                <button type="button" name="submit" id="menu-cancel-button"
                  class="input-submit bg-red-600 ml-2">
                  취소
                </button>
              </div>
            </form>
      `;
  // 메뉴 수정 모달
  // if( /*메뉴 수정 요청이면*/ ) {
  // }

  // 메뉴 삭제 모달
  document.querySelector('.modal-container').innerHTML = modalTemplate;
  document.querySelector('.modal-wrapper').style.visibility = 'visible';
}
