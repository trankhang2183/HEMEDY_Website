import React, { useState, useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    // if (window.pageYOffset > 300) {
    //   setIsVisible(true);
    // } else {
    //   setIsVisible(false);
    // }
    setIsVisible(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex justify-center items-center scroll-to-top-btn"
        >
          <IoIosArrowRoundUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
