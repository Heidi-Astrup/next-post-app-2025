import FormUser from "@/components/FormUser";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function UserUpdatePage({ params }) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${id}.json`;
  const response = await fetch(url);
  const user = await response.json();

  // Server Action to handle post update
  async function updateUser(formData) {
    "use server"; // Mark as server action - runs on server only
    const name = formData.get("name");
    const image = formData.get("image");

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ name, image }),
    });

    if (response.ok) {
      redirect(`/users/${id}`);
    }
  }

  return (
    <section className={styles.formPage}>
      <div className={styles.container}>
        <h1>Update User</h1>
        <FormUser action={updateUser} user={user} />
      </div>
    </section>
  );
}
