import clsx from 'clsx';
import useMousePosition from '../../hooks/useMousePosition';
import './ToolTip.scss';

function ToolTip ({ children, open }) {
  const { x, y } = useMousePosition();

  return (
    <div className={clsx('tooltip', open && 'open')} style={{ left: x + 50, top: y - 50 }}>
      {children}
    </div>
  );
}

export default ToolTip;