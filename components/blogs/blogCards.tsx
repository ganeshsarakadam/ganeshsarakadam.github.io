import Image from "next/image"
import styles from "./blogCard.module.css"
import Link from "next/link"
import { BlogType } from "@/lib/types"
export default function DefaultBlogCard({ blogData }: { blogData: BlogType }) {
    function getFirstImageUrl(markdown: string): string | null {
        const imageRegex = /!\[.*?\]\((.*?)\)/;
        const match = markdown.match(imageRegex);
        if (match && match[1]) {
            const url = match[1].split(' ')[0];
            return url;
        }

        return null;
    }
    let thumbnailUrl = blogData.thumbnailUrl;
    if (!thumbnailUrl) {
        thumbnailUrl = getFirstImageUrl(blogData.blogTextContent);
    }
    function formatTimestampToTwitterStyle(timestamp: number): string {
        const date = new Date(timestamp);

        // Format time
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const isAM = hours < 12;
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const ampm = isAM ? 'AM' : 'PM';

        // Format date
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return `${formattedHours}:${formattedMinutes} ${ampm} · ${formattedDate}`;
    }
    function stripMarkdown(markdown: String) {
        return markdown
            // Remove code blocks
            .replace(/```\s*[\s\S]*?```/g, "")
            // Remove inline code
            .replace(/`[^`]*`/g, "")
            // Remove images ![alt](url)
            .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
            // Remove links [text](url)
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            // Remove bold, italic, strikethrough (*, _, ~)
            .replace(/(\*\*|__)(.*?)\1/g, "$2")
            .replace(/(\*|_)(.*?)\1/g, "$2")
            .replace(/~~(.*?)~~/g, "$1")
            // Remove headings
            .replace(/^#{1,6}\s+/gm, "")
            // Remove blockquotes
            .replace(/^\s*>+\s?/gm, "")
            // Remove horizontal rules
            .replace(/^([-*_] *){3,}$/gm, "")
            // Remove unordered list markers
            .replace(/^[*-]\s+/gm, "")
            // Remove ordered list numbers
            .replace(/^\d+\.\s+/gm, "")
            // Collapse extra newlines
            .replace(/\n{2,}/g, "\n\n")
            // Trim spaces
            .trim();
    }
    return (<div className={styles.main}>

        <div className={styles.mainContent}>
            <div className="flex gap-[10px] font-sans font-semibold text-sm">
                <Image className="h-[40px] w-[40px] rounded-[50%]" src={`https://res.cloudinary.com/dytynwrxu/image/upload/profilePics/${blogData.ownerId}.jpg`} width={40} height={40} alt="" unoptimized />
                <div className={styles.userDetails}>
                    <Link className={styles.name} href={`https://bugspot.in/profile/${blogData.ownerId}`} target="_blank">{blogData.ownerName}</Link>
                    <p className="font-mono">{formatTimestampToTwitterStyle(blogData.updatedAt)}</p>
                </div>
            </div>
            <Link href={`https://bugspot.in/blog/${blogData.blogId}`} target="_blank">
                <div className={styles.previewText}>
                    {!thumbnailUrl &&
                        <p>
                            {stripMarkdown(blogData.blogTextContent).slice(0, 400)}
                        </p>}
                    {thumbnailUrl &&
                        <h1 className="font-mono font-medium text-3xl underline">{blogData.blogTitle}</h1>
                    }
                </div>
                {blogData.blogTextContent.length > 400 &&
                    <p className={styles.showmoreLink}>Show More</p>
                }
                {thumbnailUrl &&
                    <Image src={thumbnailUrl} height={200} width={150} className={styles.thumbnailImage} alt="" unoptimized />
                }
            </Link>
        </div>

    </div>)
}
