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
    return session?.accessToken
}catch(error){
  console.log(error);
  
 }
}

