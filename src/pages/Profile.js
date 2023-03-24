import { useNavigate } from "react-router";
import pb from "../lib/pocketbase";

export const Profile = () => {
  const navigate = useNavigate();

  function logout() {
    pb.authStore.clear();
    navigate("/login", { replace: true });
    window.location.reload(false);
  }

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center h-full w-full bg-gradient-to-tr from-blue-300 via-blue-900 to-purple-400 dark:from-purple-300 dark:via-purple-700 dark:to-blue-400 text-white">
        <h1>Hello, {"user" || "username from db"}!</h1>
        <div className="flex flex-col gap-6 items-center m-4 rounded-md bg-[#ffffff4f] p-6">
          <div className="w-full flex flex-col items-center sm:flex-row sm:gap-5">
            <div className="border border-white w-[200px] h-[200px] text-center">
              <div className="my-20">img</div>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Age: -</h2>
              <h2>Height: -</h2>
              <h2>Weight: -</h2>
            </div>
          </div>
          <div>
            <h2>Position: -</h2>
            <p>Favorite gyms: -</p>
          </div>
          <div>
            <h2>Activity level: -</h2>
            <p>Favorite exercises: -</p>
          </div>
          <div>
            <h2>Daily calories: -</h2>
            <p>Carbs percentage: -</p>
            <p>Carbs percentage: -</p>
            <p>Carbs percentage: -</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="max-w-[80%] drop-shadow-xl text-white bg-gradient-to-r rounded-md px-2 py-2 from-blue-900 to-purple-700 hover:from-purple-700 dark:hover:from-blue-400 dark:hover:to-violet-500 hover:to-blue-900  hover:scale-105 w-80  transition-all duration-200 active:shadow-[0px_0px_30px_-0px_rgba(145,82,245,0.6)] dark:to-blue-400 dark:from-violet-500"
        >
          Logout
        </button>
      </div>
    </>
  );
};
