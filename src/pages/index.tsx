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
      <h1 className="text-4xl font-bold h-24 px-6 bg-lime-300 flex items-center">
        Header
      </h1>
      <div className="px-6 py-4 text-xl text-gray-600">
        {userList.length}
        {userList.map((user, index) => {
          return (
            <div key={user.id + index}>
              {user.name}: {user.age}
            </div>
          );
        })}
      </div>
    </div>
  );
}
