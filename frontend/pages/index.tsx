import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, VStack } from '@chakra-ui/react';
import SendMoney from '@/components/SendMoney';

const Home: NextPage = () => {

  return (
    <div className='justify-center items-center h-screen flex '>
      <VStack gap={8}>
        <ConnectButton />
        <Text className='text-4xl font-bold'>
          Please type the donation address and amount
        </Text>
        <SendMoney />
      </VStack>
    </div>
  )
};

export default Home;