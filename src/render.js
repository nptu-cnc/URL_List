
const list = {
    data() {
        return {
            test: "Hello_World",
            initial: false,
            isClick: [],
            jsonData: [],
            show: true,
            keyword: ""
        }
    },
    async created() {
        //去github抓取要顯示的json檔
        let data = await fetch('https://raw.githubusercontent.com/nptu-cnc/URL_List/main/src/maintainer.json')
        //將json檔放入上方data中的jsonData
        this.jsonData = await data.json();
        console.log("Created")
        
        let url = new URL(location.href);
        //偵測網址列中是否含有參數"o"
        let onlylink = url.searchParams.get("o");
        if (onlylink == 1) {
            //如果有的話將show設定為false以隱藏部分內容
            this.show = false;
        }
    },
    methods: {
        showRow(data){
            for(let i in data){
                if(String(data[i]).includes(this.keyword)){
                    return true;
                }
            }
            return false;
        }
    }
}


Vue.createApp(list).mount('#data-mount');
