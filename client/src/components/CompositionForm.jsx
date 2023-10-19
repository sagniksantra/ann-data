import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';


const Composition = () => {
    return (
        <>
            <section class="h-[100vh] text-[#555843] body-font bg-[#F5EEC8]">
                <div class="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center ">
                    <div class="bg-[#A7D397] lg:w-7/12 md:w-1/2 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 items-center">
                        <h2 class="text-gray-900 text-4xl font-medium title-font mb-5">Soil composition</h2>
                        <div class="flex flex-wrap justify-evenly">
                            <div class="relative mb-4 flex flex-col justify-center items-start font-bold ">
                                <label for="email" class="leading-7 text-sm text-[#555843] pb-2">Nitrogen</label>
                                <TextField id="outlined-number" label="Quantity" type="number" InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div class="relative mb-4 flex flex-col justify-center items-start font-bold">
                                <label for="email" class="leading-7 text-sm text-[#555843] pb-2">Phosphorus</label>
                                <TextField id="outlined-number" label="Quantity" type="number" InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div class="relative mb-4 flex flex-col justify-center items-start font-bold">
                                <label for="email" class="leading-7 text-sm text-[#555843] pb-2">Potassium</label>
                                <TextField id="outlined-number" label="Quantity" type="number" InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div class="relative mb-4 flex flex-col justify-center items-start font-bold">
                                <label for="email" class="leading-7 text-sm text-[#555843] pb-2">Temperature</label>
                                <TextField id="outlined-number" label="Quantity" type="number" InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div class="relative mb-4 flex flex-col justify-center items-start font-bold">
                                <label for="email" class="leading-7 text-sm text-[#555843] pb-2">Humidity</label>
                                <TextField id="outlined-number" label="Quantity" type="number" InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div class="relative mb-4 flex flex-col justify-center items-start font-bold">
                                <label for="email" class="leading-7 text-sm text-[#555843] pb-2">pH</label>
                                <TextField id="outlined-number" label="Quantity" type="number" InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div class="relative mb-4 flex flex-col justify-center items-start font-bold">
                                <label for="email" class="leading-7 text-sm text-[#555843] pb-2">Rainfall</label>
                                <TextField id="outlined-number" label="Quantity" type="number" InputLabelProps={{ shrink: true, }} />
                            </div>
                        </div>
                        <button class="text-white bg-[#555843] border-0 py-2 px-8 focus:outline-non rounded text-lg w-1/2">Predict</button>
                    </div>

                </div>
            </section>
            </>
    )
}
export default Composition;