import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function ResponsiveModal({ children }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const navigate = useNavigate();

  const close = () => navigate(-1);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={close} />

      {isMobile ? (
        // ✅ Bottom Sheet Modal (Mobile)
        <div className="relative w-full rounded-t-2xl bg-white p-4 animate-slideUp max-h-[90vh] overflow-y-auto sm:hidden">
          <div className="mb-2 h-1.5 w-10 bg-gray-300 rounded-full mx-auto"/>
          {children}
        </div>
      ) : (
        // ✅ Centered Modal (Desktop)
        <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl px-16 py-8 animate-fadeIn z-10 hidden sm:block">
          {children}
        </div>
      )}
    </div>
  );
}
