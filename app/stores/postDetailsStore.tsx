import { create } from "zustand";
import type {postData} from "../components/Post";

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
    likes: [],
    comments: [],
    shares: [],
    bookmarks: [],
    update: (post: postData) => set((state) => ({ profile: post.profile, content: post.content, id: post.id, likes: post.likes, comments: post.comments, bookmarks: post.bookmarks, shares: post.shares }))
}))

export default usePostDetailsStore;