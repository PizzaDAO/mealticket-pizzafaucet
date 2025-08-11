import { NextResponse } from "next/server";
import { CHANNEL_ID } from "~/lib/constants";
import { getChannelCasts } from "~/lib/getChannelCast";

export async function Get() {

   try {
      const casts = await getChannelCasts(CHANNEL_ID);
      return NextResponse.json(casts, { status: 200 });
   } catch (error) {
      console.error("Error fetching channel casts:", error);
      return NextResponse.json({message: "Failed to fetch channel casts"}, { status: 500 });
   }

}