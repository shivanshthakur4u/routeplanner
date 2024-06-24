import React, { useState } from 'react';
import Image from 'next/image';
import AltPlus from '../../public/Add-alt.svg';
import DestinationIcon from '../../public/Destination.svg';
import GravitiLogo from '../../public/GravitiLogo.svg';
import LocationInput from '../components/LocationInput';
import Map from '../components/Map';
import axios from 'axios';

import { IBM_Plex_Sans, Rubik, Work_Sans } from '@next/font/google';

const sans = IBM_Plex_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
})


const rubik = Rubik({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik'
})

const workSans = Work_Sans({
  weight: ["400"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-workSans'
})


const Home: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [stops, setStops] = useState<string[]>(['']);
  const [distance, setDistance] = useState<number | null>(null);
  const [eta, setEta] = useState<string | null>(null);
  const [transitMode, setTransitMode] = useState('DRIVING');


  const handleCalculate = async () => {
    try {
      const waypoints = stops.map((stop) => ({ location: stop, stopover: true }));
      const response = await axios.get('/api/directions', {
        params: {
          origin,
          destination,
          waypoints: waypoints.map((w) => w.location).join('|'),
          mode: transitMode,
        },
      });
      const route = response.data.routes[0];
      const distance = route.legs.reduce((total: number, leg: any) => total + leg.distance.value, 0) / 1000;
      const time = route.legs.reduce((total: number, leg: any) => total + leg.duration.value, 0);
      setDistance(distance);
      setEta(new Date(time * 1000).toISOString().substr(11, 8));
    } catch (error) {
      console.error('Error calculating route', error);
    }
  };


  const handleAddStop = () => {
    setStops([...stops, '']);
    handleCalculate();
  };

  const handleStopChange = (index: number, value: string) => {
    const updatedStops = [...stops];
    updatedStops[index] = value;
    setStops(updatedStops);
    handleCalculate();
  };

  const handleDeleteStop = (index: number) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    setStops(updatedStops);
    handleCalculate();
  };


  return (
    <main className={`flex flex-col items-center pb-14 h-screen
     sm:bg-slate-100 bg-white w-full ${sans.variable} ${workSans.variable} ${rubik.variable} font-ibm-plex-sans`}>
      <header className="flex flex-col justify-center items-start self-stretch px-16 
      py-1.5 w-full bg-white max-md:px-5 max-md:max-w-full">
        <Image loading="lazy" src={GravitiLogo} alt="Company logo" className="w-40
         max-w-full aspect-[2.33] max-md:ml-2" />
      </header>
      <h1 className="mt-8 text-xl leading-6 text-center text-blue-800 max-md:max-w-full md:block hidden  font-work-sans">
        <span className="text-blue-800">Let&apos;s </span>calculate{' '}
        <span className="font-semibold text-blue-800">distance </span>
        <span className="text-blue-800">from Google maps</span>
      </h1>
      <section className="md:mt-4 w-full max-w-screen-2xl md:pl-32 md:pr-20 container max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-between w-full">
          <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full order-2 md:order-1">
            <div className="flex flex-col mt-6 max-md:mt-1 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex md:gap-4 gap-3 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
                    <form className="flex flex-col grow px-3 relative">
                      <LocationInput
                        label="Origin"
                        icon={
                          <div className="flex flex-col justify-center items-center px-1 w-4 h-4 bg-white rounded-full border-2 border-solid border-zinc-800 stroke-[2px]">
                            <div className="shrink-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-green-500 border-solid stroke-[1px]" />
                          </div>
                        }
                        value={origin}
                        onChange={(value) => setOrigin(value)}
                      />
                      {stops.map((stop, index) => (
                        <div key={index} >
                          <LocationInput
                            label={`Stop ${index + 1}`}
                            icon={
                              <div className="shrink-0 self-start w-3.5 h-3.5 bg-white rounded-full border-solid border-[5px] border-zinc-800 stroke-[5px]" />
                            }
                            value={stop}
                            onChange={(value) => handleStopChange(index, value)}
                          />
                          {index > 0 && (
                            <button type="button" className="ml-2 text-red-600" onClick={() => handleDeleteStop(index)}>
                              Delete
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="flex gap-1.5 self-end mt-2 items-center sm:text-base text-xs leading-5 text-center text-zinc-800"
                        onClick={handleAddStop}
                      >
                        <Image src={AltPlus} loading="lazy" alt="" className="shrink-0 aspect-square fill-white fill-opacity-0 w-[18px]" />
                        <span className="flex-auto font-rubik">Add another stop</span>
                      </button>
                      <LocationInput
                        label="Destination"
                        icon={
                          <Image loading="lazy" src={DestinationIcon} alt="destination-icon" className="shrink-0 w-3.5 aspect-[0.74]" />
                        }
                        value={destination}
                        onChange={(value) => setDestination(value)}
                      />
                    </form>
                  </div>
                  <div className="flex flex-col ml-5 w-[32%] mt-4 md:mt-0 px-4 md:px-0 max-md:ml-0 max-md:w-full">
                    <label className="mb-2">Transit Mode</label>
                    <select
                      className="mb-4 py-2.5 border rounded-md"
                      value={transitMode}
                      onChange={(e) => setTransitMode(e.target.value)}
                    >
                      <option value="DRIVING">Car</option>
                      <option value="BICYCLING">Bike</option>
                      <option value="WALKING">Walk</option>
                    </select>
                    <button
                      className="justify-center self-center sm:self-stretch sm:px-8 sm:py-5 my-7 max-w-[141px]
                       text-lg font-semibold leading-5 text-center text-white whitespace-nowrap
                        bg-blue-800 sm:rounded-[32px] rounded-[20px] py-3  max-md:px-5 "
                      onClick={handleCalculate}
                    >
                      Calculate
                    </button>
                  </div>
                </div>
              </div>
              {distance !== null && (
                <article className="flex flex-col justify-center py-0.5 md:mt-8 sm:mb-0 mb-4 rounded-lg border border-solid
                 border-slate-200 leading-[120%] sm:mx-0 mx-4 max-md:max-w-full ">
                  <div className="flex flex-col sm:pt-5 pt-3 bg-white rounded-lg max-md:max-w-full">
                    <div className="flex gap-5 justify-between mx-7 font-bold max-md:flex-wrap max-md:mr-2.5">
                      <h2 className="sm:text-xl my-auto text-lg text-gray-800 sm:pb-4">Distance</h2>
                      <p className="text-3xl text-right text-blue-600  sm:pt-0 pb-4 pt-2">{distance.toFixed(2)} kms</p>
                    </div>
                    <p className="z-10 px-8 pt-7 text-xs text-gray-800 rounded-none bg-slate-100 max-md:px-5 max-md:max-w-full">
                      The distance between <strong>{origin}</strong> and <strong>{destination}</strong> via the selected route is <strong>{distance.toFixed(2)} kms</strong>.
                    </p>
                    {eta && (
                      <p className="z-10 px-8 pt-1 pb-4 text-xs text-gray-800 rounded-none bg-slate-100 max-md:px-5 max-md:max-w-full">
                        Estimated travel time: <strong>{eta}</strong>.
                      </p>
                    )}
                  </div>
                </article>
              )}
            </div>
          </div>
          <div className="flex flex-col md:w-[48%] w-full shadow-lg md:mt-10 h-[511px] order-1 md:order-2">
            <Map origin={origin} destination={destination} stops={stops} onUpdate={() => { }} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
