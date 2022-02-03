const axios = require("axios");

const createUser = async (name, location) => {
  try {
    let res1 = await axios.post(`http://192.168.1.7:8000/api/NewUser/${name}`);
    console.log("res1 data: ", res1.data);

    await newCenter(name, location);
  } catch (err) {
    console.log("Error in new user data creation!! ", err);
  }
};

const newCenter = async (name, location) => {
  try {
    const res = await axios.post(
      `http://192.168.1.7:8000/api/Newcenter/${name}/${location}`
    );
    console.log(res.data);
  } catch (err) {
    console.log("error in center : ", err);
  }
};

const addCoordinate = async (name, location) => {
  try {
    const res = await axios.post(
      `http://192.168.1.7:8000/api/addCoord/${name}/${location}`
    );
    console.log(res.data);
  } catch (err) {
    console.log("error in adding new coordinate : ", location);
  }
};

export { createUser, newCenter, addCoordinate };
