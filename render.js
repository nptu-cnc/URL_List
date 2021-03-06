let tba = document.querySelector('div.table-responsive');

async function getData() {
    let resp = await fetch('https://raw.githubusercontent.com/nptu-cnc/URL_List/main/data.json', {
        method: 'GET',
    });
    let data = await resp.json();
    let tmp = [];
    for (let i of data) {
        tmp.push(i);
    }
    return tmp;
}


(async function show() {
    tba.innerHTML = '';
    let table = `
        <table border="1" style="border-style: solid;overflow-x:”auto”">
            <tbody>
    `;
    let insertTb = "";
    let name = []
    let data = await getData();
    for (let item of data) {
        if (!String(item[0]).includes("unit")) {
            insertTb = `
            <tr class="${item[0]}">
                <td class="serise-number">${item[1]}</td>
                <td class="site-Name">${item[2]}</td>
                <td class="new-link"><a href="https://${item[3]}" target="_blank">${item[3]}</a></td>
                <td class="Name private">${item[4]}</td>
                <td class="mail private">${item[5]}</td>
                <td class="phone-num private">${item[6]}</td>
                <td class="note">${item[7]}</td>
            </tr>
            `;
        }
        else {
            insertTb = `
            <tr>
                <td class="${item[0]}" colspan="8">${item[1]}</td>
                
            </tr>
            <tr>
                <th class="serise-number">序號</th>
                <th class="site-Name">網站名稱</th>
                <th class="new-link">RPAGE網址</th>
                <th class="Name private">網站負責人</th>
                <th class="mail private">Email</th>
                <th class="phone-num private">分機</th>
                <th class="note">備註</th>
            </tr>`
                ;
        }
        table += insertTb;
    }
    tba.insertAdjacentHTML('beforeend', table);
    table += `</tbody></table>`;
    hide()
    return 0;
})()


function dw(obj) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();

}
let private
function hide() {

    let url = new URL(location.href);
    let onlylink = url.searchParams.get("o");
    if (onlylink == 1) {
        private = document.getElementsByClassName("private");
        for (let i = 0; i < private.length; i++) {
            private[i].setAttribute("style", "display:none;")
        }
    }
}
document.addEventListener('keypress', e => {

    console.log(e.key);
    if (e.key == 'o') {
        private = document.getElementsByClassName("private");
        for (let i = 0; i < private.length; i++) {
            private[i].setAttribute("style", "display:none;")
        }
    }
    else if(e.key == 'h'){
       document.location.reload();
    }

});

/*
let x = document.querySelectorAll('tr');
let temp = [[]];
let count=0;
for(let i of x){
    temp[count]=[];
    if( i.firstElementChild.nodeName == 'TD' && i.className.includes("site-tb")){
        temp[count].push(i.className)
        for(let j of i.children){
            
            if(j.className.includes("new-link")){
                temp[count].push(j.textContent);
                console.log("hi")
            }
            else{
                temp[count].push(j.innerHTML);

            }
        }
        count++;
    }
    else if( i.firstElementChild.className.includes('unit')){
        temp[count].push(i.firstElementChild.className)
        for(let j of i.children){
            temp[count].push(j.innerHTML);
        }
        count++;
    }
    
}
*/