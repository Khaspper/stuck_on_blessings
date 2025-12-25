const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export function getPublicUrl(path: string, BUCKET: string = "sticker_images") {
  return {
    data: {
      publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`,
    },
  };
}

export const legoData = getPublicUrl("first_drop_stickers/lego.png");
export const phoneData = getPublicUrl("first_drop_stickers/phone.png");
export const luffyData = getPublicUrl("first_drop_stickers/luffy.png");
export const spidermanData = getPublicUrl("first_drop_stickers/spiderman.png");
export const heartData = getPublicUrl("first_drop_stickers/heart.png");
export const clockData = getPublicUrl("first_drop_stickers/clock.png");
export const jesusData = getPublicUrl("first_drop_stickers/jesus.png");
export const pochaccoData = getPublicUrl("first_drop_stickers/pochacco.png");

//? Stickers not being sold / extra stickers
export const flowersData = getPublicUrl("stickers_not_being_sold/flowers.png");
export const smiskiData = getPublicUrl("stickers_not_being_sold/smiski.png");
