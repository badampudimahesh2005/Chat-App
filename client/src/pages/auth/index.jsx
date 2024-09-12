import React from 'react'
import { useState } from 'react'


import Background from  "@/assets/login2.png"
import victory from '@/assets/victory.svg'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSingUp = async () => {

    }

    const handleLogin = async () => {

    }
    

  return (
    <div className='h-[100vh] w-[100vw] flex  items-center justify-center'>
        <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">

            <div className='flex flex-col gap-10 items-center justify-center'>
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
                <h1 className='font-bold text-5xl md:text-6xl'>welcome</h1>
                <img src={victory} alt="victory emoji" className='h-[100px]' />
            </div>
            <p className='text-center font-medium'>fill in the details to get started with the best chat app!</p>
        </div>
        <div className='flex items-center justify-center w-full'>  
            
            <Tabs className='w-3/4' >
                <TabsList className='bg-transparent w-full rounded-none'>
                    
                <TabsTrigger value='login'
                     className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                     >login</TabsTrigger>

                    <TabsTrigger value='signUp'
                    className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                    >SignUp</TabsTrigger>

                   
                </TabsList>

                <TabsContent className='flex flex-col gap-5 mt-10' value='login'>
                    <Input
                     type='email' 
                     placeholder='Email' 
                    className='rounded-full p-6 '
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} />

                      <Input
                     type='password' 
                     placeholder='Password' 
                    className='rounded-full p-6 '
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} />
                     <Button onClick={handleSingUp} className='rounded-full p-6 bg-purple-500 text-white'>SignUp</Button>
                </TabsContent>

                <TabsContent className='flex flex-col gap-5 ' value='signUp'>
                    <Input
                     type='email' 
                     placeholder='Email' 
                    className='rounded-full p-6 '
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} />

                      <Input
                     type='password' 
                     placeholder='Password' 
                    className='rounded-full p-6 '
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} />

                      <Input
                     type='password' 
                     placeholder='confirm Password' 
                    className='rounded-full p-6 '
                     value={confirmPassword} 
                     onChange={(e) => setConfirmPassword(e.target.value)} />

                     <Button onClick={handleLogin} className='rounded-full p-6 bg-purple-500 text-white'>Login</Button>
                     
                </TabsContent>

               

              

            </Tabs>
        </div>
            </div>
            <div className='hidden xl:flex items-center justify-center'>
                <img src={Background} alt="background image" className='h-[500px]'/>
            </div>
        </div>
    </div>
  )
}

export default Auth;
