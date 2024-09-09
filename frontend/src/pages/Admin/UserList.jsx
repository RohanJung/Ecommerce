import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
const UserList = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();

  return (
    <div className="py-40 px-44 text-black flex justify-center align-center flex-col ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Admin</TableHead>
          </TableRow>
        </TableHeader>
        {users?.map((data) => (
          <TableBody>
            <TableRow>
              <TableCell>{data._id}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.isAdmin ? "Yes" : "No"}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default UserList;
