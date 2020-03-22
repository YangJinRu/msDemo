let demoList = {
    status: 200,
    message: 'success',
    code: 0,
    data: [
        {
            id: 1,
            name: '数据源_1',
            type: 'MySQL',
            time: '2020/03/01 18:30:20',
            user_name: '王子鸣',
            user_img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            collection: true
        },
        {
            id: 2,
            name: '数据源_1',
            type: 'ORACLE',
            time: '2020/03/02 18:30:20',
            user_name: 'Edward Taylor',
            user_img: '',
            collection: true
        },
        {
            id: 3,
            name: '数据源_3',
            type: 'EXCEL',
            time: '2020/03/02 18:30:20',
            user_name: '尚尚',
            user_img: '',
            collection: false
        },
        {
            id: 4,
            name: '数据源_4',
            type: 'Hive',
            time: '2020/03/02 18:30:20',
            user_name: '潘军',
            user_img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            collection: false
        },
        {
            id: 5,
            name: '数据源_5',
            type: 'MySQL',
            time: '2020/03/02 18:30:20',
            user_name: '潘军',
            user_img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            collection: false
        }
    ]
}
export default {
    'post|/collection': function(options){
        console.log(options, 4539045890)
        let id = JSON.parse(options.body).id
        demoList.data.forEach(listItem => {
            if (listItem.id === id) {
                listItem.collection = !listItem.collection
            }
        });
        return demoList;
    }
}