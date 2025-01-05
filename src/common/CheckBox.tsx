import { HTMLAttributes } from "react";

interface CheckBoxPropType
  extends HTMLAttributes<HTMLInputElement | HTMLDivElement> {
  checked?: boolean;
}

const CheckBox = (props: CheckBoxPropType) => {
  const { onChange, ...checkBoxProps } = props;
  return (
    <div onClick={onChange}>
      <input type="checkbox" className="hidden" readOnly {...checkBoxProps} />
      <label
        htmlFor={checkBoxProps.id}
        className={`relative inline-flex items-center justify-center w-[24px] h-[24px] border-2 ${
          checkBoxProps.checked ? "border-primary" : "border-black"
        }  rounded-[6px] cursor-pointer`}
      >
        <span
          className={`absolute inset-0 flex  items-center rounded-[3px] z justify-center ${
            checkBoxProps.checked ? "bg-primary" : "bg-white"
          }`}
        >
          {checkBoxProps.checked && (
            <svg
              className="w-[24px] h-[24px] text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </span>
      </label>
    </div>
  );
};

export default CheckBox;
