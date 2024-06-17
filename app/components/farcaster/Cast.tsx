
import { CastWithInteractions } from "../../libs/farcaster/client";
import { Avatar } from "../atoms/Avatar";
import DateRelative from "../atoms/DateRelative";
import SvgComment from "../icons/Comment";
import SvgHeart from "../icons/Heart";
import SvgRepeat from "../icons/Recast";
import { EmbedUrl } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Linkify from "linkify-react";

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
      className={`dark:bg-card relative rounded-xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-700 max-w-full ${className}`}
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
          <b className="ml-1.5 max-sm:text-sm font-medium text-zinc-800">{author.display_name || `@${author.username}`}</b>
        </a>
        <a
          href={castUrl}
          target="_blank"
          className="text-sm text-zinc-500 duration-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <DateRelative date={timestamp} />
        </a>
      </div>
      <div className="mt-2.5 overflow-hidden whitespace-pre-line text-sm lg:text-base">
        <Linkify
          options={{
            className:
              "underline text-lead-500 hover:text-lead-700 duration-100 break-all dark:text-lead-200 dark:hover:text-lead-50",
            target: "_blank",
          }}
        >
          {text}
        </Linkify>
        {images.length > 0 && <div className="mt-4 space-y-2.5">
          {images.map(i => <a href={i} key={i} target="_blank"><img src={i} alt=" " className="w-full rounded-lg max-w-full" /></a>)}
        </div>}
      </div>
      <div className="mt-4 flex items-center space-x-4 text-xs dark:text-zinc-300">
        <a href={castUrl} target="_blank" className="group flex items-center">
          <SvgComment className="mr-1.5 size-4 text-zinc-500 duration-100 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200" />{" "}
          {replies.count}
        </a>
        <a href={castUrl} target="_blank" className="group flex items-center">
          <SvgHeart className="mr-1.5 size-4 text-zinc-500 duration-100 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200" />{" "}
          {reactions.likes.length}
        </a>
        <a href={castUrl} target="_blank" className="group flex items-center">
          <SvgRepeat className="mr-1.5 size-4 text-zinc-500 duration-100 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200" />{" "}
          {reactions.recasts.length}
        </a>
      </div>
    </div>
  );
}
