import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { kv } from "@vercel/kv";

async function getPosts() {
  const { rows } =
    await sql`SELECT * FROM post ORDER BY created_at DESC LIMIT 5 ;`;
  console.log(rows);
  return rows;
}

export default async function Home() {
  const posts = await getPosts();
  console.log("posts------>", posts);

  return (
    <>
      <main className={styles.main}>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`post/${post.title}`}>{post.title}</Link>
          </div>
        ))}
        <Link href={"/post"}>create a post</Link>
      </main>
    </>
  );
}
