import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function ResponsiveModal({ children, onClose }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const navigate = useNavigate();

  const close = () => {
    if (onClose) {
      // State-driven modal
      onClose();
    } else {
      // Route-based modal fallback
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-gray-500/50 backdrop-blur-xs flex justify-center items-center">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={close} />

      {isMobile ? (
        // Bottom Sheet Modal (Mobile)
        <div className="absolute bottom-16 left-0 right-0 mx-auto w-full min-w-sm max-h-[84vh] rounded-t-2xl bg-white pt-4 pb-8 px-8 animate-slideUp overflow-y-auto no-scrollbar sm:hidden">
          <div className="mb-2 h-1 w-9 bg-gray-200 rounded-full mx-auto" />
          {children}
        </div>
      ) : (
        // Centered Modal (Desktop)
        <div className="absolute top-22 left-1/2 -translate-x-1/2 w-full max-w-3xl max-h-[calc(100vh-88px-32px)] overflow-y-auto bg-white rounded-lg shadow-2xl px-16 py-8 animate-fadeIn no-scrollbar hidden sm:block">
          {children}
        </div>
      )}
    </div>
  );
}
