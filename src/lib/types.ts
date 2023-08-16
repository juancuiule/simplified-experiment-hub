type Author = {
  name: string;
  ID: string;
  url: string;
  profile: string;
  social: {
    tw: string;
    fb: string;
    ig: string;
  };
  avatar: string;
  description: string;
};

export type WordpressPost = {
  id_post: number;
  status: boolean;
  credits: {
    autores: Author[];
  };
  excerpt: string;
  title: string;
  slug: string;
  post_type: string;
  readingtime: number;
  metadata: {
    link: string[];
    description: string[];
    slug: string[];
    indice_id: string[];
    seccion_id: string[];
  };
  image: [string, number, number, boolean];
  permalink: string;
  content: string;
  seo?: {
    title: string;
    description: string;
    tags: string;
  };
};
