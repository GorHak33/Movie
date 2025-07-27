// custom.d.ts
declare module "swiper/css" {
  export const swiper: string;
  export const navigation: string;
  export const pagination: string;
  export const autoplay: string;
  export default swiper;
}

declare module "swiper/css/*" {
  const content: string;
  export default content;
}

declare module "swiper/react" {
  import { Swiper, SwiperSlide } from "swiper/react";
  export { Swiper, SwiperSlide };
}
declare module "swiper/swiper.min.css";
declare module "swiper/modules/navigation.min.css";
declare module "swiper/modules/pagination.min.css";
