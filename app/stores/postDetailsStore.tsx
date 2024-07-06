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
    update: (post: postData) => set((state) => ({ profile: post.profile, content: post.content, id: post.id }))
}))

export default usePostDetailsStore;