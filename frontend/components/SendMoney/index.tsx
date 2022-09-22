import React, { useEffect, useState } from 'react';
import {
    Button,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack,
    Input
} from '@chakra-ui/react';
import { chainId, useAccount, useNetwork } from 'wagmi';
import { Donate } from '@/utils/interact';

const SendMoney = () => {
    const [donationAmount, setDonationAmount] = React.useState('0.01');
    const [donationAddress, setDonationAddres] = useState('');
    const { data } = useAccount();
    const { activeChain } = useNetwork();

    // donate
    const donate = async (donationAddres, donationAmount) => {
        await Donate(donationAddres, donationAmount, chainId, data, activeChain);
    }

    return (
        <div className='mt-12'>
            <VStack gap={6}>
                <Input placeholder='Donation Address' htmlSize={50} width='auto' onChange={(e) => setDonationAddres(e.target.value)}/>
                <NumberInput className='mx-auto' step={0.01} defaultValue={donationAmount} min={0}
                    onChange={(valueString) => setDonationAmount(valueString)}
                    width={400}
                >
                    <NumberInputField />
                    <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button onClick={() => donate(donationAddress, donationAmount)}>💸 Donate</Button>
            </VStack>
        </div>
    )
}

export default SendMoney