import React from 'react'
import { useAppStore } from '@/store'

const Profile = () => {
  const {userInfo} = useAppStore();
  return (
    <div>Profile
    <div>
      email: {userInfo.email}
    </div>

    </div>
  )
}

export default Profile