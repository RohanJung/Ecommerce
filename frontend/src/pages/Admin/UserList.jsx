import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import {
  useUpdateuserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/Auth/userAuthSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const [updateUser] = useUpdateuserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: users, error, isLoading } = useGetUsersQuery();

  const [loadingState, setLoadingState] = useState({});

  const handleEdit = async (userId) => {
    setLoadingState((prevState) => ({ ...prevState, [userId]: "updating" }));
    try {
      const result = await updateUser(userId).unwrap();
      console.log(result);
      dispatch(setCredentials(result));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState((prevState) => ({ ...prevState, [userId]: "idle" }));
    }
  };
  const handleDelete = async (userId) => {
    setLoadingState((prevState) => ({ ...prevState, [userId]: "deleting" }));
    try {
      const result = await deleteUser({ userId }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState((prevState) => ({ ...prevState, [userId]: "idle" }));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="py-40 px-44 text-black flex justify-center align-center flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(user._id)}
                  disabled={loadingState[user._id] === "updating"}
                >
                  {loadingState[user._id] === "updating"
                    ? "Updating..."
                    : "Edit"}
                </Button>
                <Button
                  onClick={() => handleDelete(user._id)}
                  disabled={loadingState[user._id] === "deleting"}
                >
                  {loadingState[user._id] === "deleting"
                    ? "Deleting..."
                    : "Delete"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
