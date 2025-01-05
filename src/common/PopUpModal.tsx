import React, { useEffect, useRef, useState } from "react";

/**
 * StaticPopup component that displays a popup when triggered by a button click.
 * The popup's position can be customized horizontally and vertically.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.triggerElement - The element that triggers the popup when clicked.
 * @param {React.ReactNode} props.children - The content to be displayed inside the popup.
 * @param {string} [props.className] - Additional classes to apply to the popup.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <StaticPopup
 *    triggerElement={<button>Click me</button>}
 *    horizontalPosition="left"
 *    verticalPosition="bottom"
 * >
 *    <div>Popup Content</div>
 * </StaticPopup>
 */
function StaticPopup({ triggerElement, children, className, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  /**
   * Toggles the popup's open/closed state when the trigger element is clicked.
   */
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Closes the popup.
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  /**
   * Stops the propagation of the click event when clicking inside the popup.
   *
   * @param {Event} event - The click event.
   */
  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    /**
     * Closes the popup if the user clicks outside of it.
     *
     * @param {Event} event - The click event.
     */
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <div
        ref={buttonRef}
        onClick={handleButtonClick}
        className="text-white font-bold h-[50px] w-[50px] flex items-center justify-center rounded cursor-pointer"
      >
        {triggerElement}
      </div>
      {isOpen && (
        <div
          className={`absolute top-[0%] w-[320px] max-h-[256px] overflow-auto right-[110%] bg-white shadow-md rounded-[12px] py-3 z-10 border border-divider-color ${
            className || ""
          }`}
          ref={popupRef}
          onClick={handlePopupClick}
          {...props}
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              onClick: () => {
                setIsOpen(false);
                if (child.props.onClick) {
                  child.props.onClick();
                }
              },
            });
          })}
        </div>
      )}
    </div>
  );
}

export default StaticPopup;
