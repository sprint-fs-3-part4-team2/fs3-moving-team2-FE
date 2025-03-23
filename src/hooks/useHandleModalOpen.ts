import { useState } from 'react';

export const useHandleModalOpen = () => {
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return { modalOpen, openModal, closeModal };
};
