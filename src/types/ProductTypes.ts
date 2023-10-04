export type ProductTypes =
  | {
      id: number;
      name: string;
      image: string;
      carouselImg?: Record<string, string>;
      category: string;
      price: number;
      comingsoon: boolean;
      color?: Record<string, { colorImg: string; colorUrl: string }>;
      size?: Record<string, string>;
      message?: {
        title: string;
        desc: string;
        detail: {
          title: string;
          text1: string;
          text2: string;
          text3: string;
          text4: string;
          text5: string;
          text6: string;
        };
      };
    }
  | null
  | undefined;
