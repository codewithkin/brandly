import { supabase } from "@/app/lib/supabase";
import { Share } from "react-native";

export const getUser = async () => {
    const {data} = await supabase.auth.getUser();

    return data;
}

const checkshared = async (id: number) => {
    // Get the user's data
    const user = await getUser();

    const { data } = await supabase
    .from("posts")
    .select("shares")
    .eq("id", id)

    const shares = data[0].shares

    const shared = shares.some(sharer => { return sharer.user.user_metadata.email === user.user?.user_metadata.email });

    return shared;
}

const sharePostText = async (id: number) => {
    const { data } = await supabase
            .from("posts")
            .select()
            .filter("id","in", `(${id})`);

    try {
        await Share.share({
            message: data[0].content
        })
    } catch (e) {
        console.log(e);
    }
}

export default async function sharePost (id: number) {
    const user = await getUser();
    const shared = await checkshared(id)   
    console.log(shared); 

    if(!shared) {
        const { data } = await supabase
            .from("posts")
            .select()
            .filter("id","in", `(${id})`);

        const { shares } = data[0];

        const newshares = shares.length > 0 ?
        [...shares, user] : [user]

        const { error } = await supabase
            .from("posts")
            .update({
                shares: newshares
            })
            .eq("id", id)

        if(error) {
            console.log(error)
        }
    }

    sharePostText(id);
}