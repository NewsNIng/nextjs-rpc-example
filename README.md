
### just a example by myself, maybe help for you.



> index.tsx
```tsx

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
      ...
    </div>
  );
}

```