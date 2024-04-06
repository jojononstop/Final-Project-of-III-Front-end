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
        {title:'暢銷遊戲',link:'/game?search=popular'},
        {title:'優惠遊戲',link:'/game?search=discount'},
        {title:'免費遊戲',link:'/game?search=tag_13'},
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
    {
      id:4,
      title:'收藏庫',
      link:'/',

    },
    {
      id:5,
      title:'個人資料',
      link:'#',
      sub_menu:[
        {title:'物品庫',link:'/'},
        {title:'願望清單',link:'/wishList'}
      ]
    },
    {
      id:5,
      title:'聊天室',
      link:'/chattest',
    },
  ]
  
  export default menu_data;