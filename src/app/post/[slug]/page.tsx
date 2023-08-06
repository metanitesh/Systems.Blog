import React from "react";
import { sql } from "@vercel/postgres";
import styles from "./../../page.module.css";
import { kv } from "@vercel/kv";

export default async function page({ params }: any) {
  const title = decodeURIComponent(params.slug);
  const cache = await kv.get(title);
  console.log("cache---->", cache);
  let blog = null;

  if (cache) {
    const random = Math.floor(Math.random() * 5);
    console.log("random number---->", random);
    if (random === 1) {
      console.log("warming db");
      await sql`SELECT * from post where title=${title} ;`;
    }
    blog = cache;
    if (Math.floor(Math.random() * 10) === 1) {
      const response: any =
        await sql`SELECT * from post where title=${title} ;`;
    }
  } else {
    const response: any = await sql`SELECT * from post where title=${title} ;`;
    blog = response.rows[0];
    console.log("getting from db");
    await kv.set(title, blog);
  }

  return (
    <main className={styles.main}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
    </main>
  );
}
