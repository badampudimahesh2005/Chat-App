import {Avatar, AvatarImage} from "@/components/ui/avatar"
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { getColor } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import {  IoPowerSharp } from "react-icons/io5";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";

const ProfileInfo = () => {

    const {userInfo, setUserInfo} = useAppStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true});
            if(response.status === 200){
                toast.success("Logged out successfully");
                navigate("/auth");
                setUserInfo(null);

            }
        }
        catch(err){
            toast.error("Something went wrong");
            }

    }

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
        <div className="flex items-center gap-3 justify-center">
            <div className="h-12 w-12  rounded-full overflow-hidden">
             <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                    {userInfo.image ? (
                            <AvatarImage 
                            src={`${HOST}/${userInfo.image}`} alt="profile"
                             className="h-full w-full object-cover bg-black"
                              />
                          ) : (
                           <div className={` uppercase h-12 w-12   text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
            
                              {
                                userInfo.firstName ?
                                userInfo.firstName.split("").shift()
                                :userInfo.email.split("").shift()
                              }
            
                            </div>
                          )}
            
                         
        
                        
            
                        </Avatar>
                        </div>
                        <div>
                            {
                                userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                            }
                        </div>
        </div>
        <div className="flex gap-5">
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <FiEdit2 className="text-purple-500 text-xl font-medium" 
        onClick={()=> navigate("/profile")}
        />
        </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] text-white border-none">
      <p>Edit Profile</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <IoPowerSharp className="text-red-500 text-xl font-medium" 
        onClick={handleLogout}
        />
        </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] text-white border-none">
      <p>Log Out</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

        </div>
    </div>
  )
}

export default ProfileInfo