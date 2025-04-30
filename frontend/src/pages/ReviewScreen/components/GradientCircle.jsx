export default function GradientCircle() {
  return (
    <div className="flex items-center justify-center h-[120px] w-[120px] bg-transparent">
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, 
            #1A2238 14%, 
            #1E3A8A 47%, 
            #4C1D95 82%, 
            #6D28D9 100%)`,
        }}
      ></div>
    </div>
  );
}
