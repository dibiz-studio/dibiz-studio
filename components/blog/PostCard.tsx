import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog-shared";
import { formatDate, SERVICES } from "@/lib/blog-shared";
import s from "@/app/blog/blog.module.css";

export function Cover({ post, priority = false }: { post: PostMeta; priority?: boolean }) {
  if (post.cover) {
    return (
      // Shown at the image's own shape, so nothing gets cropped
      <div className={s.coverImg}>
        <Image
          src={post.cover}
          alt={post.coverAlt ?? post.title}
          width={1600}
          height={900}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    );
  }
  // Website posts: an illustrated browser mockup that shows we build websites
  if (/website|app development|cro/i.test(post.category)) {
    return (
      <div className={`${s.cover} ${s.coverWeb}`} aria-hidden="true">
        <div className={s.browser}>
          <div className={s.browserBar}>
            <i />
            <i />
            <i />
            <span className={s.browserUrl}>yourbrand.in</span>
          </div>
          <div className={s.browserBody}>
            <div className={s.mockNav}>
              <b />
              <span />
              <span />
              <span />
              <em />
            </div>
            <div className={s.mockHero}>
              <div className={s.mockHeroText}>
                <span />
                <span />
                <span className={s.mockBtn} />
              </div>
              <div className={s.mockHeroImg} />
            </div>
            <div className={s.mockGrid}>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
        <div className={s.phone}>
          <div className={s.phoneImg} />
          <span />
          <span />
          <span className={s.mockBtn} />
        </div>
        <span className={s.webTag}>{post.category}</span>
      </div>
    );
  }

  // Other services: use that service's image from /public
  const service = SERVICES.find((sv) => sv.name === post.category);
  if (service) {
    return (
      <div className={`${s.cover} ${s.coverService}`} aria-hidden="true">
        <Image src={service.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} style={{ objectFit: "cover" }} />
        <span className={s.webTag}>{post.category}</span>
      </div>
    );
  }

  // Styled placeholder until a real cover image is added
  return (
    <div className={`${s.cover} ${s.coverPlaceholder}`} aria-hidden="true">
      <span>{post.category}</span>
    </div>
  );
}

export function PostCard({ post, large = false }: { post: PostMeta; large?: boolean }) {
  return (
    <article className={large ? `${s.card} ${s.cardLarge}` : s.card}>
      <Link href={`/blog/${post.slug}`} className={s.cardLink}>
        <Cover post={post} priority={large} />
        <div className={s.cardBody}>
          <span className={s.pill}>{post.category}</span>
          <h3 className={s.cardTitle}>{post.title}</h3>
          <p className={s.cardExcerpt}>{post.description}</p>
          <div className={s.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
