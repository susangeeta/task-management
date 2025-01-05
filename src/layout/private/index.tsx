import { ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "./Header";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <section className="w-full custom-container">
      <Header />
      {children}
    </section>
  );
};

export default PrivateLayout;
