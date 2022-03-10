import { GetStaticProps } from "next";
import { useEffect } from "react";
import { UserService } from "../../server/protocol/user.protocol";
import { getService } from "../../server/rpc";

export default function About() {
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
