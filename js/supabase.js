/*==========================================
    KIVUSTREAM SUPABASE CLIENT
==========================================*/

import { createClient } from "https://esm.sh/@supabase/supabase-js";

/*==========================================
    CONFIG
==========================================*/

const SUPABASE_URL = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4amdlanVqZnhlampsYmZpemd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTQzMTQsImV4cCI6MjA5NDA5MDMxNH0.CWUYLk4qJfriIYXWScB7wcHHVTCuz0SGDhWUV3tMR1Y";

const SUPABASE_ANON_KEY = "https://exjgejujfxejjlbfizgz.supabase.co";

/*==========================================
    CLIENT
==========================================*/

export const supabase = createClient(

    SUPABASE_URL,

    SUPABASE_ANON_KEY,

    {

        auth:{

            persistSession:true,

            autoRefreshToken:true,

            detectSessionInUrl:true

        }

    }

);

/*==========================================
    MOVIES
==========================================*/

export async function getMovies(){

    const { data, error } = await supabase

        .from("movies")

        .select("*")

        .order("created_at",{

            ascending:false

        });

    if(error){

        console.error(error);

        return [];

    }

    return data;

}

/*==========================================
    SERIES
==========================================*/

export async function getSeries(){

    const { data, error } = await supabase

        .from("series")

        .select("*")

        .order("created_at",{

            ascending:false

        });

    if(error){

        console.error(error);

        return [];

    }

    return data;

}

/*==========================================
    EPISODES
==========================================*/

export async function getEpisodes(seriesId){

    const { data, error } = await supabase

        .from("episodes")

        .select("*")

        .eq("series_id", seriesId)

        .order("season")

        .order("episode");

    if(error){

        console.error(error);

        return [];

    }

    return data;

}

/*==========================================
    FEATURED
==========================================*/

export async function getFeatured(){

    const { data, error } = await supabase

        .from("movies")

        .select("*")

        .eq("featured", true)

        .limit(10);

    if(error){

        console.error(error);

        return [];

    }

    return data;

}

/*==========================================
    SINGLE MOVIE
==========================================*/

export async function getMovie(id){

    const { data, error } = await supabase

        .from("movies")

        .select("*")

        .eq("id", id)

        .single();

    if(error){

        console.error(error);

        return null;

    }

    return data;

}

/*==========================================
    SINGLE SERIES
==========================================*/

export async function getSeriesById(id){

    const { data, error } = await supabase

        .from("series")

        .select("*")

        .eq("id", id)

        .single();

    if(error){

        console.error(error);

        return null;

    }

    return data;

}

/*==========================================
    SEARCH DATABASE
==========================================*/

export async function searchDatabase(keyword){

    const { data, error } = await supabase

        .from("movies")

        .select("*")

        .ilike("title", `%${keyword}%`);

    if(error){

        console.error(error);

        return [];

    }

    return data;

}

/*==========================================
    FAVORITES
==========================================*/

export async function getFavorites(userId){

    const { data } = await supabase

        .from("favorites")

        .select("*")

        .eq("user_id", userId);

    return data || [];

}

/*==========================================
    HISTORY
==========================================*/

export async function getHistory(userId){

    const { data } = await supabase

        .from("history")

        .select("*")

        .eq("user_id", userId)

        .order("updated_at",{

            ascending:false

        });

    return data || [];

}
