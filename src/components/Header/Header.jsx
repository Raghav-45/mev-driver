import React from 'react'
import css from './Header.module.css';
import { Flex, Text } from '@chakra-ui/react';

export const Header = ({ title }) => {
  return (
    <Flex alignItems={'center'} height={'32px'} width={'100%'} background={'blue.400'} flexGrow={0} flexShrink={0} flexBasis={'auto'}>
      <Text px={'10px'} fontSize={'16px'} fontWeight={600} color={'#fff'}>{title}</Text>
    </Flex>
  )
}
