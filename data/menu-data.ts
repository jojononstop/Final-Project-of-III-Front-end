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
    title:'主頁',
    link:'#',
    sub_menu:[
      {title:'Home One',link:'/'},
      {title:'Home Two',link:'/home-2'},
    ]
  },
  {
    id:2,
    title:'關於',
    link:'/about',
  },
  {
    id:3,
    title:'TOURNAMENT',
    link:'#',
    sub_menu:[
      {title:'TOURNAMENT',link:'/tournament'},
      {title:'TOURNAMENT Single',link:'/tournament-details'},
    ]
  },
  {
    id:4,
    title:'PAGES',
    link:'#',
    sub_menu:[
      {title:'Gaming Shop',link:'/shop'},
      {title:'Shop Details',link:'/shop-details'},
      {title:'Our Services',link:'/services'},
      {title:'Services Details',link:'/service-details'},
      {title:'Player Details',link:'/team-details'},
    ]
  },
  {
    id:5,
    title:'News',
    link:'#',
    sub_menu:[
      {title:'Our Blog',link:'/blog'},
      {title:'Blog Details',link:'/blog-details'}
    ]
  },
  {
    id:6,
    title:'Game',
    link:'/game',
  },
  {
    id:7,
    title:'Bonus',
    link:'/bonus',
  },
  // {
  //   id:8,
  //   title:'Login',
  //   link:'/Login',
  // },
]

export default menu_data;