import DeletePostButton from "@/components/DeletePostButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import UserCard from "@/components/UserCard";

export default async function UserPage({ params }) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${id}.json`;
  const response = await fetch(url);
  const user = await response.json();

  // Server Action to handle post deletion
  async function deletePost() {
    "use server"; // Mark as server action - runs on server only
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      redirect("/users");
    }
  }

  return (
    <main className={styles.postPage}>
      <div className={styles.container}>
        <h1>{user.caption}</h1>
        <div className={styles.postCard}>
          <UserCard user={user} />
        </div>
        <div className={styles.btns}>
          <DeletePostButton deleteAction={deletePost} />
          <Link href={`/users/${id}/update`}>
            <button className={styles.btnUpdate}>Update post</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
