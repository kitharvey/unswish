export interface ImageProps {
    alt_description: string
    blur_hash: string
    categories: any[]
    color: string
    created_at: string
    current_user_collections: any[]
    description: null | any
    height: number
    id: string
    liked_by_user: boolean
    likes: number
    links: {
        self: string, 
        html: string, 
        download: string, 
        download_location: string
    }
    promoted_at?: null | any
    sponsorship?: any
    updated_at: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
    }
    user?: UserProps
    width: number
}

interface UserProps{
    accepted_tos: boolean
    bio: string
    first_name: string
    id: string
    instagram_username: string
    last_name: null | any
    location: null | any
    name: string
    portfolio_url: string
    profile_image?: any
    links?: any
    total_collections: number
    total_likes: number
    total_photos: number
    twitter_username: string
    updated_at: string
    username: string
}