import { useEffect } from 'react';
import { createPortal } from 'react-dom';


const Portal = ({ children, containerClass }) => {
  const portalContainer = document.createElement('div');
  portalContainer.className = containerClass;
  
  useEffect(() => {
    document.body.appendChild(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
      document.body.style.overflow = 'visible';
    };
  }, []);

  return createPortal(children, portalContainer);
};

export {Portal};