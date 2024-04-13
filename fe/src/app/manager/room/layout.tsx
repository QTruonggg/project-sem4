export default function Layout({children}:
  { children: React.ReactNode }) {

  return (
  <div className="bg-white p-10">
    {children}
  </div>
  )

}
