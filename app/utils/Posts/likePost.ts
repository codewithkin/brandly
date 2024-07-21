import { supabase } from "@/app/lib/supabase";
import { User } from "@supabase/supabase-js";

export const getUser = async () => {
    const {data} = await supabase.auth.getUser();

    return data;
}

export const checkLiked = async (id: number) => {
    // Get the user's data
    const user = await getUser();

     // Get the current post's likes
     const { data, error } = await supabase
     .from("posts")
     .select("likes")
     .eq("id", id);

    if (error) {
        console.error("Error fetching post data:", error);
        return false;
    }

    if (!data || data.length === 0) {
        console.error("Post not found");
        return;
    }

    const likes = data[0].likes;
    const liked = likes.some((liker: { user: User }) => { return liker.user.user_metadata.email === user.user?.user_metadata.email });

    return liked;
}

export default async function likePost (id: number) {
    const user = await getUser();
    const liked = await checkLiked(id)   
    console.log(liked); 

    if(liked === false) {
        const { data } = await supabase
            .from("posts")
            .select()
            .filter("id","in", `(${id})`);

        const { likes } = data && data[0];

        const newLikes = likes.length > 0 ?
        [...likes, user] : [user]

        const { error } = await supabase
            .from("posts")
            .update({
                likes: newLikes
            })
            .eq("id", id)
        if(error) {
            console.log(error)
        }
    }
}