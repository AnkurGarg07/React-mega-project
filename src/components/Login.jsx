/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authLogin,logout } from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {set, useForm} from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const login=async(data)=>{
        setError("")
        try {
            const existingSession = await authService.getCurrentSession();
            if (existingSession) {
                authService.logout().then(()=>{
                    dispatch(logout())
                })
                } // Log out the existing session if any
            
            const session=await authService.login(data)
            if(session){
                const userData= await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                console.log(userData);
                navigate('/')
            }
            
        } catch (error) {
            setError(error.message)
        }
    }

    const handleGoogleLogin= async()=>{
        setError("")
        try {
            const existingSession = await authService.getCurrentSession();
            if (existingSession) {
                authService.logout().then(()=>{
                    dispatch(logout())
                })
            }
            const session =await authService.googleLogin()
            console.log(session);
            if(session){
                const userData=await authService.getCurrentSession()
                console.log();
                if(userData) dispatch(authLogin(userData))
                console.log(userData);
            navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }

    }
    return (
        <div className='flex items-center justify-center sm:w-full w-auto max-sm:mx-[20px]'>
        <div className={` my-[20px] mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 text-black`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px] text-center">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-[18px] sm:text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
            <div className='space-y-5'>
                <Input label="Email: " placeholder="Enter your email" type="email"
                {...register("email",{
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        <div className='flex justify-center mt-4'> 
        <button onClick={handleGoogleLogin} className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
      <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.9 0 7.2 1.4 9.9 3.6l7.4-7.4C35.6 2.3 30.1 0 24 0 14.6 0 6.7 5.8 3 14.3l8.5 6.6C13.2 13.3 18.1 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.9 24.6c0-1.6-.1-3.2-.3-4.7H24v9h12.9c-.6 3-2.4 5.5-4.8 7.2l7.5 5.9C43.6 37 46.9 31.2 46.9 24.6z"/>
        <path fill="#FBBC05" d="M11.5 28.8C10.9 27.4 10.5 25.8 10.5 24c0-1.8.4-3.4 1-4.8L3 12.6C1.2 16.3 0 20.8 0 24c0 3.2 1.2 7.7 3 11.4l8.5-6.6z"/>
        <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.3l-7.4-5.9c-2.1 1.4-4.7 2.3-7.5 2.3-5.8 0-10.7-3.9-12.4-9.1L3 35.4C6.7 42.2 14.6 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
      Sign in with Google
    </button>
        </div>
        </div>
        </div>
    )
}

export default Login
