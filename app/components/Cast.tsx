import { Avatar } from "@/app/components/Avatar";
import SvgComment from "@/app/icons/Comment";
import SvgHeart from "@/app/icons/Heart";
import SvgRepeat from "@/app/icons/Recast";
import { CastWithInteractions } from "@/app/libs/farcaster/client";
import { EmbedUrl } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Linkify from "linkify-react";
import { CastAction } from "./CastAction";

interface Props {
  cast: CastWithInteractions;
  className?: string;
}

export function Cast(props: Props) {
  const { cast, className = "" } = props;
  const { author, timestamp, text, hash, reactions, replies } = cast;

  const castUrl = `https://warpcast.com/${author.username}/${hash}`;

  const images = cast.embeds
    .filter(e => e.hasOwnProperty("url"))
    .map(e => (e as EmbedUrl).url)
    .filter(url => url.includes("imagedelivery"));

  return (
    <div
      className={`relative max-w-full rounded-xl border border-yellow-300 bg-yellow-300/10 p-5 font-sans shadow shadow-yellow-300/50 ${className}`}
    >
      <div className="flex items-center justify-between space-x-4">
        <a
          href={`https://warpcast.com/~/profiles/${author.fid}`}
          target="_blank"
          className="flex shrink-0 items-center duration-100 hover:opacity-75"
        >
          <Avatar
            id={author.fid.toString()}
            imageUrl={author.pfp_url}
            name={author.display_name || author.username}
            size={32}
            className="shrink-0 rounded-full object-cover"
          />
          <b className="ml-1.5 text-sm font-medium text-zinc-800">
            {author.display_name || `@${author.username}`}
          </b>
        </a>
        <CastAction
          castUrl={castUrl}
          timestamp={timestamp}
          isReimbursed={author.display_name?.includes("o") || false}
        />
      </div>
      <div className="mt-2.5 overflow-hidden whitespace-pre-line text-sm">
        <Linkify
          options={{
            className: "underline duration-100 break-all",
            target: "_blank",
          }}
        >
          {text}
        </Linkify>
        {images.length > 0 && (
          <div className="mt-4 space-y-2.5">
            {images.map(i => (
              <a
                href={i}
                key={i}
                target="_blank"
                className="block duration-100 ease-in-out hover:opacity-70"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i} alt=" " className="w-full max-w-full rounded-lg" loading="lazy" />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center space-x-4 text-xs">
        <a href={castUrl} target="_blank" className="group flex items-center">
          <SvgComment className="mr-1.5 size-4 text-zinc-500 duration-100 group-hover:text-zinc-800" />{" "}
          {replies.count}
        </a>
        <a href={castUrl} target="_blank" className="group flex items-center">
          <SvgHeart className="mr-1.5 size-4 text-zinc-500 duration-100 group-hover:text-zinc-800" />{" "}
          {reactions.likes_count}
        </a>
        <a href={castUrl} target="_blank" className="group flex items-center">
          <SvgRepeat className="mr-1.5 size-4 text-zinc-500 duration-100 group-hover:text-zinc-800" />{" "}
          {reactions.recasts_count}
        </a>
      </div>
    </div>
  );
}
