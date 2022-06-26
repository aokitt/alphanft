import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react';
import AlphaNFT from './AlphaNFT.json';

const AlphaNFTAddress = "0x5C83122b3517Ca2c9124314a4eAc85852B7e3b40";

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if (window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
            AlphaNFTAddress,
            AlphaNFT.abi,
            signer
            );
            try{ 
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02* mintAmount).toString()),
                });
                console.log('response: ',response);
            } catch(err){
                console.log("error: ",err)
            }
        }
    }
    const handleDecrement = () =>{
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount -1);
    };

    const handleIncrement = () => {
        if(mintAmount >=5) return;
        setMintAmount(mintAmount +1);
    };

    return(
        <Flex justify ="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
            <Text fontSize="48px" textShadow="0 5px #000000">Alpha</Text>
            <Text 
                fontSize="30px" 
                letterSpacing="-5.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000000"> A group of 1000 NFT collectors and artists who love to collect and gain more benefit.  Mint Alpha to be a part of this community!
                </Text>
                </div>

            {isConnected ?(
                <div>
                    <Flex justify ="center" align="center">
                    <Button
                        backgroundColor ="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding ="15px"
                        marginTop="10px"
                        onClick={handleDecrement}>-</Button>
                        <Input 
                        readOnly
                        fontFamily="inherit"
                        width="100px"
                        height="40px"
                        textAlign="center"
                        paddingLeft="19px"
                        marginTop="10px"
                        type="number" value ={mintAmount}/>
                    <Button
                        backgroundColor ="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding ="15px"
                        marginTop="10px"onClick={handleIncrement}>+</Button>
                    </Flex>
                    <Button
                        backgroundColor ="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding ="15px"
                        marginTop="10px" onClick={handleMint}>Mint Now</Button>
                </div>
            ) :(
                <p>You must be connected to Mint.</p>
                )}
                
            </Box>
        </Flex>
    );

};

export default MainMint;