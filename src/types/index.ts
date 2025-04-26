import type { PostgrestError } from "@supabase/supabase-js";

export type BaseResponse<T> = {
  data: T;
  error: PostgrestError | null;
};
