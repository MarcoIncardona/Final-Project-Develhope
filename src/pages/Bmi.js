import { useState } from "react";
import axios from "axios";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Bmi() {
  const [info, setInfo] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activitylevel: "level_2",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleInput = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handlereset = (event) => {
    setInfo({
      age: "",
      gender: "male",
      height: "",
      weight: "",
      activitylevel: "level_2",
    });
    setResponse(null);
    setError(null);
  }

  //validazione numero intero

  function isIntegerNum(num) {
    if (typeof parseInt(num) == "number" && num % 1 === 0 && num >= 1) {
      return true
    }
  }

  //validazione form

  const activityLevelOptions = [
    "level_1",
    "level_2",
    "level_3",
    "level_4",
    "level_5",
    "level_6",
  ];

  function validationForm(info) {
    if (!isIntegerNum(info.age)) {
      setError("Age must be an integer number.");
      return false;
    }
    if (!(info.gender === "male" || info.gender === "female")) {
      setError("Please select a valid gender.");
      return false;
    }
    if (!isIntegerNum(info.height)) {
      setError("Height must be an integer number.");
      return false;
    }
    if (!isIntegerNum(info.weight)) {
      setError("Weight must be an integer number.");
      return false;
    }
    if (!activityLevelOptions.includes(info.activitylevel)) {
      setError("Please select a valid activity level.");
      return false;
    }


    return true;
  }

  const fetchData = async (event) => {
    event.preventDefault();
    if (validationForm(info)) {
      try {
        setLoading(true);
        const responsee = await axios({
          method: "GET",
          url: "https://fitness-calculator.p.rapidapi.com/dailycalorie",
          headers: {
            "X-RapidAPI-Key":
              "47f4c893cemshf0974c486258b66p1ad651jsnc5044bc70078",
            "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
          },
          params: {
            age: info.age,
            gender: info.gender,
            height: info.height,
            weight: info.weight,
            activitylevel: info.activitylevel,
          },
        });
        setLoading(false);
        setResponse(responsee)
        console.log(responsee.data.data.goals);
      } catch (err) {
        setError(err)
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full 
    bg-gradient-to-tr from-blue-300 via-blue-900 to-purple-400 dark:from-purple-300 dark:via-purple-700
     dark:to-blue-400">
      <div className="p-2 m-3">
        <form
          className="flex flex-col items-center justify-center "
          onSubmit={fetchData}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <label className="m-3 text-white p-2" htmlFor="age">
              Age:{" "}
            </label>
            <input
              className="pl-2 w-3/4 bg-[#ffffff4f] rounded-sm m-3"
              required
              type="number"
              id="age"
              name="age"
              value={info.age}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center">
            <label className="m-3 text-white p-2" htmlFor="gender">
              Gender:{" "}
            </label>
            <select
              className="pl-2 w-full bg-[#ffffff4f] text-black rounded-sm m-3"
              name="gender"
              id="gender"
              value={info.gender}
              onChange={handleInput}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center">
            <label className="m-3 text-white p-2" htmlFor="height">
              Height:{" "}
            </label>
            <input
              className="pl-2 w-3/4 bg-[#ffffff4f] rounded-sm m-3"
              required
              type="number"
              id="height"
              name="height"
              value={info.height}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center">
            <label className="m-3 text-white p-2" htmlFor="weight">
              Weight:{" "}
            </label>
            <input
              className="pl-2 w-3/4 bg-[#ffffff4f] rounded-sm m-3"
              required
              type="number"
              id="weight"
              name="weight"
              value={info.weight}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center">
            <label className="m-3 text-white p-2" htmlFor="activitylevel">
              Activity Level:
            </label>
            <select
              className="pl-2 bg-[#ffffff4f] w-2/4 text-black rounded-sm m-3"
              name="activitylevel"
              id="activitylevel"
              value={info.activitylevel}
              onChange={handleInput}
            >
              <option value="level_1">Sedentary: little or no exercise</option>
              <option value="level_2">Exercise 1-3 times/week</option>
              <option value="level_3">Exercise 4-5 times/week</option>
              <option value="level_4">
                Daily exercise or intense exercise 3-4 times/week
              </option>
              <option value="level_5">Intense exercise 6-7 times/week</option>
              <option value="level_6">
                {" "}
                Very intense exercise daily, or physical job
              </option>
            </select>
          </div>
          {loading && <p className="text-white">Loading...</p>}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="drop-shadow-xl text-white bg-gradient-to-r rounded-md px-5 py-2 m-5 
            from-blue-900 to-purple-800 hover:from-purple-800 dark:hover:from-blue-400 dark:hover:to-violet-500
            hover:to-blue-900  hover:scale-105 transition-all duration-200 active:shadow-[0px_0px_30px_-0px_rgba(145,82,245,0.6)]
            dark:to-blue-400 dark:from-violet-500">
              <span>SUBMIT</span>
            </button>
            <button type="reset" onClick={handlereset} className="drop-shadow-xl text-white bg-gradient-to-r rounded-full px-4 py-3 m-5 
            from-blue-900 to-purple-800 hover:from-purple-800 dark:hover:from-blue-400 dark:hover:to-violet-500
            hover:to-blue-900  hover:scale-105 transition-all duration-200 active:shadow-[0px_0px_30px_-0px_rgba(145,82,245,0.6)]
            dark:to-blue-400 dark:from-violet-500 ">
              <FontAwesomeIcon icon={faRotateLeft} size="1x" /></button>
          </div>
          {error && <div ><div class="bg-red-700 text-white font-bold rounded-t px-4 py-2">
            Danger
          </div>
            <div className="border border-t-0 border-red-800 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>{error}</p>
            </div></div>}
        </form>
      </div>
      {response && <div className="flex flex-col items-center justify-center mb-5">
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex flex-col ml-0">
              <div className="flex flex-col justify-center items-center">
                <h2 className="m-5 text-white">Goals</h2>
              </div>
              <h3 className="m-1  text-white">Extreme weight gain:</h3>
              <h3 className="m-1  text-white">Extreme weight loss:</h3>
              <h3 className="m-1  text-white">Mild weight gain:</h3>
              <h3 className="m-1  text-white">Mild weight loss:</h3>
              <h3 className="m-1 text-white">Weight gain:</h3>
              <h3 className="m-1  text-white">Weight loss:</h3>
              <h3 className="m-1  text-white">Maintain weight:</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h2 className="m-5 text-white">Calory</h2>
              </div>
              <h3 className="m-1  text-white"> {Math.round(response.data.data.goals["Extreme weight gain"].calory)}</h3>
              <h3 className="m-1  text-white">{Math.round(response.data.data.goals["Extreme weight loss"].calory)}</h3>
              <h3 className="m-1  text-white">{Math.round(response.data.data.goals["Mild weight gain"].calory)}</h3>
              <h3 className="m-1  text-white">{Math.round(response.data.data.goals["Mild weight loss"].calory)}</h3>
              <h3 className="m-1 text-white">{Math.round(response.data.data.goals["Weight gain"].calory)}</h3>
              <h3 className="m-1  text-white">{Math.round(response.data.data.goals["Weight loss"].calory)}</h3>
              <h3 className="m-1  text-white">{Math.round(response.data.data.goals["maintain weight"])}</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h2 className="m-5 text-white">Weight</h2>
              </div>
              <h3 className="m-1  text-white">+{response.data.data.goals["Extreme weight gain"]["gain weight"]}</h3>
              <h3 className="m-1  text-white">-{response.data.data.goals["Extreme weight loss"]["loss weight"]}</h3>
              <h3 className="m-1  text-white">+{response.data.data.goals["Mild weight gain"]["gain weight"]}</h3>
              <h3 className="m-1  text-white">-{response.data.data.goals["Mild weight loss"]["loss weight"]}</h3>
              <h3 className="m-1  text-white">+{response.data.data.goals["Weight gain"]["gain weight"]}</h3>
              <h3 className="m-1  text-white">-{response.data.data.goals["Weight loss"]["loss weight"]}</h3>
              <h3 className="m-1  text-white">-</h3>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
