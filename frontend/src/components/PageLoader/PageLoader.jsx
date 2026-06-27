import { useEffect, useState } from 'react';

export const PageLoader = ({ show }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-200"
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' }}
    >
      <img
        src="/images/logo/Dravix.png"
        alt="Dravix"
        className="h-16 w-auto mb-6 animate-pulse"
      />
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#09BDB1] animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2.5 h-2.5 rounded-full bg-[#09BDB1] animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2.5 h-2.5 rounded-full bg-[#09BDB1] animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export const InitialLoader = ({ show }) => {
  return <PageLoader show={show} />;
};

export default PageLoader;
