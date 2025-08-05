import { connect } from "mongoose";

const connectionDB = () => {
  connect(process.env.MONGO_URI!)
    .then(() => console.log("Connection DB successfully"))
    .catch((err) => console.log("Faild connection DB: ", err));
};

export default connectionDB;
