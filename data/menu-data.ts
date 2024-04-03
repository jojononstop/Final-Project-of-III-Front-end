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
    title:'商店',
    link:'/',
    sub_menu:[
      {title:'首頁',link:'/'},
      {title:'所有遊戲',link:'/game'},
    ]
  },
  {
    id:2,
    title:'點數商店',
    link:'/bonus',
  },
  {
    id:3,
    title:'關於我們',
    link:'/about',
  },
  
]

export default menu_data;