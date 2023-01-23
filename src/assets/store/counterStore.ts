import {create} from 'zustand'

interface Post {
    id: number
    title: string
    body: string
}

interface CounterState {
    count: number
    title: string
    posts: Post[]
    increment: (value: number) => void
    getPosts: () => Promise<void>
    clearStore: () => void
    multiply: (value: number) => void
}
export const useCounterStore = create<CounterState>((set, get)=> ({
    count: 10,
    title: 'some title',
    posts: [],
    increment: (value: number) => set(state => ({
        count: state.count + value
    })),
    getPosts: async () => {
        const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
        console.log(posts);
        
        set (state => ({
            // ... state copia todo lo que tiene el estado y luego post actualiza las publicaciones
            ...state,
            posts
        }))
        
    },
    clearStore: () => {
        set({}, true)
    },
    multiply: (value: number) => {
        // obtenemos el valor de count
        const { count } = get()
        set({count: count * value})
    }
}))


