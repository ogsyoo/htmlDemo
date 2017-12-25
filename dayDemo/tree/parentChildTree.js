let data = [{
    id: 1,
    name: 'a',
    parent_id: 0
}, {
    id: 2,
    name: 'b',
    parent_id: 0
}, {
    id: 3,
    name: 'a-1',
    parent_id: 1
}, {
    id: 4,
    name: 'a-2',
    parent_id: 1
}, {
    id: 5,
    name: 'b-1',
    parent_id: 2
}, {
    id: 6,
    name: 'b-2',
    parent_id: 2
}, {
    id: 7,
    name: 'a-1-1',
    parent_id: 3
}, ];
let result = data.reduce(function(prev, item) {
    console.log(prev,'---->',item);
    prev[item.parent_id] ? prev[item.parent_id].push(item) : prev[item.parent_id] = [item];
    return prev;
}, {});
for (let prop in result) {
    result[prop].forEach(function(item, i) {
        result[item.id] ? item.children = result[item.id] : ''
    });
}
result = result[0];
console.log(JSON.stringify(result))










