import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const Dropdown = ({
  dropdownTitle,
  children,
  open = false,
}: {
  dropdownTitle: string;
  children: React.ReactNode;
  open: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <div>
      <div
        className="flex justify-between items-center border-b border-black/30 h-14 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {dropdownTitle && (
          <div className="text-black/95 text-base">{dropdownTitle}</div>
        )}
        {isOpen ? (
          <HiChevronUp className="text-base" />
        ) : (
          <HiChevronDown className="text-base" />
        )}
      </div>
      {isOpen && (
        <div className="mt-4">
          <p className="text-sm">{children}</p>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
