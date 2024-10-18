import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from './ContextAPI/Context';

export default function Testing() {
    const {accessToken ,setAccessToken , loading , setLoading } = useContext(TokenContext);
   

  return (
    <>
       
    </>
  )
}