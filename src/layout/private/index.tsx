import { ReactNode } from "react";
import Header from "./Header";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full custom-container">
      <Header />
      {children}
    </section>
  );
};

export default PrivateLayout;
