import { HTMLAttributes, ReactNode } from "react";

const Accordion = ({ children }: { children: ReactNode }) => {
  return children;
};

export default Accordion;

interface AccordionSummaryType extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

Accordion.AccordionSummary = (props: AccordionSummaryType) => {
  const { children, ...divProps } = props;
  return <div {...divProps}>{children}</div>;
};

interface AccordionDetails extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

Accordion.AccordionDetails = (props: AccordionDetails) => {
  const { open, children, className, ...divProps } = props;
  return (
    <div
      {...divProps}
      className={`!grid !transition-all !duration-200 !ease-linear ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } ${className}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};
