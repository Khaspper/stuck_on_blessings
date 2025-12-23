const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const BUCKET = "sticker_images";

function getPublicUrl(path: string) {
  return {
    data: {
      publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`,
    },
  };
}

export const bibleData = getPublicUrl("first_drop_stickers/bible.png");
export const legoData = getPublicUrl("first_drop_stickers/lego.png");
export const smiskiData = getPublicUrl("first_drop_stickers/smiski.png");
export const phoneData = getPublicUrl("first_drop_stickers/phone.png");
