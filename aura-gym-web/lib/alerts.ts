import Swal, { SweetAlertOptions } from 'sweetalert2';

const defaultCustomClass = {
  popup: 'aura-swal-popup',
  title: 'aura-swal-title',
  confirmButton: 'aura-swal-confirm-btn',
  cancelButton: 'aura-swal-cancel-btn',
};

export const AuraAlert = {
  success: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      background: '#17171B',
      color: '#F4F1EA',
      iconColor: '#FF5A1F',
      confirmButtonText: 'Continue',
      customClass: defaultCustomClass,
      buttonsStyling: false,
    });
  },

  error: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      background: '#17171B',
      color: '#F4F1EA',
      iconColor: '#FF5A1F',
      confirmButtonText: 'Got It',
      customClass: defaultCustomClass,
      buttonsStyling: false,
    });
  },

  confirm: async (title: string, text: string, confirmButtonText = 'Confirm') => {
    const result = await Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: 'Cancel',
      background: '#17171B',
      color: '#F4F1EA',
      iconColor: '#FF5A1F',
      customClass: defaultCustomClass,
      buttonsStyling: false,
      reverseButtons: true,
    });
    return result.isConfirmed;
  },
};
