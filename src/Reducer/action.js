import zIndex from '@mui/material/styles/zIndex';
import {GET_ALL_POSTS,GET_CURRENT_USER,DELETE_A_POSTS,UPDATE_A_POSTS,CREATE_A_POSTS} from './constants';

export const getCurrentUser = (payload)=>({type:GET_CURRENT_USER,payload})
export const createAPost = (payload)=>({type:CREATE_A_POSTS,payload})
export const getAllPosts = (payload)=>({type:GET_ALL_POSTS,payload})
export const updateAPosts = (payload)=>({type:UPDATE_A_POSTS,payload})
export const deleteAPosts = (payload)=>({type:DELETE_A_POSTS,payload})
