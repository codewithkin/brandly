import { supabase } from "@/app/lib/supabase";
import { getUser } from "./sharePost";
import { User } from "@supabase/supabase-js";

const newComment = async (id: number, content: string) => {
    const obj = {content};
    try {
        const me = await getUser();
        obj.user = me.user.user_metadata;

        const posts = await supabase
                        .from("posts")
                        .select()
                        .eq("id", id)

        const comments = posts.data[0].comments;                 
        const newComments = comments.length > 0 ? [...comments, obj] : [obj];

        await supabase
        .from("posts")
        .update({
            comments: newComments
        })
        .eq("id", id)
    } catch (e) {
        console.log(e);
    }
}


export default newComment;