export interface IAuth {
  username: string
  password: string
  password_confirm?: string
}
export interface IUser {
  id: number | null;
  username: string | null
  accessToken: string | null;
  refreshToken: string | null;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  category: string; 
  category_id: number;
  author: string; 
  extra_info?: string | null;
  created_at: string; 
  updated_at: string; 
}

export interface IPostCreate {
  title: string;
  content: string;
  category_id: number;
  extra_info?: string | null;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryCreate {
  name: string;
}