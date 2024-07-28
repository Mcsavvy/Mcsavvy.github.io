export type Testimonial = {
  id: string;
  image: string;
  name: string;
  title: string;
  text: string;
};

export type Service = {
  name: string;
  icon: string;
  description: string;
};

export type Client = {
  name: string;
  link?: string;
  logo: string;
};

export type MyInfo = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phoneNumber: string;
  location: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  github: string;
  resume: string;
  displayPic: string;
  about: string;
};


export type Project = {
  name: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  link: string;
  tags: string[];
};