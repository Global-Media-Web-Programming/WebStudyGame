import ModalPortal from '../components/modal-portal/ModalPortal';

export class ModalService {
  constructor() {
    this.modalRoot = document.querySelector('#modal');
    this.currentModal = null;
  }

  open({ content, closeBtnText = '닫기' }) {
    if (this.currentModal) {
      this.close();
    }

    this.currentModal = new ModalPortal(this.modalRoot, {
      content,
      closeBtnText,
      onClose: () => this.close(),
    });
  }

  close() {
    if (this.currentModal) {
      this.modalRoot.innerHTML = '';
      this.currentModal = null;
    }
  }
}

export const modalService = new ModalService();
