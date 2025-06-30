'use client'
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { supabase } from '@/services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("⚠️ No session found yet");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: existingUsers } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email);

  if (!existingUsers.length) {
    const { data } = await supabase.from('users').insert([
      {
        name: user.user_metadata.name,
        email: user.email,
        picture: user.user_metadata.picture,
      },
    ]).select();
    setUser(data[0]);
  } else {
    setUser(existingUsers[0]);
  }
};

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailsContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailsContext);
  return context;
};
