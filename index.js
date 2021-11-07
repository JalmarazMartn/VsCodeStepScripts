var JSONTreeView = require('json-tree-view');
 
var view = new JSONTreeView('example', {
    hello : 'world',
    doubleClick : 'me to edit',
    a : null,
    b : true,
    c : false,
    d : 1,
    e : {nested : 'object'},
    f : [1,2,3]
});
// Listen for change events
view.on('change', function(self, key, oldValue, newValue){
    console.log('change', key, oldValue, '=>', newValue);
});
view.on('rename', function(self, key, oldName, newName) {
    console.log('rename', key, oldName, '=>', newName);
});
view.on('delete', function(self, key) {
    console.log('delete', key);
});
view.on('append', function(self, key, nameOrValue, newValue) {
    console.log('append', key, nameOrValue, '=>', newValue);
});
view.on('click', function(self, key, value) {
    console.log('click', key, '=', value);
});
view.on('expand', function(self, key, value) {
    console.log('expand', key, '=', value);
});
view.on('collapse', function(self, key, value) {
    console.log('collapse', key, '=', value);
});
view.on('refresh', function(self, key, value) {
    console.log('refresh', key, '=', value);
});
 
// Expand recursively
view.expand(true);
 
view.withRootName = false;
 
// Inspect window.data on the console and note that it changes with edits.
window.data = view.value;
 
view.value.f.pop()
view.value.f.push(9)
view.value.e.a = 'aaa';
delete view.value.c;
view.refresh();
 
// Do not hide root.
view.alwaysShowRoot = true;
 
// Set readonly when filtering words automatically.
view.readonlyWhenFiltering = true;
view.filterText = 'a';
 
// Remove word filter by setting a false value.
view.filterText = null;
 
// Always show count of object or array.
view.showCountOfObjectOrArray = true;
 
// Cannot change the value of JSON and remove "+" and "x" buttons.
view.readonly = true;
 
document.getElementById('filter').addEventListener('input', function() {
    view.filterText = this.value;
});
document.getElementById('root').addEventListener('change', function() {
    view.alwaysShowRoot = !!this.checked;
});
document.getElementById('rowf').addEventListener('change', function() {
    view.readonlyWhenFiltering = !!this.checked;
});
document.getElementById('ro').addEventListener('change', function() {
    view.readonly = !!this.checked;
});
document.getElementById('sc').addEventListener('change', function () {
    view.showCountOfObjectOrArray = !!this.checked;
});