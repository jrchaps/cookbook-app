import React from 'react';

export const useCollapsible = () => {
  const ref = React.useRef();
  const timeout = React.useRef();
  const [toggled, setToggled] = React.useState(false);

  const toggle = () => {
    setToggled(!toggled);
  };

  React.useLayoutEffect(() => {
    if (toggled) {
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      timeout.current = setTimeout(() => {
        ref.current.style.height = 'auto';
      }, 300);
    } else {
      clearTimeout(timeout.current);
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      setTimeout(() => {
        ref.current.style.height = '0px';
      }, 10);
    }
  }, [toggled]);

  React.useLayoutEffect(() => {
    ref.current.style.overflow = 'hidden';
    ref.current.style.transition = 'height 0.3s ease-in-out';
    ref.current.style.height = '0px';
  }, []);

  return [ref, toggle, toggled];
};
