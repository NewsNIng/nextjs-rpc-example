import type { GetServerSideProps, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { User, UserService } from "../server/protocol/user.protocol";
import { getService } from "../server/rpc";

export const getServerSideProps: GetServerSideProps = async () => {
  // server rpc
  const userService = getService<UserService>(UserService);
  const list = await userService.list();
  return {
    props: {
      list,
    },
  };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const userService = getService<UserService>(UserService);
//   const list = await userService.list(3);
//   return {
//     props: {
//       list,
//     },
//   };
// };

export default function Home({ list = [] }: { list?: User[] }) {
  const [userList, setUserList] = useState(list);
  useEffect(() => {
    setTimeout(() => {
      // client rpc 
      const userService = getService<UserService>(UserService);
      userService.list(10).then((data) => {
        setUserList(data);
      });
    }, 1000);
  }, []);
  return (
    <div>
      <h1>Header</h1>
      {userList.length}
      {userList.map((user, index) => {
        return (
          <div key={user.id + index}>
            {user.name}: {user.age}
          </div>
        );
      })}
    </div>
  );
}
