import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authClient, getServerAuthSession } from "@/shared/auth-client";
import { toast } from "@/shared/toast";

const SESSION_KEY = ["auth", "session"] as const;
export const useInvalidateSession = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.removeQueries({
      queryKey: SESSION_KEY,
    });
  };
};

const getSessionOpts = () => ({
  queryKey: SESSION_KEY,
  queryFn: async () => {
    const res = await getServerAuthSession();

    return res.session || null;
  },
  throwOnError: false,
  // 3 minutes
  staleTime: 3 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 3,
});

export const useAuthSession = () => useQuery(getSessionOpts());
export const prefetchAuthSession = (queryClient: QueryClient) =>
  queryClient.ensureQueryData(getSessionOpts());

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const useLoginMutation = () => {
  const { refetch } = useAuthSession();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
      });

      if (res.error) {
        toast.error({
          description: res.error.message,
          title: res.error.statusText || "Login failed",
        });
      } else {
        toast.success({ title: "Login successful" });
        await refetch();
      }

      return res;
    },
    onError: (err) => {
      toast.error({ description: err.message, title: err.name });
    },
  });
};

export const useRegisterMutation = () => {
  const { refetch } = useAuthSession();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        toast.error({
          description: res.error.message,
          title: res.error.code || "Registration failed",
        });
      } else {
        toast.success({ title: "Registration successful" });
        await refetch();
      }

      return res;
    },
    onError: (err) => {
      toast.error({ description: err.message, title: err.name });
    },
  });
};

export const useLogoutMutation = () => {
  const invalidateSession = useInvalidateSession();

  return useMutation({
    mutationFn: async () => {
      const res = await authClient.signOut();

      if (res.error) {
        toast.error({
          description: res.error.message,
          title: res.error.code ?? "400",
        });
      } else {
        toast.success({
          title: "Logged out successfully",
        });

        invalidateSession();
      }

      return res;
    },
  });
};
