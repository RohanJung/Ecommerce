import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { logout } from "../features/Auth/userAuthSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetail: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "GET",
      }),
    }),
    updateuser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateuserMutation,
  useDeleteUserMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUsersQuery,
} = userApiSlice;
