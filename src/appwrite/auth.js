/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import conf from "../conf/conf";
import { OAuthProvider } from "appwrite";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client=new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            console.log(ID.unique);
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async googleLogin(){
        const successUrl = conf.successURL
        const failureUrl = conf.failureURL
        try {
            return  this.account.createOAuth2Session(
                OAuthProvider.Google,
                successUrl,
                failureUrl
            )
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get()
        } catch (error) {
            console.log(`get current user error:${error}`);
        }
        return null
    }
    async getCurrentSession()  {
        try {
          return await this.account.getSession('current');
        } catch (error) {
          // No active session
          return null;
        }
    }

    async logout(){
        try {
           return await this.account.deleteSessions()
        } catch (error) {
            console.log(`Error:${error}`);
        }
    }
}

const authService=new AuthService()
export default authService