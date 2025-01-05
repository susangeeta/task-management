import { useState } from "react";
import { searchIcon } from "../../assets/svgs";

interface SearchPropsType extends HTMLInputElement {}

const Search = (props: SearchPropsType) => {
  const [isFocused, setFocused] = useState(false);

  function onFocus() {
    setFocused(true);
    props?.onFocus?.();
  }

  function onBlur(e) {
    setFocused(false);
    props?.onBlur?.(e.target.value);
  }

  return (
    <div
      className={`flex items-center py-12 px-16 border border-search-border-color rounded-lg gap-[10px] transition duration-200 ease-in-out ${
        isFocused
          ? "shadow-[0_0_0_2px_var(--tw-shadow-color)] border-transparent"
          : ""
      }`}
    >
      <img src={searchIcon} alt="searchIcon" />

      <input
        className={`w-full text-sm2 font-normal !outline-none ${props.className}`}
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Search;
