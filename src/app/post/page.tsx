import React from "react";
import styles from "./../page.module.css";
import { sql } from "@vercel/postgres";

async function addPost(formData: any) {
  "use server";

  const title = formData.get("title");
  const content = formData.get("content");
  const time = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log("title---->", title);
  console.log("content---->", content);

  sql`INSERT INTO post (title, content, user_id, created_at, updated_at) VALUES ( ${title}, ${content}, 1, ${time}, ${time}) `;
}

export default function Post() {
  return (
    <main className={styles.main}>
      <h3>Create a post</h3>
      <form action={addPost}>
        <div>
          {" "}
          Title: <input type="text" name="title" />
        </div>
        <div>
          Text:<textarea name="content"></textarea>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </main>
  );
}
