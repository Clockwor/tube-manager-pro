
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-tube-darkest">
      <div className="text-center glass-panel rounded-xl p-8 card-shadow max-w-md">
        <h1 className="text-6xl font-bold text-tube-red mb-4">404</h1>
        <p className="text-xl text-tube-white mb-6">Oops! Page not found</p>
        <p className="text-tube-white/70 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-tube-red hover:bg-tube-darkred transition-colors text-white font-medium py-2 px-6 rounded-md"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
