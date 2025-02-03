import { RiCloseFill } from 'react-icons/ri'
import { useAppStore } from '@/store'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { getColor } from '@/lib/utils';
import { HOST } from '@/utils/constants';

// Summary: This file contains the code for the chat header component. 
// This component is used to display the header of the chat window.
//It contains the close button to close the chat window.
const ChatHeader = () => {

  const {closeChat, selectedChatData, selectedChatType} = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
        <div className="flex gap-5 items-center  w-full justify-between">
            <div className="flex gap-3 items-center justify-center">
            <div className="h-12 w-12  rounded-full overflow-hidden">
              {
                selectedChatType === "contact"
                ? (<Avatar className="h-12 w-12  rounded-full overflow-hidden">
                {selectedChatData.image ? (
                      <AvatarImage 
                      src={`${HOST}/${selectedChatData.image}`} alt="profile"
                          className="h-full w-full object-cover bg-black"
                       />
                      ) : (
                <div className={` uppercase h-12 w-12   text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(selectedChatData.color)}`}>
                   
                       {
                         selectedChatData.firstName ?
                         selectedChatData.firstName.split("").shift()
                         :selectedChatData.email.split("").shift()
                        }
                   
                </div>
                 )}    
            </Avatar>)
            :(<div
                className={` bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full`}
              >
                #
              </div>
              )}    
               </div>

               {/* show the name of the user on the chat header */}
               <div>
                {selectedChatType === "channel" && selectedChatData.name  }
                      {selectedChatType === "contact" && selectedChatData.firstName ? (
                        <div className="text-lg font-bold">{selectedChatData.firstName}</div>
                      ) : (
                        <div className="text-lg font-bold">{selectedChatData.email}</div>
                      )
                      }
                    </div>
            </div>
            <div className="flex items-center justify-center gap-5">
                <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all' 
                onClick={closeChat}>
                    <RiCloseFill  className='text-3xl' />
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader