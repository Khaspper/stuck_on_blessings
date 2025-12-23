const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const BUCKET = "sticker_images";

function getPublicUrl(path: string) {
  return {
    data: {
      publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`,
    },
  };
}

export const legoData = getPublicUrl("first_drop_stickers/lego.png");
export const smiskiData = getPublicUrl("first_drop_stickers/smiski.png");
export const phoneData = getPublicUrl("first_drop_stickers/phone.png");
export const flowersData = getPublicUrl("first_drop_stickers/flowers.png");
export const luffyData = getPublicUrl("first_drop_stickers/luffy.png");
export const spidermanData = getPublicUrl("first_drop_stickers/spiderman.png");
export const heartData = getPublicUrl("first_drop_stickers/heart.png");
export const clockData = getPublicUrl("first_drop_stickers/clock.png");
export const jesusData = getPublicUrl("first_drop_stickers/jesus.png");
export const pochaccoData = getPublicUrl("first_drop_stickers/pochacco.png");
