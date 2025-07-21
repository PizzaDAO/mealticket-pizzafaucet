
const defaultTimeMapping = {
    years: "years",
    months: "months",
    month: "month",
    day: "day",
    days: "days",
    hour: "hr",
    hours: "hrs",
    minutes: "min",
    seconds: "sec",
};
    
export const timeSince = (
  rawDate: Date | string | number,
    mapping = defaultTimeMapping,
    withSpacing = true,
  ) => {
    try {
      const date = rawDate instanceof Date ? rawDate : new Date(rawDate);
  
      const now = new Date();
      const dif = now.getTime() - date.getTime();
      const seconds = Math.floor(dif / 1000);
  
      let interval = seconds / 31536000;
  
      if (interval > 1) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.years}`;
      }
  
      interval = seconds / 2592000;
  
      //handle month
      if (interval < 2 && interval > 1) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.month}`;
      }
  
      if (interval > 1) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.months}`;
      }
  
      interval = seconds / 86400;
  
      if (interval < 2 && interval > 1) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.day}`;
      }
  
      if (interval > 2) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.days}`;
      }
  
      interval = seconds / 3600;
  
      if (interval < 2 && interval > 1) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.hour}`;
      }
  
      if (interval > 1) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.hours}`;
      }
  
      interval = seconds / 60;
  
      if (interval > 1) {
        return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.minutes}`;
      }
  
      return `${Math.floor(interval * 60)}${withSpacing ? " " : ""}${mapping.seconds}`;
    } catch (e: any) {
      console.error(e);
      return "";
    }
  };
  
  const NEGATIVE_SEC_REGEXP = /^-[0-9]s$/;
  
  const timeUnitMapping = {
    years: "y",
    months: "mo",
    month: "mo",
    day: "d",
    days: "d",
    hour: "hr",
    hours: "hrs",
    minutes: "m",
    seconds: "s",
  };
  
  export function timeSinceShort(date: string | Date | number, justNowLabelThresholdSeconds = 0) {
    const time = timeSince(date, timeUnitMapping, false);
  
    if (time === "0s" || NEGATIVE_SEC_REGEXP.test(time)) {
      return "just now";
    }
  
    if (time === "30d") {
      return "1mo";
    }
  
    if (justNowLabelThresholdSeconds !== 0) {
      const timeCopy = time.slice();
      const timeUnit = timeCopy.replace(/\d/g, "");
  
      const isInSeconds = timeUnit === "s";
      if (isInSeconds) {
        const isBelowThreshold = parseInt(time, 10) < justNowLabelThresholdSeconds;
        if (isBelowThreshold) {
          return "just now";
        }
      }
    }
  
    return time;
  }