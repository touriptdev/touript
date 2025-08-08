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
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-500/50 backdrop-blur-xs">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={close} />

      {isMobile ? (
        // Bottom Sheet Modal (Mobile)
        <div className="animate-slideUp no-scrollbar absolute right-0 bottom-16 left-0 mx-auto max-h-[84vh] w-full min-w-sm overflow-y-auto rounded-t-2xl bg-white px-8 pb-8 sm:hidden">
          {/* <div className="mb-2 h-1 w-9 bg-gray-200 rounded-full mx-auto" /> */}
          <div className="sticky top-0 z-10 flex h-8 w-full items-center justify-center bg-white">
            <div className="mx-auto h-1 w-9 rounded-full bg-gray-200" />
          </div>
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
