import Web3 from "web3";
import contractABI from '../config/contract-abi.json';
import { contractAddress } from '../config/config';

export const Donate = async (donationAddres, donationAmount, chainId, data, activeChain) => {

    if (activeChain && activeChain.id == chainId.rinkeby) {
        const web3 = new Web3(window.ethereum as any);
        const amountToSend = web3.utils.toWei(donationAmount.toString())
        let contract = await new web3.eth.Contract(contractABI as any, contractAddress);

        if (donationAmount && Number(donationAmount) > 0) {
            try {
                await web3.eth
                    .sendTransaction({
                        from: data.address,
                        to: contractAddress,
                        value: amountToSend,
                        data: contract.methods
                            .donate(
                                donationAddres
                            )
                            .encodeABI(),
                    })
                    .then(function () {
                        console.log('success')
                    })
            }
            catch (err) {
                console.log('failed', err)
            }
        }
    }
}