import { GetServerSideProps } from "next";
import { rpcGet } from "../server/rpc";

export default function _RPC() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;

  try {
    const body = decodeURIComponent(
      (req.url!.split("?")[1] || "d=").replace("d=", "")
    );
    if (!body) {
      throw Error("rpc d is null");
    }
    const { s: service, m: method, a: args = [] } = JSON.parse(body) as any;
    const rs = await rpcGet(service)[method](...args);
    res.end(JSON.stringify(rs));
  } catch (error: any) {
    if (process.env.NODE_ENV === "production") {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
  return {
    props: {},
  };
};
