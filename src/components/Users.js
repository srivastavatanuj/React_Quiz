import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
    console.log(users);
  }, []);

  return (
    <div className="users">
      <h1>Scoreboard</h1>
      {users.map((user) => {
        return (
          <li className="user" key={user.id}>
            <img alt="avatar" src={user.avatar_url} />
            <h4>{user.login}</h4>
            <p>{user.id}</p>
          </li>
        );
      })}
    </div>
  );
}
