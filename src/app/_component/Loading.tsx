export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/30 backdrop-blur-sm">
      <span className="loader"></span>
      <h2 className="text-xl text-white">Loading FarMart</h2>
      <p className="text-gray-300">please wait a moment</p>
    </div>
  )
}