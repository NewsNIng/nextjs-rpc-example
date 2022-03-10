import { GetStaticProps } from "next";
import { useEffect } from "react";
import { UserService } from "../../node/protocol/user.protocol";
import { getService } from "../../node/rpc";

export default function about() {
  useEffect(() => {
    const userService = getService<UserService>(UserService);

    userService.list().then((data) => {
      console.log(userService, data);
    });
  }, []);

  return <div>about</div>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
