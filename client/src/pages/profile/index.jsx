import React from 'react'
import { useAppStore } from '@/store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoArrowBack } from 'react-icons/io5'
import {FaPlus, FaTrash} from 'react-icons/fa'
import {Avatar, AvatarImage} from "@/components/ui/avatar"

import { colors, getColor } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Profile = () => {

  const {userInfo,setUserInfo} = useAppStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {};

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex flex-col  gap-10 items-center justify-center '>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer " />
        </div>
 
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:w-48 md:h-48 relative flex justify-center items-center'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage src={image} alt="profile" className="h-full w-full object-cover bg-black" />
              ) : (
               <div className={` uppercase h-32 w-32 md:w-48 md:h-48  text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>

                  {
                    firstName?firstName.split("").shift():userInfo.email.split("").shift()
                  }

                </div>
              )}

            </Avatar>
            {
              hovered && (
                <div className="absolute inset-0  flex items-center justify-center bg-black/50 rounded-full cursor-pointer ring-fuchsia-50">
                  {image ? <FaTrash className='text-white text-3xl cursor-pointer'  /> : <FaPlus className='text-white text-3xl cursor-pointer'   />}
                </div>
            )}
              {/* <input type="text" /> */}
          </div>

          <div className='flex flex-col gap-5 min-w-32 md:min-w-64 text-white items-center justify-center'>
            <div className='w-full'>
              <input type="email" placeholder='Email' disabled value={userInfo.email} className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
            </div>

            <div className='w-full'>
            <input type="text" placeholder='First Name'  value={firstName} onChange={e => setFirstName(e.target.value)} className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
          </div>
          
          <div className='w-full'>
          <input type="text" placeholder='Last Name'  value={lastName} onChange={e => setLastName(e.target.value)}  className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
          </div>

          <div className='w-full flex gap-5'>
            {
              colors.map((color, index) => (
                <div key={index} onClick={() => setSelectedColor(index)} className={`h-8 w-8 rounded-full ${color} cursor-pointe transition-all duration-300
              ${selectedColor === index ? "outline outline-white/50 outline-1"  :""}
              `}></div>

              ))

            }
            </div>

        </div>

      </div>
      <div className="full">
        <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>Save changes</Button>
      </div>

    </div>
    </div>

  )


}

export default Profile