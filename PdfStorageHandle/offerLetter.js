import { supabase } from "@/lib/supabase";

export const OfferLetterPdf = async (file) => {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("offerletters") // create this bucket in Supabase Storage
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("offerletters")
    .getPublicUrl(fileName);
  return publicUrl.publicUrl;
};
