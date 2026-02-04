import React from "react";
import Products from "./pages/Products";
import "./styles/ui.css";
import Logo from "./assets/logo.webp";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <header className="flex items-center justify-between mb-8 sm:mb-10 lg:mb-12">
          <a href="/" aria-label="خانه" className="shrink-0">
            <img
              src={Logo}
              alt="HotDBuy"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
            />
          </a>
          <p className="flex-1 text-center sm:text-2xl lg:text-4xl font-extrabold">
            محصولات
          </p>
          <div className="w-16 sm:w-20 lg:w-24" />
        </header>
        <main>
          <Products />
        </main>
      </div>
    </div>
  );
};

export default App;
