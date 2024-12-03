"use client";

import useGetUserToken from '@/hooks/useGetUserToken';
import { CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import StandPage from './StandPage';
import NavBar from '@/components/navBard/NavBarMovile';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { API_URL } from '@/util/config';
import { Event } from '@/app/types/event';
import useStore from '@/store/store';

export default function Page() {
  const { id } = useParams(); 
  const { loading, user, error }: { loading: boolean, user: User, error: string | null } = useGetUserToken();
  const router = useRouter();
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [eventLoading, setEventLoading] = useState<boolean>(false);
  const [eventError, setEventError] = useState<string | null>(null);
  const {updateUser} = useStore()

  const getEventForUser = async (idEvent: string) => {
    setEventLoading(true);
    setEventError(null);
    try {
      const response = await fetch(`${API_URL}/event/${idEvent}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      setEventError('Failed to load event data. Please try again later.');
    } finally {
      setEventLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getEventForUser(id.toString());
    }
  }, [id]);

  useEffect(()=>{
    if(user){
      updateUser(user)
    }
  },[user])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress
          size={80}
          sx={{
            color: 'purple',
          }}
        />
      </div>
    );
  }


  if (error) {
    router.push('/login'); 
    return null;
  }

  if (!id) {
    return <div>Error: Evento no encontrado</div>;
  }

  if (eventLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress size={80} sx={{ color: 'purple' }} />
      </div>
    );
  }

  if (eventError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Typography variant="h6" color="error">
          {eventError}
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <NavBar user={true} />

      <div className="w-[350px] md:w-[600px] xl:w-[1000px] mt-[70px] mx-auto  ">
        <Typography variant="h5" className="mb-3">
          Stands de <span className="text-purple-400 font-bold">{event?.name}</span>
        </Typography>
        <StandPage idEvent={+id} user={user} />
      </div>
    </div>
  );
}
