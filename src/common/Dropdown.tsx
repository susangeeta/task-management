import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { downArrowSvg } from "../../assets/svgs";

/**
 * A customizable dropdown component with a toggle button and list of options.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional classes for custom styling.
 * @param {function} props.onChange - Callback function to handle the selected option change.
 * @param {number} [props.left] - Left position for the dropdown menu.
 * @param {number} [props.right=0] - Right position for the dropdown menu.
 * @param {number} [props.top=50] - Top position for the dropdown menu.
 * @param {number} [props.bottom] - Bottom position for the dropdown menu.
 * @param {React.ReactNode} props.children - Child components, typically `CustomDropdown.Option` components.
 * @param {string} [props.placeholder="Select Option"] - Placeholder text when no option is selected.
 * @param {boolean} [props.resetKey] - Set the dropdown to the default state.
 * @returns {JSX.Element} The rendered dropdown component.
 */
const CustomDropdown = ({
  className,
  onChange,
  left,
  right = 0,
  top = 50,
  bottom,
  children,
  openedBgColor = "bg-secondary-surface-20",
  closedBgColor = "bg-white",
  placeholder = "Select Option",
  placeholderColor = "text-text-color",
  resetKey,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const [selectedValue, setSelectedValue] = useState(placeholder);

  /**
   * Toggle the dropdown menu visibility.
   */
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * Handle the click event for an option.
   *
   * @param {object} props - The properties of the clicked option.
   */
  const handleOptionClick = (props) => {
    onChange(props.value);
    setSelectedValue(props.label ? props.label : props.children);
    setIsOpen(false);
  };

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Adjust the dropdown width to accommodate content
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const optionsWidth = Array.from(dropdownRef.current.children).reduce(
        (maxWidth, child) => Math.max(maxWidth, child.scrollWidth),
        0
      );
      setDropdownWidth(Math.max(buttonRef.current.offsetWidth, optionsWidth));
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedValue(placeholder);
    setIsOpen(false);
    onChange();
  }, [placeholder, resetKey]);

  return (
    <div className={"relative inline-block"} ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <div
        className={`cursor-pointer px-5 py-3 border rounded-[43px] flex items-center justify-between min-w-[240px] ${
          isOpen
            ? `border-black ${openedBgColor}`
            : `${closedBgColor} border-gray-300`
        } ${className || ""}`}
        onClick={handleToggle}
        ref={buttonRef}
      >
        <div
          className={`min-w-[160px] max-w-[200px] overflow-hidden ${
            selectedValue === placeholder ? placeholderColor : ""
          }`}
        >
          {selectedValue.length > 20
            ? selectedValue.substring(0, 20) + "..."
            : selectedValue}
        </div>

        <div
          className={`transform transition-transform min-w-[24px] min-h-[24px] duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <img src={downArrowSvg} alt="Toggle Arrow" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-20 mt-2 bg-white border border-gray-300 rounded-[12px] shadow-lg overflow-x-hidden max-h-[240px] overflow-y-auto"
          style={{
            left,
            right,
            top,
            bottom,
            minWidth: dropdownWidth,
            width: "max-content",
          }}
        >
          {/* Render the children (Options) */}
          {Children.toArray(children)
            .filter((child) => React.isValidElement(child))
            .map((child) => {
              return cloneElement(child, {
                onClick: () => {
                  handleOptionClick(child.props);
                },
                optionKey: child.props.value,
                selectedValue: selectedValue,
              });
            })}
        </div>
      )}
    </div>
  );
};

/**
 * SubComponent for the dropdown options.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the option.
 * @param {string} [props.value] - The value of the option.
 * @param {function} [props.onClick] - Click handler for the option.
 * @param {string} [props.className] - Additional classes for custom styling.
 * @returns {JSX.Element} The rendered option component.
 */
CustomDropdown.Option = ({
  children,
  value,
  onClick,
  className,
  optionKey,
  selectedValue,
}) => {
  return (
    <div
      className={`px-6 py-4 hover:bg-secondary-surface-20 cursor-pointer w-full ${
        selectedValue === children ||
        selectedValue.split(":")[1]?.trim() === children
          ? "bg-secondary-surface-40"
          : ""
      } ${className || ""}`}
      onClick={onClick}
      value={value}
      key={optionKey}
    >
      {children === "all" ? "All" : children}
    </div>
  );
};

export default CustomDropdown;
