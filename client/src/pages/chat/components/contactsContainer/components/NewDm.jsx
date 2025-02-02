import { Tooltip, TooltipProvider, TooltipTrigger ,TooltipContent} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa"
import { useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import {Input} from "@/components/ui/input";
import apiClient from "@/lib/apiClient";
import { HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "@/store";

  

const NewDm = () => {

  const {setSelectedChatType, setSelectedChatData}=useAppStore();

    const [open, setOpen] = useState(false);
    const [searchdContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {
      try{
       if(searchTerm.length > 0){
        const response = await apiClient.post(SEARCH_CONTACTS_ROUTE,
           {searchTerm},
          {withCredentials: true});
          if(response.status === 200 && response.data.contacts ){
            setSearchedContacts(response.data.contacts);
          }
      }else{
        setSearchedContacts([]);
      }
    }catch(error){
      console.log(error);
    }
    };


    const selectNewContact = (contact) => {
      setOpen(false);
      setSelectedChatType("contact");
      setSelectedChatData(contact);
      setSearchedContacts([]);

    };

  return (
    <div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus
                    className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                    onClick={() => setOpen(!open)}
                    />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1c1b1e]  border-none mb-2 p-3 text-white">
                    Select New Contact
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>


        {/* // Dialog for new dm  */}
        <Dialog open={open} onOpenChange={setOpen}>

  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle>Please Select a Contact</DialogTitle>
      <DialogDescription>
       
      </DialogDescription>
    </DialogHeader>
    <div>
        <Input type="text" placeholder="Search Contacts" className="rounded p-6 bg-[#2c2e3b] border-none focus:outline-none " onChange={e=>searchContacts(e.target.value)} />
    </div>

{
  searchdContacts.length > 0 && (
  

    <ScrollArea className="h-[250px]">
      <div className="flex flex-col gap-5">
        {
          searchdContacts.map((contact) => (
            <div key={contact._id} className="flex items-center gap-3 cursor-pointer "
            onClick={() => selectNewContact(contact)}
            >
             <div className="h-12 w-12  rounded-full overflow-hidden">
                  <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                      {contact.image ? (
                            <AvatarImage 
                            src={`${HOST}/${contact.image}`} alt="profile"
                                className="h-full w-full object-cover bg-black rounded-full"
                             />
                            ) : (
                      <div className={` uppercase h-12 w-12   text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                         
                             {
                               contact.firstName ?
                               contact.firstName.split("").shift()
                               :contact.email.split("").shift()
                              }
                         
                      </div>
                       )}
                                           
                         
                  </Avatar>
               </div>
               <div className="flex flex-col"> 
                 
                <span>
                  {
                     contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email
                  }
                </span>
                <span className="text-xs">{contact.email}</span>
               </div>
            </div>
          ))
        }
      </div>
      </ScrollArea>
  )
}
    {
        searchdContacts.length  <= 0 && (
        <div className="flex-1 md:mt-0  md:flex mt-5 flex-col justify-center items-center  duration-1000 transition-all">
      
        
        <Lottie
         isClickToPauseDisabled={true}
         height={100}
         width={100}
         options={animationDefaultOptions}
        />
        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
          <h3 className="poppins-medium">
            Hi<span className="text-purple-500">!</span> Search new <span className="text-purple-500">Contact</span> 
          </h3>
        </div>
        </div>
  )
     }
  </DialogContent>
</Dialog>

    </div>
  )
}

export default NewDm