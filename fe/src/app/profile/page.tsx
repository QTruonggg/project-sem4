import UserInformation from '@/Components/profile/UserInformation';
import * as React from 'react';

export interface ProfilePageProps { }

export default function ProfilePage(props: ProfilePageProps) {
  return <div>
      <UserInformation />
  </div>;
}
