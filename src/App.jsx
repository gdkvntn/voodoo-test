import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import Card from "./Card";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedPosts, setSortedPosts] = useState(posts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    const getPosts = async () => {
      try {
        const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
        const res = await posts.json();
        setPosts(res);
      } catch (error) {
        alert("Sorry something went wrong!");
      }
      setLoading(false);
    };

    const getUsers = async () => {
      try {
        const users = await fetch("https://jsonplaceholder.typicode.com/users");
        const res = await users.json();
        setUsers(res);
      } catch (error) {
        alert("Sorry something went wrong!");
      }
      setLoading(false);
    };
    getPosts();
    getUsers();
  }, []);

  useEffect(() => {
    setSortedPosts(posts);
  }, [posts]);

  const getAuthor = (id) => {
    return users.find((el) => el.id === id);
  };

  const filterByAuthor = () => {
    if (search === "") {
      setSortedPosts(posts);
    }
    let searchUsers = users.filter((el) => {
      return el.name.toLowerCase().includes(search.toLowerCase().trim());
    });
    let searchUsersId = searchUsers.map((el) => el.id);

    setSortedPosts(posts.filter((el) => searchUsersId.includes(el.userId)));
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className=" bg-slate-200 min-h-screen px-6 font-sans md:px-10">
        <div className="p-4 flex justify-center">
          <button
            onClick={filterByAuthor}
            className=" bg-white p-1  border border-solid border-gray-400 hover:opacity-70 hover:cursor-pointer"
          >
            Search
          </button>
          <input
            className=" border p-1 border-solid border-gray-400 border-l-0"
            type="text"
            placeholder="Filter by auther..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => (e.code === "Enter" ? filterByAuthor() : null)}
          />
        </div>
        <div className="flex flex-wrap gap-[2%] gap-y-4 ">
          {posts.length && users.length
            ? sortedPosts.map((post) => {
                return (
                  <Card
                    key={post.id}
                    data={post}
                    author={getAuthor(post.userId)}
                  />
                );
              })
            : null}
        </div>
        {!sortedPosts.length ? (
          <p className=" text-center">sorry nothing found</p>
        ) : null}
      </div>
    </>
  );
}

export default App;
