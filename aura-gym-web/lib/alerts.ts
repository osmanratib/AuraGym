import Swal from 'sweetalert2';

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
      background: '#FFFFFF',
      color: '#111114',
      iconColor: '#8E1616',
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
      background: '#FFFFFF',
      color: '#111114',
      iconColor: '#8E1616',
      confirmButtonText: 'Understood',
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
      background: '#FFFFFF',
      color: '#111114',
      iconColor: '#8E1616',
      customClass: defaultCustomClass,
      buttonsStyling: false,
      reverseButtons: true,
    });
    return result.isConfirmed;
  },
};
