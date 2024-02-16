import React, { useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import Feedback from "./Feedback";
import DoctorAbout from "./DoctorAbout";
import SidePanel from "./SidePanel";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctorImg} className="w-full" alt="" />
              </figure>

              <div>
                <span className="bg-[#CCF0F3] text-SkyBlue py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  Surgeon
                </span>
                <h3 className="text-HeadingColor text-[22px] leading-9 mt-3 font-bold">
                  Mohmd Reee
                </h3>
                <div className="flex items-center gap-[6px] ">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-HeadingColor">
                    <img src={starIcon} alt="" /> 4.8
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-TextColor">
                    (272)
                  </span>
                </div>
                <p className="paragraph text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium, facilis.
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-Color"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-HeadingColor font-semibold`}
              >
                About
              </button>

              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" && "border-b border-solid border-Color"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-HeadingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <DoctorAbout />}
              {tab === "feedback" && <Feedback />}
            </div>
          </div>
          <div>
            <SidePanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
