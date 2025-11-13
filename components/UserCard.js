// Server Component - no "use client" needed
import Image from "next/image";
import styles from "./UserCard.module.css";
//import UserAvatar from "./UserAvatar";

export default function UserCard({ user }) {
  return (
    <article className={styles.postCard}>
      {/* Async Server Component inside */}
      <h2>{user.name}</h2>
      <Image
        src={user.image}
        alt={user.name}
        className={styles.postCardImage}
        width={500}
        height={500}
      />
      <h3>{user.caption}</h3>
    </article>
  );
}
