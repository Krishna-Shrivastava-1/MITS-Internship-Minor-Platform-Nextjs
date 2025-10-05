export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 bg-neutral-800  px-4 py-2 rounded-md shadow-sm hover:bg-neutral-700 cursor-pointer select-none "
    >
      <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={20} />
      Continue with Google
    </button>
  );
}
