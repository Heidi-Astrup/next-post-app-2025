import DeletePostButton from "@/components/DeletePostButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import UserCard from "@/components/UserCard";
import PostCard from "@/components/PostCard";

export default async function UserDetailPage({ params }) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${id}.json`;
  const response = await fetch(url);
  const user = await response.json();

  const postUrl = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts.json?orderBy="uid"&equalTo="${id}"`;
  const postResponse = await fetch(postUrl);
  const dataObject = await postResponse.json();

  const posts = Object.keys(dataObject).map((key) => ({
    id: key,
    ...dataObject[key],
  })); // Convert object to array
  console.log(posts);

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
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </main>
  );
}
