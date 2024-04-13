import Footer from "@/Components/common/Footer";
import SubHeader from "@/Components/common/SubHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (<>
    <SubHeader />
    <div className='text-center h-72 overflow-hidden rounded-b-xl text-white 
           bg-[url("/images/LangMongPaViHome.jpg")] bg-cover flex items-center justify-center'>
      <div>
        <h2 className='text-4xl font-bold mb-2 tracking-wide'>THƯ VIỆN ẢNH</h2>
        <h2 className='text-4xl font-bold mt-2 tracking-wide'>V-HOMESTAY</h2>
      </div>
    </div>
    {children}
    <Footer />
  </>
  );
}
