import { Avatar } from "./Avatar";
import SvgComment from "./icons/Comment";
import SvgHeart from "./icons/Heart";
import SvgRepeat from "./icons/Recast";
// import Linkify from "linkify-react";
import { CastAction } from "./CastAction";
import DateRelative from "./DateRelative";
import { CastWithInteractions, EmbedUrl } from "@neynar/nodejs-sdk/build/api";
import { getCastUrl } from "~/lib/utils";

interface Props {
  cast: CastWithInteractions;
  className?: string;
}

export function Cast(props: Props) {
  const { cast, className = "" } = props;
  const { author, text, reactions, replies, timestamp } = cast;

  const castUrl = getCastUrl(cast);

  const images = cast.embeds
    .filter(e => e.hasOwnProperty("url"))
    .map(e => (e as EmbedUrl).url)

  return (
    <div
      className={`relative max-w-full rounded-xl bg-yellow-100 p-5 font-sans shadow-md ${className}`}
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="flex shrink-0 items-center space-x-1.5">
          <Avatar
            id={author.fid.toString()}
            imageUrl={author.pfp_url}
            name={author.display_name || author.username}
            size={32}
            className="shrink-0 rounded-full object-cover"
          />
          <div>
            <a
              href={`https://warpcast.com/~/profiles/${author.fid}`}
              target="_blank"
              className="flex shrink-0 items-center duration-100 hover:opacity-75"
            >
              <b className="text-sm font-medium leading-tight text-zinc-800">
                {author.display_name || `@${author.username}`}
              </b>
            </a>
            <div className="text-xs text-zinc-500">
              <DateRelative date={timestamp} variant="short" />
            </div>
          </div>
        </div>
        <CastAction cast={cast} />
      </div>
      <div className="mt-2.5 overflow-hidden whitespace-pre-line text-sm">
        {/* <Linkify
          options={{
            className: "underline duration-100 break-all hover:text-red-500",
            target: "_blank",
          }}
        >
          {text}
        </Linkify> */}
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
