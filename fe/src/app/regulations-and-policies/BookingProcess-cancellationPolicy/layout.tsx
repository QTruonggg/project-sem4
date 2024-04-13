import Footer from "@/Components/common/Footer";
import SubHeader from "@/Components/common/SubHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (<>
   <SubHeader/>
    {children}
    <Footer/>
  </>
  );
}
