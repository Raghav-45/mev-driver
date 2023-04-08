import React, { useState } from 'react'
import { Header, Softkey } from "./components"
import { useNavigation } from "./hooks/useNavigation"
import { useAuth } from './contexts/AuthContext'

import { useCustomRouter } from './contexts/CustomRouter'

export default function App() {
  const [current, setNavigation] = useNavigation();
  const { currentUser } = useAuth()

  const { navigate } = useCustomRouter()

  const onKeyCenter = () => {
    // const currentElement = document.querySelector("[nav-selected=true]");
    // const currentNavigationIndex = parseInt(
    //   currentElement.getAttribute("nav-index"),
    //   10
    // );

    // const isATask = currentNavigationIndex > 0;
    // if (isATask) {
    //   setToDo(prevState => {
    //     const current = [...prevState];
    //     current[currentNavigationIndex - 1].completed = !current[
    //       currentNavigationIndex - 1
    //     ].completed;
    //     return current;
    //   });
    // } else if (currentElement.value.length) {
    //   const toDo = { name: currentElement.value, completed: false };
    //   setToDo(prevState => [...prevState, toDo]);
    //   currentElement.value = "";
    // }
  };

  const onKeyRight = () => {
    // const currentIndex = parseInt(
    //   document.querySelector("[nav-selected=true]").getAttribute("nav-index"),
    //   10
    // );
    // if (currentIndex > 0) {
    //   setToDo(prevState => {
    //     const current = [...prevState];
    //     current.splice(currentIndex - 1, 1);
    //     const goToPreviousElement = Boolean(current.length);
    //     setNavigation(goToPreviousElement ? currentIndex - 1 : 0);
    //     return current;
    //   });
    // }
  };

  return (
    <div className='flex flex-col h-[calc(100%-32px)] w-full'>
      <Header title="My Electric Vehicle" />

      <div className='flex flex-col text-center flex-1'>
        <div className='my-auto mx-[25px]'>
          {!currentUser && <button className='blue-500-bg text-sm font-semibold h-8 w-full px-4 rounded-md' onClick={() => navigate('/account')}>Sign in to Account</button>}
          <button className='blue-500-bg text-sm font-semibold h-8 w-full px-4 rounded-md mt-2' onClick={() => navigate('/start-driver')}>Start</button>
        </div>
      </div>

      <Softkey
        left={'Account'}
        onKeyLeft={() => navigate('/account')}
        center={'Start'}
        onKeyCenter={() => navigate('/start-driver')}
        // right={'Start'}
        // onKeyRight={() => navigate('/start-driver')}
      />
    </div>
  );
}