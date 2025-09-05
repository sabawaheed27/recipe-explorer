

"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { UserArray } from "@/data/users";
import { UserType } from "@/utils/types";

export default function LoginPage() {
  const { setUser } = useContext(UserContext)!;
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cred = localStorage.getItem("credentials");
    if (cred) {
      const { username, password } = JSON.parse(cred);
      setUsername(username);
      setPassword(password);
      setRemember(true);
    }
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = UserArray.find(
      (u) =>
        u.name.toLowerCase() === username.trim().toLowerCase() &&
        u.password === password
    );

    if (!found) {
      setError("Invalid username or password");
      return;
    }

    setError(null);

    // Load saved profile if it exists
    const savedData = localStorage.getItem(`user_${found.name}`);
    const userToSet: UserType = savedData
      ? JSON.parse(savedData)
      : {
        ...found,
        favouriteCategory: found.favouriteCategory ?? [],
        favouriteRecipes: found.favouriteRecipes ?? [],
      };

    setUser(userToSet);

    // Save user data
    localStorage.setItem(`user_${userToSet.name}`, JSON.stringify(userToSet));

    if (remember) {
      localStorage.setItem("loggedInUser", JSON.stringify(userToSet));
      localStorage.setItem(
        "credentials",
        JSON.stringify({ username, password })
      );
    } else {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("credentials");
    }
    // Redirect to home
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-3 rounded" />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded" />

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}/>
          Remember me
        </label>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
