import { redirect } from "next/navigation";
import FormUser from "@/components/FormUser";
import styles from "./page.module.css";

export default function CreateUserPage() {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json`; // Get Firebase Realtime Database URL

  // Server Action to handle post creation
  async function createUser(formData) {
    "use server"; // Mark as server action - runs on server only
    const name = formData.get("name");
    const image = formData.get("image");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        image,
        uid: "rdsjwji39u4", // TODO: Replace with actual user ID from auth
        createdAt: new Date().toISOString(), // Add creation timestamp
      }),
    });

    if (response.ok) {
      redirect("/users");
    }
  }

  return (
    <section className={styles.formPage}>
      <div className={styles.container}>
        <h1>Create New User</h1>
        <FormUser action={createUser} />
      </div>
    </section>
  );
}
