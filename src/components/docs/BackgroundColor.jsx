import React from 'react';

const RedBg = 'src/assets/images/cert_bg_images/cert_bg_red.jpg';
const GreenBg = 'src/assets/images/cert_bg_images/cert_bg_green.jpg';
const BlueBg = 'src/assets/images/cert_bg_images/cert_bg_blue.png';
const YellowBg = 'src/assets/images/cert_bg_images/cert_bg_yellow.jpg';
const Demo = 'src/assets/images/demo/bg_select_options.png';


function BackgroundColor() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Certificate Background Color</h2>
      <p>
        In the GDG on Campus certificate generator, you can select a background color for certificates. We offer four color options to match the theme of your event or organization’s branding:
      </p>

      <h3 className="text-xl font-semibold">Available Background Colors</h3>
      <ul className=" flex flex-col lg:flex-row lg:space-x-4 space-y-4">
        <li>
          <div className="flex flex-col items-center">
            <span className="font-semibold">Red</span>
            <img src={RedBg} alt="Red Certificate Sample" className="w-64 h-36 border rounded-md shadow-md lg:mt-6 mt-2 " />
          </div>
        </li>

        <li>
          <div className="flex flex-col items-center">
            <span className="font-semibold">Green</span>
            <img src={GreenBg} alt="Green Certificate Sample" className="w-64 h-36 border rounded-md shadow-md mt-2" />
          </div>
        </li>

        <li>
          <div className="flex flex-col items-center">
            <span className="font-semibold">Blue</span>
            <img src={BlueBg} alt="Blue Certificate Sample" className="w-64 h-36 border rounded-md shadow-md mt-2" />
          </div>
        </li>

        <li>
          <div className="flex flex-col items-center">
            <span className="font-semibold">Yellow</span>
            <img src={YellowBg} alt="Yellow Certificate Sample" className="w-64 h-36 border rounded-md shadow-md mt-2" />
          </div>
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">How to Select the Background Color</h3>
      <p>
        During the certificate generation process, you’ll see these four options as color choices. Simply select your preferred color, and it will be applied to the generated certificate.
      </p>
      <img src={Demo} alt="Demo select bg color" className=" h-full border shadow-md mt-2" />
      
    </div>
  );
}

export default BackgroundColor;
