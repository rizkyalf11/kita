import { type PropsWithChildren } from "react";
import Navbar from "~/components/Navbar";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
};

export default DefaultLayout;
