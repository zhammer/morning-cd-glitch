import React from 'react';
import { CloseButton, Backdrop, Content } from './Dialog.styles';
import NesIcon from '../NesIcon';

interface DialogProps {
  isOpen?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export default function Dialog({ isOpen, onDismiss, children }: DialogProps) {
  return (
    <>
      <Backdrop hidden={!isOpen} onClick={onDismiss} />
      <Content hidden={!isOpen}>
        <CloseButton onClick={onDismiss}>
          <NesIcon.Close />
        </CloseButton>
        {children}
      </Content>
    </>
  );
}
