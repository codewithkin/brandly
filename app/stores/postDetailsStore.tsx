import { create } from "zustand";
import type {postData} from "../components/Post";
import { User } from "@supabase/supabase-js";

export type Actions = {
    update: (post: postData) => void
}

const usePostDetailsStore = create<postData & Actions>()((set) => ({
    profile: {
        username: "",
        profileImage: ""
    },
    content: "",
    id: 1,
    likes: Array<User>,
    comments: Array<User>,
    shares: Array<User>,
    bookmarks: Array<User>,
    update: (post: postData) => set((state) => ({ profile: post.profile, content: post.content, id: post.id }))
}))

export default usePostDetailsStore;