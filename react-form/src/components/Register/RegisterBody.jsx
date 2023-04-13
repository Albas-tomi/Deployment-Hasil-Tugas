import React from "react";
import InputRegister from "./InputRegister";
import Banner from '../../assets/Register.png'
function RegisterBody() {
  return (
    <div className="flex items-center mx-auto">
      <div className="w-1/2 hidden lg:block p-14">
       <img src={Banner} alt="banner" />
      </div>
      <div className=" w-full justify-center max-w-[450px] lg:w-1/2 bg-white mx-auto p-6 ">
        <InputRegister />
      </div>
    </div>
  );
}

export default RegisterBody;
