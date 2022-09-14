
const list = {
    data() {
        return {
            test: "Hello World",
            initial: false,
            isClick: [],
            jsonData: [],
            show: true,
            keyword: ""
        }
    },
    async created() {
        let data = await fetch('https://raw.githubusercontent.com/nptu-cnc/URL_List/main/src/maintainer.json')
        this.jsonData = await data.json();
        console.log("Created")
        let url = new URL(location.href);
        let onlylink = url.searchParams.get("o");
        if (onlylink == 1) {
            this.show = false;
        }
    },
    methods: {
        search() {
            let search = document.querySelector("#search");
            this.keyword = search.value;
        }
    }
}


Vue.createApp(list).mount('#data-mount');
