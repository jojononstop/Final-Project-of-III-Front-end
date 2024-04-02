// type
type IMenuDataType = {
  id: number;
  title: string;
  link: string;
  sub_menu?: {
      title: string;
      link: string;
  }[];
}

const menu_data:IMenuDataType[] = [
  {
    id:1,
    title:'首頁',
    link:'#',
    sub_menu:[
      {title:'Home One',link:'/'},
      {title:'Home Two',link:'/home-2'},
    ]
  },
  {
    id:2,
    title:'關於我們',
    link:'/about',
  },
  {
    id:3,
    title:'商店',
    link:'/game',
    sub_menu:[
      {title:'TOURNAMENT',link:'/tournament'},
      {title:'TOURNAMENT Single',link:'/tournament-details'},
    ]
  },
  {
    id:4,
    title:'點數商店',
    link:'/bonus',
    sub_menu:[
      {title:'點數商店清單',link:'/bonus'},
      // {title:'bonusItem',link:'/bounsItem'},
    ]
  },
  {
    id:5,
    title:'個人資訊',
    link:'#',
    sub_menu:[
      {title:'Our Blog',link:'/blog'},
      {title:'Blog Details',link:'/blog-details'}
    ]
  },
  {
    id:7,
    title:'Game',
    link:'/game',
  },
  {
    id:8,
    title:'Cart',
    link:'/checkout/cart',
  },
]

export default menu_data;