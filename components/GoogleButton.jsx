import { RainbowButton } from "./ui/rainbow-button";


export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <>
    
    {/* <button
      onClick={handleGoogleLogin}
      className="flex items-center  animated-google-button  justify-center gap-2 font-semibold 
        px-4 py-2 rounded-md shadow-sm  cursor-pointer select-none "
    >
     
      <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={25} />
      Continue with Google
    </button> */}
    <RainbowButton  onClick={handleGoogleLogin}
      className="flex items-center  justify-center gap-2 font-semibold 
        px-4 py-2 rounded-md shadow-sm  cursor-pointer select-none " size='lg' >
             <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={25} />
      Continue with Google
        </RainbowButton>
    </>
  );
}
