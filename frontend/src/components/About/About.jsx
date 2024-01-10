import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import {Link} from 'react-router-dom' 

const About = () => {
  return (
    <section>
        <div className="container">
            <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                    <img src={aboutImg} alt="" />
                    <div className="absolute z-20 bottom-4 w-[200px] md:-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                        <img src={aboutCardImg} alt="" />
                    </div>
                </div>

            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                <h2 className='heading'>Proud to be one of the nations best </h2>
                <p className="paragraph">Discover effortless healthcare scheduling with our doctor appointment platform. Streamlined for ease, we connect patients with professionals, ensuring timely care and a user-friendly experience for all.</p>
                <p className="paragraph mt-[30px]">Utilizing advanced technology, our platform offers real-time availability updates, detailed practitioner profiles, and intuitive booking features. Whether you're a patient seeking care or a medical professional managing appointments, our website simplifies the process, fostering efficient communication and optimal healthcare outcomes.</p>
                <Link to='/'>
                <button className='btn'>Learn More</button>
                </Link>
            </div>
            </div>
        </div>
    </section>
  )
}

export default About
