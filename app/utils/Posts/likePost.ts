import { supabase } from "@/app/lib/supabase";
import type { postData } from "@/app/components/Post";

export const getUser = async () => {
    const {data} = await supabase.auth.getUser();

    return data;
}

export const checkLiked = async (id: number) => {
    // Get the user's data
    const user = await getUser();

    const { data } = await supabase
    .from("posts")
    .select("likes")
    .eq("id", id)

    const likes = data[0].likes

    const liked = likes.some(liker => { return liker.user.user_metadata.email === user.user?.user_metadata.email });

    return liked;
}

export default async function likePost (id: number) {
    const user = await getUser();
    const liked = await checkLiked(id)   
    console.log(liked); 

    if(!liked) {
        const { data } = await supabase
            .from("posts")
            .select()
            .filter("id","in", `(${id})`);

        const { likes } = data[0];

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