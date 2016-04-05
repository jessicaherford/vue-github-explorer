
// requiring Vue into our file using "node syntax"
var Vue = require('vue');

// setting a global config option to put our application in debug mode
// if we get an error we will get more information about it in the dev console
Vue.config.debug = true;
Vue.use(require('vue-resource'));

//Vue instance, we bind the instance to the element with the id of container
//The we initialize our instance with some data
new Vue({
    el: '#container',
    data: {
        fullRepoName: '',
        username: '',
        repo: ''
    },
    methods: {
        changeRepo: function() {
            var splitData = this.fullRepoName.split('/');
            this.username = splitData[0];
            this.repo = splitData[1];

            console.group("Vue Data");
            console.log("fullRepoName:", this.fullRepoName);
            console.log("username:", this.username);
            console.log("repo:", this.repo);
            console.groupEnd("Vue Data");
        }
    },
    components: {
        githubFileExplorer: require('./components/github-file-explorer')
    }
});
