import React, { useState } from 'react';
import { HelpButton } from './Help.styles';
import Dialog from '../Dialog';
import Text from '../Text';
import Icon from '../Icon';

export default function Help() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Dialog isOpen={open} onDismiss={() => setOpen(false)}>
        <h3>
          <Text.Primary>#</Text.Primary> About
        </h3>
        <p>
          This is the 8bit remake of Morning CD, a place where people from around the world can
          share the first piece of music they listen to each morning.
        </p>
        <h3>
          <Text.Primary>#</Text.Primary> Credits
        </h3>
        <p>
          Morning CD is created by Zach Hammer. The idea is inspired by Jody Avirgan's tweets. The
          8bit remake is styled with NES.css.
        </p>
      </Dialog>
      <HelpButton onClick={() => setOpen(true)}>?</HelpButton>
    </>
  );
}
