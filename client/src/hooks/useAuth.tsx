import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {isTokenValid, loginUser} from '../utils/auth';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/atom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { LoginResponse } from '../types/Auth.types';



export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(authAtom);
    const queryClient = useQueryClient();
    const navigate = useNavigate();


  const {data, isLoading, isSuccess, isError} = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      // token이 있는지 확인
      if (!isTokenValid) {
        return false;
      }
      return true;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: isTokenValid(),

  });

  useEffect(() => {
    if(isSuccess){
        setIsAuthenticated(data)
    }
    if(isError){
    //   handleLogout();
    }
  },[isSuccess,isError])


  const loginMutation = useMutation({mutationFn: loginUser,
    onSuccess: (data:LoginResponse) => {
        Cookies.set('Token', data.token, {expires: 1});
        setIsAuthenticated(true)
        queryClient.setQueryData(['auth'], true);

    },
    onError: (error) => {
        console.log('error:', error)
    }
  })

  

  const logoutMutation = useMutation({
    onSettled: () => {
        Cookies.remove('Token');
        setIsAuthenticated(false);
        queryClient.setQueryData(['auth'], false);
        navigate('/login');
    }
  })

  return {
    isAuthenticated,
    isLoading,
    isSuccess,
    isError,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    error: loginMutation.error,
  };
}
