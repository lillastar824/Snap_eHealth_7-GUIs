import { useState } from 'react';

export const useInputShow = (): {
  show: boolean;
  onShow: () => void;
  onHidden: () => void;
} => {
  const [show, setShow] = useState<boolean>(false);

  const onShow = () => {
    setShow(true);
  };

  const onHidden = () => {
    setShow(false);
  };

  return { show, onShow, onHidden };
};
