import { timeSince, timeSinceShort } from "@/app/libs/numbers";
import { isBefore } from "date-fns/isBefore";
import { subSeconds } from "date-fns/subSeconds";

interface Props {
  date?: string | Date;
  variant?: "short" | "default";
  justNowThreshold?: number;
  justNowText?: string;
  agoText?: string;
}

export const DateRelative = (props: Props) => {
  const {
    date: rawDate,
    variant = "default",
    justNowThreshold = 30,
    justNowText = "just now",
    agoText = "ago",
  } = props;

  if (!rawDate) return null;
  const date = rawDate instanceof Date ? rawDate : new Date(rawDate);

  const isJustNow = isBefore(subSeconds(new Date(), justNowThreshold), date);

  return (
    <time
      dateTime={date.toLocaleString("en")}
      title={date.toLocaleString("en")}
      suppressHydrationWarning
      className="whitespace-nowrap"
    >
      {isJustNow
        ? justNowText
        : `${variant === "default" ? timeSince(date) : timeSinceShort(date)} ${agoText}`}
    </time>
  );
};

export default DateRelative;
