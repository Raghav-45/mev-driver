import React, { useState } from 'react'
import { Header, Softkey } from "./components"
import { useNavigation } from "./hooks/useNavigation"
import { useAuth } from './contexts/AuthContext'

import { useCustomRouter } from './contexts/CustomRouter'
import { Box, Button, Flex } from '@chakra-ui/react'

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
    <Flex direction={'column'} height={'calc(100% - 32px)'} width={'100%'}>
      <Header title="My Electric Vehicle" />

      {/* <div style={{height: '15rem', width: '100%', paddingInline: '20px', paddingTop: '4rem'}}> */}
      <Flex direction={'column'} textAlign={'center'} flexGrow={1} flexShrink={1} flexBasis={'auto'}>
        <Box mx={'25px'} my={'auto'}>
          {!currentUser && <Button width={'100%'} colorScheme='blue' size='sm' onClick={() => navigate('/account')}>Sign in to Account</Button>}
          <Button width={'100%'} mt={'8px'} colorScheme='blue' size='sm' onClick={() => navigate('/start-driver')}>Start</Button>
        </Box>
      </Flex>

      {/* <Box>
        {!currentUser && <Button className="button" role="button" style={{width: '100%'}} onClick={() => navigate('/account')}>Sign in to Account</Button>}
        <Button className="button" role="button" style={{width: '100%', marginTop: '1rem'}} onClick={() => navigate('/start-driver')}>Start</Button>
      </Box> */}

      <Softkey
        left={'Account'}
        onKeyLeft={() => navigate('/account')}
        center={'Start'}
        onKeyCenter={() => navigate('/start-driver')}
        // right={'Start'}
        // onKeyRight={() => navigate('/start-driver')}
      />
    </Flex>
  );
}