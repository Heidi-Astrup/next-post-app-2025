import Link from "next/link";
import styles from "./page.module.css";
import UserCard from "@/components/UserCard";

// Server Component
export default async function Users() {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json`;
  const response = await fetch(url);
  const dataObject = await response.json();

  const users = Object.keys(dataObject).map((key) => ({
    id: key,
    ...dataObject[key],
  })); // Convert object to array
  console.log(users);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.grid}>
          {users.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <UserCard user={user} />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
