'use server'
import { error } from 'console';
import { getServerSession } from 'next-auth';
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import React from 'react'
import { NextOptions } from './app/api/auth/[...nextauth]/route';

export async function getUserToken() {
 try{
    const session = await getServerSession(NextOptions);
      console.log('session',session);
  console.log('token5555',`${process.env.NEXTAUTH_URL}/api/token`);
  return session?.accessToken
}catch(error){
  console.log(error);
  
 }
}

